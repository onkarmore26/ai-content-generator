"use client";

import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { HISTORY } from "../history/page";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

function UsageTrack() {
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const [maxWords, setMaxWords] = useState(10000);
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  useEffect(() => {
    if (user) {
      calculateWordUsage();
      checkUserSubscription();
    }
  }, [user]);

  useEffect(() => {
    if (user && updateCreditUsage) {
      calculateWordUsage();
    }
  }, [updateCreditUsage, user]);

  const calculateWordUsage = async () => {
    try {
      const results: HISTORY[] = await db
        .select()
        .from(AIOutput)
        .where(
          eq(AIOutput.createdBy as any, user?.primaryEmailAddress?.emailAddress)
        );

      const total = results.reduce((sum, item) => {
        const wordCount = item.aiResponse
          ? item.aiResponse.split(" ").length
          : 0;
        return sum + wordCount;
      }, 0);

      setTotalUsage(total);
    } catch (error) {
      console.error("Error fetching usage data:", error);
    }
  };

  const checkUserSubscription = async () => {
    try {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(
          eq(UserSubscription.email, user?.primaryEmailAddress?.emailAddress)
        );

      if (result && result.length > 0) {
        setUserSubscription(true);
        setMaxWords(100000); // Update max words if subscribed
      } else {
        setUserSubscription(false);
        setMaxWords(10000); // Default value for non-subscribed users
      }
    } catch (error) {
      console.error("Error checking subscription:", error);
    }
  };

  return (
    <div className="p-5">
      <div className="bg-primary text-white p-3 rounded-lg">
        <h2 className="font-medium">Credits</h2>
        <div className="h-2 bg-[#9981f9] w-full rounded-full mt-3">
          <div
            className="h-2 bg-white rounded-full"
            style={{
              width: `${(totalUsage / maxWords) * 100}%`,
            }}
          ></div>
        </div>
        <h2 className="text-sm my-2">
          {totalUsage}/{maxWords} credit used
        </h2>
      </div>
      <Button variant="secondary" className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
