"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const CustomEmailEditor = dynamic(
  () => import("@/components/CustomEmailEditor"),
  {
    loading: () => <p>Loading...</p>,
    ssr: false,
  }
);
export default function Page({ params }: any) {
  const { id } = params;

  return <CustomEmailEditor templateId={id} />;
}
