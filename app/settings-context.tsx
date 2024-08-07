"use client";

import { createContext, useContext, useState } from "react";

interface settingsProps {
  email: string;
  name: string;
}

type variablesProps = { key: string; value: string }[];

interface SettingsContextProps {
  settings: settingsProps;
  setSettings: (settings: settingsProps) => void;
  variables: variablesProps;
  setVariables: (variables: variablesProps) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({
  children,
  initialState = { email: "", name: "" },
  initialVariables = [{ key: "", value: "" }],
}: {
  children: React.ReactNode;
  initialState?: settingsProps;
  initialVariables?: variablesProps;
}) => {
  let initialSetting = initialState;
  if (typeof window !== "undefined") {
    initialSetting = JSON.parse(
      window.localStorage.getItem("settings") || JSON.stringify(initialState)
    );
  }
  let initialVariable = initialVariables;
  if (typeof window !== "undefined") {
    initialVariable = JSON.parse(
      window.localStorage.getItem("variables") ||
        JSON.stringify(initialVariables)
    );
  }
  const [settings, setSettings] = useState<settingsProps>(initialSetting);
  const [variables, setVariables] = useState<variablesProps>(initialVariable);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        variables,
        setVariables,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSetting must be used within a SettingsProvider");
  }
  return context;
};
