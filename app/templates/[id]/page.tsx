"use client";

import CustomEmailEditor from "@/components/CustomEmailEditor";
import * as React from "react";

export default function Page({ params }: any) {
  const { id } = params;

  return <CustomEmailEditor templateId={id} />;
}
