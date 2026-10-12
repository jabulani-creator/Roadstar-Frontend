"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/lib/services/authService";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("owner@roadstar.demo");
  const [password, setPassword] = useState("DemoPass123!");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await authService.login(email, password);
      router.push("/dashboard");
    } catch {
      setError("Could not sign in. Check email and password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-4">
      <h1 className="font-display text-3xl font-semibold text-[var(--brand)]">Staff login</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Owner and content roles can manage courses, fleet, and instructors.
      </p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 border border-black/10 bg-white p-5">
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error ? <p className="text-sm text-red-700">{error}</p> : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </div>
  );
}
