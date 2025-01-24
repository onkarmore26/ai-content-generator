"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import DOMPurify from "dompurify";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { desc, eq } from "drizzle-orm";
import Image from "next/image";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";

export interface HISTORY {
  id: number;
  formData: string;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}

const History = () => {
  const { user } = useUser();
  const [historyList, setHistoryList] = useState<HISTORY[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const userEmail = user?.primaryEmailAddress?.emailAddress;

        let data: HISTORY[] = [];

        if (userEmail) {
          data = await db
            .select()
            .from(AIOutput)
            .where(eq(AIOutput.createdBy, userEmail))
            .orderBy(desc(AIOutput.id));
        } else {
          data = await db.select().from(AIOutput).orderBy(desc(AIOutput.id));
        }

        setHistoryList(data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };

    if (user) {
      fetchHistory();
    }
  }, [user]);

  const getTemplateName = (slug: string) => {
    const template = Templates.find((item) => item.slug === slug);
    return template;
  };

  const getTopicFromInput = (formData: string) => {
    try {
      const parsedData = JSON.parse(formData);
      return parsedData.topic || null;
    } catch {
      return null;
    }
  };

  const sanitizeHtml = (html: string) => {
    return DOMPurify.sanitize(html, {
      ALLOWED_TAGS: [
        "b",
        "strong",
        "i",
        "em",
        "u",
        "p",
        "br",
        "span",
        "ul",
        "li",
        "ol",
        "h1",
        "h2",
        "h3",
        "img",
        "a",
        "div",
      ],
      ALLOWED_ATTR: ["href", "src", "alt", "title", "style", "class"],
    });
  };

  return (
    <div className="m-5 p-5 border rounded-lg bg-white">
      <h2 className="font-bold text-3xl">History</h2>
      <p className="text-gray-500">Search your previously generated results</p>
      <div className="grid grid-cols-1 gap-4 mt-4">
        {historyList.map((history) => (
          <div key={history.id} className="p-4 border rounded-lg bg-gray-100">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Image
                  src={
                    getTemplateName(history.templateSlug)?.icon ||
                    "/default-icon.png"
                  }
                  alt={history.templateSlug}
                  width={30}
                  height={30}
                />
                <span className="ml-2 font-semibold">
                  {getTemplateName(history.templateSlug)?.name}
                </span>
              </div>
              <div className="text-sm text-gray-400">{history.createdAt}</div>
            </div>
            {getTopicFromInput(history.formData) && (
              <h3 className="mt-2 text-lg font-bold text-indigo-600">
                {getTopicFromInput(history.formData)}
              </h3>
            )}
            <div
              className="mt-2 text-gray-800"
              dangerouslySetInnerHTML={{
                __html: history.aiResponse
                  ? sanitizeHtml(history.aiResponse)
                  : "No response available",
              }}
            ></div>
            <p className="mt-2 text-gray-500">
              Words:{" "}
              {history.aiResponse ? history.aiResponse.split(" ").length : 0}
            </p>
            <Button
              onClick={() =>
                navigator.clipboard.writeText(history.aiResponse || "")
              }
            >
              Copy
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default History;
