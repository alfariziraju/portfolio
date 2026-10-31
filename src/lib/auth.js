import { cookies } from "next/headers";

const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const AUTH_COOKIE_NAME = "portfolio_admin_token";

// Simple token generator / validator for admin session
export function verifyCredentials(username, password) {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export async function setAdminSession() {
  const cookieStore = await cookies();
  const tokenValue = Buffer.from(`${ADMIN_USERNAME}:${Date.now()}:portfolio_secret`).toString("base64");
  
  cookieStore.set(AUTH_COOKIE_NAME, tokenValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return tokenValue;
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE_NAME);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE_NAME)?.value;
  if (!token) return false;

  try {
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    return decoded.startsWith(`${ADMIN_USERNAME}:`);
  } catch {
    return false;
  }
}
