"use client";

import { useEffect, useState } from "react";
import Spinner from "@/components/ui/spinner";

export default function PageLoading() {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText((prev) => {
        if (prev === "Loading...") return "Loading";
        if (prev === "Loading..") return "Loading...";
        if (prev === "Loading.") return "Loading..";
        return "Loading.";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      <Spinner className="w-12 h-12 text-primary" />
      <p className="text-lg font-medium mt-4 text-primary min-w-[100px] text-center">
        {loadingText}
      </p>
    </div>
  );
}
