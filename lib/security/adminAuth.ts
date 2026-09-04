import { NextRequest } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, type AdminSessionData } from "@/lib/auth/session";
import { verifyAdminPassword } from "@/lib/db/adminDb";

export async function isAdminAuthorized(request: NextRequest): Promise<boolean> {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSessionData>(cookieStore, sessionOptions);
  return !!session.admin?.id;
}

export async function loginAdmin(
  email: string,
  password: string
): Promise<{ id: number; email: string } | null> {
  const user = await verifyAdminPassword(email, password);
  if (!user) return null;
  return { id: user.id, email: user.email };
}
