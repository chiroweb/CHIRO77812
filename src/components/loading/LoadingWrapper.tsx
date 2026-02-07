"use client";

import { useState, useEffect } from "react";
import LogoAnimation from "./LogoAnimation";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShow, setShouldShow] = useState(true);

  useEffect(() => {
    const visited = sessionStorage.getItem("chiro-visited");
    if (visited) {
      setIsLoading(false);
      setShouldShow(false);
    } else {
      document.body.style.overflow = "hidden";
    }
  }, []);

  const handleComplete = () => {
    setIsLoading(false);
    setShouldShow(false);
    sessionStorage.setItem("chiro-visited", "true");
    document.body.style.overflow = "";
  };

  return (
    <>
      {isLoading && shouldShow && (
        <LogoAnimation onComplete={handleComplete} />
      )}
      <div className="min-h-screen">
        {children}
      </div>
    </>
  );
}
