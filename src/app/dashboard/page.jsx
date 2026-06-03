"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/Sidebar";
import PropertyList from "@/components/PropertyList";
import CreateProperty from "@/components/CreateProperty";
import UpdateProperty from "@/components/UpdateProperty";
import DeleteProperty from "@/components/DeleteProperty";

export default function Dashboard() {
  const [view, setView] = useState("show");
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "250px",
          borderRight: "1px solid #ddd",
          padding: "20px",
        }}
      >
        <Sidebar setView={setView} />
      </div>

      <div
        style={{
          flex: 1,
          padding: "20px",
        }}
      >
        {view === "show" && <PropertyList />}

        {view === "create" && (
          <CreateProperty />
        )}

        {view === "update" && (
          <UpdateProperty />
        )}

        {view === "delete" && (
          <DeleteProperty />
        )}
      </div>
    </div>
  );
}