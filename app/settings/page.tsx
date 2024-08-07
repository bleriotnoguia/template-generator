"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { useSettingsContext } from "../settings-context";
import { Home, Settings } from "lucide-react";
import ModeToggle from "@/components/ModeToggle";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function Page() {
  const { settings, setSettings } = useSettingsContext();
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");

  const router = useRouter();
  // Update the settings with the email and name of the recipient
  const updateSettings = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSettings({ email, name });
    // also save in local storage
    if (typeof window !== "undefined") {
      window.localStorage.setItem("settings", JSON.stringify({ email, name }));
    }
    toast.success("Settings updated successfully.");
  };

  React.useEffect(() => {
    setEmail(settings.email);
    setName(settings.name);
  }, [settings]);

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
      <div className="flex flex-col items-center mt-5">
        <h3 className="mt-8 text-2xl font-semibold text-center">Settings</h3>
        {/* Form to define the email and Name of the recipient */}
        <form
          className="flex flex-col space-y-4 w-1/2"
          onSubmit={updateSettings}
        >
          <label className="text-lg">Enter your email address</label>
          <input
            type="email"
            className="p-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="text-lg">Enter your name</label>
          <input
            type="text"
            className="p-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant={"outline"} type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
