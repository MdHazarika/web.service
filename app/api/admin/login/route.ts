import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth/session";
import { loginAdmin } from "@/lib/security/adminAuth";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { email, password } = body as Record<string, unknown>;
  if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
    return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
  }

  const session = await getAdminSession();
  const admin = await loginAdmin(email, password);

  if (!admin) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  session.admin = { id: admin.id, email: admin.email };
  await session.save();

  return NextResponse.json({ success: true, admin: { id: admin.id, email: admin.email } });
}
