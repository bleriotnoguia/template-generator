"use client";

import * as React from "react";
import dynamic from "next/dynamic";

export default function Page({ params }: any) {
  const { id } = params;

  const CustomEmailEditor = dynamic(
    () => import("@/components/CustomEmailEditor"),
    {
      loading: () => <p>Loading...</p>,
    }
  );

  return <CustomEmailEditor templateId={id} />;
}
