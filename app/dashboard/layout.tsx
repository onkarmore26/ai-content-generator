"use client";

import React, { useState } from "react";
import SideNav from "./_components/SideNav";
import Header from "./_components/Header";
import Link from "next/link";
import { TotalUsageContext } from "../(context)/TotalUsageContext";
import { UserSubscriptionContext } from "../(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "../(context)/UpdateCreditUsageContext";

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [totalWords, setTotalWords] = useState<number>(0);
  const [userSubscription, setUserSubscription] = useState<boolean>(false);
  const [updateCreditUsage, setUpdateCreditUsage] = useState<any>();

  return (
    <TotalUsageContext.Provider
      value={{ totalUsage: totalWords, setTotalUsage: setTotalWords }}
    >
      <UserSubscriptionContext.Provider
        value={{ userSubscription, setUserSubscription }}
      >
        <UpdateCreditUsageContext.Provider
          value={{ updateCreditUsage, setUpdateCreditUsage }}
        >
          <div className="bg-slate-100 h-screen">
            <div className="md:w-64 hidden md:block fixed">
              <SideNav />
              <Link href="/dashboard/history" className="text-blue-500">
                Go to History
              </Link>
            </div>
            <div className="md:ml-64">
              <Header />
              {children}
            </div>
          </div>
        </UpdateCreditUsageContext.Provider>
      </UserSubscriptionContext.Provider>
    </TotalUsageContext.Provider>
  );
}

export default Layout;
