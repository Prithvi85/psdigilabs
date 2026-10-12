"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import config from "@/sanity.config";

const NextStudioNoSSR = dynamic(
  () => import("next-sanity/studio").then((mod) => mod.NextStudio),
  {
    ssr: false,
    loading: () => <div style={{ minHeight: "100vh" }} />,
  }
);

export function StudioClient() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div style={{ minHeight: "100vh" }} />;
  }

  return <NextStudioNoSSR config={config} />;
}