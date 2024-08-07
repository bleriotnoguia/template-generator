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
  const [templates, setTemplates] = useState<string[]>(
    JSON.parse(window.localStorage.getItem("templates") ?? "null") ||
      initialState
  );

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
