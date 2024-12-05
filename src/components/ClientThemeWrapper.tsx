"use client";
import { useContext } from "react";
import { LocalContext } from "./LocalStorageContext";

export default function ClientThemeWrapper({ children }: any) {
  const { theme } = useContext(LocalContext);
  return <div data-theme={theme}>{children}</div>;
}
