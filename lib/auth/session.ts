import { cookies } from "next/headers";
import { getIronSession, type SessionOptions } from "iron-session";

export interface AdminSessionData {
  admin?: {
    id: number;
    email: string;
  };
}

export const sessionOptions: SessionOptions = {
  cookieName: "admin_session",
  password: process.env.IRON_SESSION_PASSWORD || "this-is-a-fallback-password-please-set-a-real-one!",
  cookieOptions: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
};

export async function getAdminSession() {
  const cookieStore = await cookies();
  return getIronSession<AdminSessionData>(cookieStore, sessionOptions);
}
