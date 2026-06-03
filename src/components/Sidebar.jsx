"use client";

import { useRouter } from "next/navigation";

export default function Sidebar({
  setView,
}) {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user");

    router.push("/login");
  };

  return (
    <div>
      <h2>Dashboard</h2>

      <button
        onClick={() =>
          setView("show")
        }
      >
        Show Properties
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          setView("create")
        }
      >
        Create Property
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          setView("update")
        }
      >
        Update Property
      </button>

      <br />
      <br />

      <button
        onClick={() =>
          setView("delete")
        }
      >
        Delete Property
      </button>

      <br />
      <br />

      <button
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}