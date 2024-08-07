"use client";

import { createContext, useContext, useState } from "react";

interface TemplateContextProps {
  templates: string[];
  setTemplates: (templates: string[]) => void;
}

const TemplateContext = createContext<TemplateContextProps | undefined>(
  undefined
);

export const TemplateProvider = ({
  children,
  initialState = [],
}: {
  children: React.ReactNode;
  initialState?: string[];
}) => {
  let initialTemplate = initialState;
  if (typeof window !== "undefined") {
    initialTemplate = JSON.parse(
      window.localStorage.getItem("templates") || "[]"
    );
  }
  const [templates, setTemplates] = useState<string[]>(initialTemplate);

  return (
    <TemplateContext.Provider
      value={{
        templates,
        setTemplates,
      }}
    >
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplateContext = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};
