import { Navbar } from "@/src/components/Shared/NavBar/NavBar";
import React from "react";

const CommonLayoutPage = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="relative mb-4">
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
};

export default CommonLayoutPage;
