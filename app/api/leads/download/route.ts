import { NextResponse } from "next/server";
import { leadsToCsv } from "@/lib/csv";
import { listLeads } from "@/lib/db";
import { hasAdminSession } from "@/lib/auth";

export const runtime = "nodejs";

export async function GET() {
  if (!hasAdminSession()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const csv = leadsToCsv(listLeads());

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="skanda-estates-leads.csv"`
    }
  });
}
