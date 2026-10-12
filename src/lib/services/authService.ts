import { API_URL } from "../env";
import { api, clearTokens, setTokens } from "../api";
import type { AuthTokens, MeUser } from "../types";

export const authService = {
  async login(email: string, password: string): Promise<AuthTokens> {
    const res = await fetch(`${API_URL}/auth/token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error("Invalid email or password");
    }
    const tokens = (await res.json()) as AuthTokens;
    setTokens(tokens.access, tokens.refresh);
    return tokens;
  },
  logout() {
    clearTokens();
  },
  me: () => api<MeUser>("/auth/me/"),
};
