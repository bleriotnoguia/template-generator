import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { FileText, Home, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { useTemplateContext } from "../template-context";

export default function TemplatePage() {
  const { templates, setTemplates } = useTemplateContext();
  const router = useRouter();

  const deleteAll = () => {
    window.localStorage.removeItem("templates");
    setTemplates([]);
    alert("All templates have been deleted.");
    router.push("/");
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
        </div>
        <div>
          <Button variant="outline" onClick={deleteAll}>
            <Trash2 className="w-4 h-4 mr-2" /> Delete all Templates
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>
      <hr className="text-gray-800" />
      <div className="p-5">
        <h3 className="mt-8 scroll-m-20 text-2xl font-semibold text-center">
          Templates List
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
