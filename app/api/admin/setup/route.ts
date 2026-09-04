import { NextResponse } from "next/server";
import { seedDefaultAdmin } from "@/lib/db/adminDb";

// This endpoint seeds the admin user in the database
// Should only be used for initial setup
export async function POST() {
  try {
    await seedDefaultAdmin();
    return NextResponse.json({ success: true, message: "Admin user seeded successfully" });
  } catch (error) {
    console.error("Setup error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
