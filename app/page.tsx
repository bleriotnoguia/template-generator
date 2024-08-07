"use client";

import dynamic from "next/dynamic";
import * as React from "react";

const CustomEmailEditor = dynamic(
  () => import("@/components/CustomEmailEditor"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default function Page() {
  return <CustomEmailEditor />;
}
