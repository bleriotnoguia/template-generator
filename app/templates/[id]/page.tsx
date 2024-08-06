"use client";

import * as React from "react";
import CustomEmailEditor from "@/components/CustomEmailEditor";

export default function Page({ params }: any) {
  const { id } = params;
  return <CustomEmailEditor templateId={id} />;
}
