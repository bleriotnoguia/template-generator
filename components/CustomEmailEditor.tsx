"use client";

import * as React from "react";

import { useRouter } from "next/navigation";
import EmailEditor, { EditorRef, EmailEditorProps } from "react-email-editor";
import { Download, Edit, Home, List, Plus, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/ModeToggle";
import { useTheme } from "next-themes";
import defaultTemplate from "../data/defaultTemplate.json";
import { useTemplateContext } from "../app/template-context";
import { Alert, AlertTitle } from "@/components/ui/alert";

export default function CustomEmailEditor({
  templateId,
}: {
  templateId?: string;
}) {
  const emailEditorRef = React.useRef<EditorRef | null>(null);
  const { templates, setTemplates } = useTemplateContext();

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
      alert("The design has been saved.");
    });
  };

  const updateDesign = () => {
    const unlayer = emailEditorRef.current?.editor;

    unlayer?.saveDesign((design: any) => {
      templates[Number(templateId) - 1] = JSON.stringify(design);
      setTemplates(templates);
      // also save in local storage
      window.localStorage.setItem("templates", JSON.stringify(templates));
      alert("The design has been updated.");
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
      // Mailjet API integration
      fetch("https://api.mailjet.com/v3.1/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            btoa(
              "6c5a769efc45d799d13a22a3f22a1506:28e72cdd08c7bd24186cdbf7a2fb8a02"
            ),
        },
        body: JSON.stringify({
          Messages: [
            {
              From: {
                Email: "contact@bleriotnoguia.com",
                Name: "Email Temp Generator",
              },
              To: [
                {
                  Email: "nstevebleriot@yahoo.fr",
                  Name: "Blériot Noguia",
                },
              ],
              Subject: "Test Email",
              HTMLPart: html,
            },
          ],
        }),
        mode: "no-cors",
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Test email sent successfully.");
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("An error occurred while sending the test email.");
        });
    });
  };

  const onLoad: EmailEditorProps["onLoad"] = (unlayer) => {
    let temp = JSON.stringify(defaultTemplate);
    if (templateId) {
      if (
        !Number(templateId) ||
        (Number(templateId) && Number(templateId) > templates.length)
      ) {
        alert("Template not found");
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
