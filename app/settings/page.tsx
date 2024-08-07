"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { Home, Settings } from "lucide-react";
import ModeToggle from "@/components/ModeToggle";
import VariableForm from "./VariableForm";
import SettingsForm from "./SettingsForm";
import { useRouter } from "next/navigation";

export default function Page() {
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

          <Button variant="outline" onClick={() => router.push("/settings")}>
            <Settings className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
      <hr className="text-gray-800" />
      <SettingsForm />
      <hr className="text-gray-800 mb-10 mt-10" />
      <VariableForm />
    </div>
  );
}
