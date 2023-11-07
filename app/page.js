"use client";

import React from "react";
import WikiPage from "@/components/WikiPage";
import { useSearchParams } from "next/navigation";

export default function Home() {
  // get argument from url
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  if (page) {
    return <WikiPage fileName={page + ".md"} />;
  }

  return (
    <h1 className="text-4xl font-bold text-center">
      Home Page
    </h1>
  );
}
