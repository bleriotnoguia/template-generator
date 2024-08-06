"use client";

import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { FileText, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTemplateContext } from "../template-context";

export default function Page() {
  const { templates } = useTemplateContext();
  const router = useRouter();
  return (
    <div>
      <div
        className="flex items-center justify-between p-4"
        style={{ height: "10vh" }}
      >
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => router.push("/")}>
            <Home className="w-4 h-4 mr-2" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
      <hr className="text-gray-800" />
      <div className="p-5">
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold text-center">
          Liste des Templates
        </h3>
        <div className="flex justify-center mt-5">
          {templates.map((template, index) => (
            <Button
              className="m-2"
              key={index}
              variant="outline"
              onClick={() => router.push("/templates/" + (index + 1))}
            >
              <FileText className="w-4 h-4 mr-2" />
              Template {index + 1}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
