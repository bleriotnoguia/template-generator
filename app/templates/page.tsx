"use client";

import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

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
        </div>
      </div>
      <hr className="text-gray-800" />
      <div className="p-5">
        <h2>Liste des Templates</h2>
        <ul>
          <li>temp 1</li>
          <li>temp 2</li>
          <li>temp 3</li>
        </ul>
      </div>
    </div>
  );
}
