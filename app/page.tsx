"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import EmailEditor from "react-email-editor";
import { Expand, Home, List, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { useTheme } from "next-themes";

export default function Page() {
  const emailEditorRef = React.useRef<any>(null);
  const { theme } = useTheme();
  const router = useRouter();
  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data: any) => {
      const { design, html } = data;
      console.log("exportHtml", html);
    });
  };

  const sendTestEmail = () => {
    alert("Logic to send a test email using Mailjet/Mailgun");
  };

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
          <Button variant="outline" onClick={() => router.push("/templates")}>
            <List className="w-4 h-4 mr-2" /> Templates List
          </Button>
          <Button variant="outline" onClick={sendTestEmail}>
            <Send className="w-4 h-4 mr-2" /> Send Test Email
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={exportHtml}>
            <Expand className="w-4 h-4 mr-2" /> Export HTML
          </Button>
          <ModeToggle />
        </div>
      </div>
      <div className="editor-container">
        <EmailEditor
          ref={emailEditorRef}
          style={{ height: "90vh" }}
          options={{
            appearance: {
              theme: theme == "dark" ? "modern_dark" : "modern_light",
              panels: {
                tools: {
                  dock: "left",
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
