"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicPage = dynamic(() => import("@/app/templates/templatePage"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function Page() {
  return <DynamicPage />;
}
