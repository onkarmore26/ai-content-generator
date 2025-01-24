"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
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
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
import { UpdateCreditUsageContext } from "@/app/(context)/UpdateCreditUsageContext";

// No need to define `PROPS` manually, use Next.js dynamic routing types
type PageProps = {
  params: {
    "template-slug": string;
  };
};

const CreateNewContent: React.FC<PageProps> = ({ params }) => {
  const selectedTemplate: TEMPLATE | undefined = Templates?.find(
    (item) => item.slug == params["template-slug"]
  );

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

  const GenerateAIContent = async (FormData: any) => {
    console.log("Current Total Usage: ", totalUsage);

    // Check if total usage exceeds the limit and if user doesn't have a subscription
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
      setTotalUsage((prev) => Math.min(10000, prev + wordCount)); // Ensure usage doesn't exceed limit
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
};

export default CreateNewContent;
