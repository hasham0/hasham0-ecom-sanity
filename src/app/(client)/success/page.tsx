import SuccessSection from "@/components/customComp/succes-section";
import React from "react";

type SearchParams = Promise<{ [key: string]: string | undefined }>;

type Props = { searchParams: SearchParams };

export default async function SuccessPage({ searchParams }: Props) {
  const { orderNumber, session_id } = await searchParams;

  return <SuccessSection orderNumber={orderNumber} session_id={session_id} />;
}
