"use client";

import React, { useContext, useState, useEffect } from "react";
import FormSection from "../_components/FormSection";
import OutputSection from "../_components/OutputSection";
import { TEMPLATE } from "../../_components/TemplateListSection";
import Templates from "@/app/(data)/Templates";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModel";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/navigation";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

// Updated PROPS interface to handle async params
interface PROPS {
  params: {
    "template-slug": string;
  };
}

function CreateNewContent({ params }: PROPS) {
  const [resolvedParams, setResolvedParams] = useState<{
    "template-slug": string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [aiOutput, setAiOutput] = useState<string>("");

  const { user } = useUser();
  const router = useRouter();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription, setUserSubscription } = useContext(
    UserSubscriptionContext
  );
  const { updateCreditUsage, setUpdateCreditUsage } = useContext(
    UpdateCreditUsageContext
  );

  // Resolve params directly in the page function
  useEffect(() => {
    const fetchParams = async () => {
      // Assuming the params are fetched from the dynamic URL or passed into the component
      const resolved = await params;
      setResolvedParams(resolved);
    };
    fetchParams();
  }, [params]);

  const selectedTemplate: TEMPLATE | undefined = resolvedParams
    ? Templates?.find((item) => item.slug === resolvedParams["template-slug"])
    : undefined;

  const GenerateAIContent = async (FormData: any) => {
    if (totalUsage >= 10000 && !userSubscription) {
      console.log("Please Upgrade");
      router.push("/dashboard/billing");
      return;
    }

    setLoading(true);
    const SelectedPrompt = selectedTemplate?.aiPrompt;
    const FinalAIPrompt = JSON.stringify(FormData) + ", " + SelectedPrompt;

    try {
      const result = await chatSession.sendMessage(FinalAIPrompt);
      const aiResponseText = result?.response.text();

      setAiOutput(aiResponseText);
      await SaveInDb(FormData, selectedTemplate?.slug, aiResponseText);

      const wordCount = aiResponseText ? aiResponseText.split(" ").length : 0;
      setTotalUsage((prev) => Math.min(10000, prev + wordCount));
    } catch (error) {
      console.error("Error generating AI content:", error);
    } finally {
      setLoading(false);
    }

    setUpdateCreditUsage(Date.now());
  };

  const SaveInDb = async (formData: any, slug: any, aiResp: string) => {
    try {
      const result = await db.insert(AIOutput).values({
        formData: formData,
        templateSlug: slug,
        aiResponse: aiResp,
        createdBy: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format("DD/MM/yyyy"),
      });
      console.log("Data saved successfully:", result);
    } catch (error) {
      console.error("Error saving data to DB:", error);
    }
  };

  if (!resolvedParams) {
    return <div>Loading...</div>; // Wait until params are resolved
  }

  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 py-5">
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAIContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
      </div>
    </div>
  );
}

export default CreateNewContent;
