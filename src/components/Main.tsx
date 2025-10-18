"use client";

import { ReactNode } from "react";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return <main className="min-h-screen pt-18">{children}</main>;
};

export default Main;
