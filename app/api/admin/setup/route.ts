import { NextResponse } from "next/server";
import { seedDefaultAdmin, seedDefaultConfig, saveSiteConfig } from "@/lib/db/adminDb";
import { defaultConfig } from "@/lib/siteConfig";

// This endpoint seeds the admin user and resets config to default
// Should only be used for initial setup
export async function POST() {
  try {
    await seedDefaultAdmin();
    await seedDefaultConfig();
    
    // Force save default config to ensure banner is enabled
    await saveSiteConfig(defaultConfig);
    
    return NextResponse.json({ success: true, message: "Admin user and config seeded successfully" });
  } catch (error) {
    console.error("Setup error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
