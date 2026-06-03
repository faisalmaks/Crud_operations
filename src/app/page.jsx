"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const user =
      localStorage.getItem("user");

    if (user) {
      router.push("/dashboard");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <h1>Faisal's Real Estate App</h1>

      <div
        style={{
          display: "flex",
          gap: "15px",
        }}
      >
        <Link href="/login">
          <button>
            Login
          </button>
        </Link>

        <Link href="/signup">
          <button>
            Sign Up
          </button>
        </Link>
      </div>
    </main>
  );
}