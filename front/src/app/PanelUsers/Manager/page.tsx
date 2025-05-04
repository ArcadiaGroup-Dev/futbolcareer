"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/components/Context/UserContext";
import PanelManager from "@/components/Panel/Manager/manager";
import React from "react";

export default function Page() {
  const { role } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (role !== "RECRUITER") {
      router.push("/OptionUsers");
    }
  }, [role, router]);

  if (role !== "RECRUITER") {
    return null;
  }

  return <PanelManager />;
}
