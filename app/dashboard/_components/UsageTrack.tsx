import { Button } from "@/components/ui/button";
import { db } from "@/utils/db";
import { AIOutput, AIOutputType } from "@/utils/schema"; // Import the correct type
import { useUser } from "@clerk/nextjs";
import React, { useContext, useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import { UserSubscription } from "@/utils/schema";
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
  const { updateCreditUsage } = useContext(UpdateCreditUsageContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      calculateWordUsage();
      IsUserSubscribe();
    }
  }, [user, updateCreditUsage]);

  const calculateWordUsage = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.warn("User email address is not defined.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      // Corrected query to reference the AIOutput schema and the inferred type
      const results: AIOutputType[] = await db
        .select()
        .from(AIOutput)
        .where(eq(AIOutput.createdBy, user.primaryEmailAddress.emailAddress));

      const total = results.reduce((sum, item) => {
        const wordCount = item.aiResponse
          ? item.aiResponse.split(" ").length
          : 0;
        return sum + wordCount;
      }, 0);

      setTotalUsage(total);
    } catch (err) {
      setError("Failed to fetch usage data.");
      console.error("Error fetching usage data:", err);
    } finally {
      setLoading(false);
    }
  };

  const IsUserSubscribe = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) {
      console.warn("User email address is not defined.");
      return;
    }

    try {
      const result = await db
        .select()
        .from(UserSubscription)
        .where(
          eq(UserSubscription.email, user.primaryEmailAddress.emailAddress)
        );

      if (result.length > 0) {
        setUserSubscription(true);
        setMaxWords(100000);
      } else {
        setUserSubscription(false);
        setMaxWords(10000);
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
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <Button variant="secondary" className="w-full my-3 text-primary">
        Upgrade
      </Button>
    </div>
  );
}

export default UsageTrack;
