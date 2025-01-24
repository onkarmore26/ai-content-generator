"use client";
import React, { useState } from "react";
import SearchSection from "./_components/SearchSection";
import TemplateListSection from "./_components/TemplateListSection";
import Link from "next/link";

function Dashboard() {
  const [userSearchInput, setUserSearchInput] = useState<string>();
  return (
    <div>
      {/* Search Section...*/}
      <SearchSection
        onSearchInput={(value: string) => setUserSearchInput(value)}
      />
      {/*Template List Section...*/}
      <TemplateListSection userSearchInput={userSearchInput} />

      {/* Link to the History page */}
      <Link href="/dashboard/history" className="text-blue-500">
        Go to History
      </Link>
    </div>
  );
}

export default Dashboard;
