"use client";

import React, { useContext, useState } from "react";
import axio from "axios";
import { CheckIcon, Loader2Icon } from "lucide-react";
import { UserSubscription } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { db } from "@/utils/db";
import moment from "moment";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";

export default function Billing() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const createSubscription = () => {
    setLoading(true);
    axio.post("/api/create-subscription", {}).then(
      (resp) => {
        console.log(resp.data);
        OnPayment(resp.data.id);
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const OnPayment = (subId: string) => {
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      subscription_id: subId,
      name: "Safari AI Apps",
      description: "Monthly Subscription",
      handler: async (resp: any) => {
        console.log(resp);
        if (resp) {
          SaveSubscription(resp?.razorpay_payment_id);
        }
        setLoading(false);
      },
    };

    // @ts-ignore
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const SaveSubscription = async (paymentId: string) => {
    const result = await db.insert(UserSubscription).values({
      email: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
      active: true,
      paymentId: paymentId,
      joinDate: moment().format("DD/MM/yyyy"),
    });
    console.log(result);
    if (result) {
      window.location.reload();
    }
  };

  return (
    <div>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <h2 className="text-center font-bold text-3xl my-3">
          Upgrade With Monthly Plan
        </h2>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:items-center">
          {/* Free Plan */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-md">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 ">Free</h3>
              <p className="mt-2 sm:mt-4">
                <span className="text-4xl font-bold text-gray-900">0$</span>
                <span className="text-sm font-medium text-gray-700">
                  {" "}
                  /month
                </span>
              </p>
            </div>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />{" "}
                10,000 Words/Month
              </li>
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />{" "}
                50+ Content Templates
              </li>
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />{" "}
                Unlimited Download & Copy
              </li>
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />{" "}
                1 Month of History
              </li>
            </ul>
            {/* <button
              className="mt-6 w-full rounded-full border px-6 py-3 text-sm font-medium bg-gray-300 text-gray-700 cursor-not-allowed"
              disabled
            >
              Currently Active Plan
            </button> */}
          </div>

          {/* Monthly Plan */}
          <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-md">
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900">Monthly</h3>
              <p className="mt-2 sm:mt-4">
                <span className="text-4xl font-bold text-gray-900">9.99$</span>
                <span className="text-sm font-medium text-gray-700">
                  {" "}
                  /month
                </span>
              </p>
            </div>
            <ul className="mt-6 space-y-3 text-gray-700">
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />
                1,00,000 Words/Month
              </li>
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />
                50+ Template Access
              </li>
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />
                Unlimited Download & Copy
              </li>
              <li className="flex items-center">
                <CheckIcon
                  className="h-5 w-5 text-green-500 mr-2"
                  style={{ color: "#704ef8" }}
                />
                1 Year of History
              </li>
            </ul>
            <button
              disabled={loading}
              onClick={() => createSubscription()}
              className="mt-6 w-full rounded-full bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
            >
              {loading && <Loader2Icon className="animate-spin" />}

              {userSubscription ? "Active Plan" : "Get Started"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
