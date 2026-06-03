"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
  e.preventDefault();

  const success = await login(
    form.email,
    form.password
  );

  if (success) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: form.email,
      })
    );

    router.push("/dashboard");
  } else {
    alert("Invalid Credentials");
  }
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button>
        Login
      </button>
    </form>
  );
}