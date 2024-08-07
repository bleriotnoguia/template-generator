"use client";

import { createContext, useContext, useState } from "react";

interface settingsProps {
  email: string;
  name: string;
}

interface SettingsContextProps {
  settings: settingsProps;
  setSettings: (settings: settingsProps) => void;
}

const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

export const SettingsProvider = ({
  children,
  initialState = { email: "", name: "" },
}: {
  children: React.ReactNode;
  initialState?: settingsProps;
}) => {
  let initialSetting = initialState;
  if (typeof window !== "undefined") {
    initialSetting = JSON.parse(
      window.localStorage.getItem("settings") || JSON.stringify(initialState)
    );
  }
  const [settings, setSettings] = useState<settingsProps>(initialSetting);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
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
