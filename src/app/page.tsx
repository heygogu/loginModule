'use client'
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import "./globals.css";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/home");
  }, []);
  return (
    <main>
      <h1 className="text-danger">Hello Bootstrap</h1>
    </main>
  );
}
