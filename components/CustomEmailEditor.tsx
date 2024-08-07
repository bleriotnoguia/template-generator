"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import {
  Download,
  Edit,
  Home,
  List,
  Plus,
  Save,
  Send,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { useTheme } from "next-themes";
import defaultTemplate from "../data/defaultTemplate.json";
import { useTemplateContext } from "../app/template-context";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { sendEmail } from "@/lib/email";
import { toast } from "react-toastify";
import { useSettingsContext } from "@/app/settings-context";
import { validateEmail } from "@/lib/utils";

export default function CustomEmailEditor({
  templateId,
}: {
  templateId?: string;
}) {
  const emailEditorRef = React.useRef<EditorRef | null>(null);
  const { templates, setTemplates } = useTemplateContext();
  const { settings } = useSettingsContext();

  const { theme } = useTheme();

  const router = useRouter();

  const saveDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.saveDesign((design: any) => {
      setTemplates([...templates, JSON.stringify(design)]);
      // also save in local storage
      window.localStorage.setItem(
        "templates",
        JSON.stringify([...templates, JSON.stringify(design)])
      );
      router.push("/templates/" + (templates.length + 1));
      toast.success("The design has been saved.");
    });
  };

  const updateDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.saveDesign((design: any) => {
      templates[Number(templateId) - 1] = JSON.stringify(design);
      setTemplates(templates);
      // also save in local storage
      window.localStorage.setItem("templates", JSON.stringify(templates));
      toast.success("The design has been updated.");
    });
  };

  const exportHtml = () => {
    const unlayer = emailEditorRef.current?.editor;
    unlayer?.exportHtml((data: any) => {
      const { html } = data;

      var tempEl = document.createElement("a");

      tempEl.href = "data:text/html," + encodeURI(html);
      tempEl.target = "_blank";
      tempEl.download = "template.html";
      tempEl.click();
    });
  };

  const sendTestEmail = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.exportHtml((data: any) => {
      const { html } = data;
      async function send() {
        // Process form data and prepare email details
        const toEmail = settings.email;
        if (!toEmail || !validateEmail(toEmail)) {
          toast.info("Please update the recipient email in settings.");
          router.push("/settings");
          return;
        }
        const emailDetails = {
          to: toEmail,
          from: "contact@bleriotnoguia.com",
          subject: "Email from Template Generator",
          html: html,
          toName: settings.name,
        };
        try {
          // Perform any additional actions after successful email sending
          let { status, message } = await sendEmail(emailDetails);
          if (status === "success") {
            toast.success(message);
          } else if (status === "error") {
            toast.error(message);
          } else {
            toast(message);
          }
        } catch (error) {
          console.error("Error sending email:", error);
          // Handle error case
        }
      }
      send();
    });
  };

  const onLoad: EmailEditorProps["onLoad"] = (unlayer) => {
    let temp = JSON.stringify(defaultTemplate);
    if (templateId) {
      if (
        !Number(templateId) ||
        (Number(templateId) && Number(templateId) > templates.length)
      ) {
        toast.info("Template not found");
        router.push("/templates");
      } else {
        temp = templates[Number(templateId) - 1];
      }
    }
    unlayer.loadDesign(JSON.parse(temp));
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
        {templateId && (
          <div>
            <Alert variant="default">
              <Edit className="h-4 w-4" />
              <AlertTitle>You are editing the template {templateId}</AlertTitle>
            </Alert>
          </div>
        )}
        <div className="flex items-center space-x-2">
          {templateId ? (
            <>
              <Button variant="outline" onClick={updateDesign}>
                <Save className="w-4 h-4 mr-2" /> Update Design
              </Button>
              <Button variant="outline" onClick={() => router.push("/")}>
                <Plus className="w-4 h-4 mr-2" /> New Design
              </Button>
            </>
          ) : (
            <Button variant="outline" onClick={saveDesign}>
              <Save className="w-4 h-4 mr-2" /> Save Design
            </Button>
          )}

          <Button variant="outline" onClick={exportHtml}>
            <Download className="w-4 h-4 mr-2" /> Export HTML
          </Button>
          <ModeToggle />

          <Button variant="outline" onClick={() => router.push("/settings")}>
            <Settings className="w-4 h-4 mr-2" />
          </Button>
        </div>
      </div>
      <div className="editor-container">
        <EmailEditor
          ref={emailEditorRef}
          onLoad={onLoad}
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
