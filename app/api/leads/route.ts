import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createLead } from "@/lib/db";

export const runtime = "nodejs";

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  project?: unknown;
  budget?: unknown;
  requirement?: unknown;
  visitDate?: unknown;
  message?: unknown;
  source?: unknown;
  website?: unknown;
};

function clean(value: unknown, maxLength: number) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ")
    .slice(0, maxLength);
}

function optional(value: unknown, maxLength: number) {
  const cleaned = clean(value, maxLength);
  return cleaned || null;
}

function formPayload(formData: FormData): LeadPayload {
  return {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    project: formData.get("project"),
    budget: formData.get("budget"),
    requirement: formData.get("requirement"),
    visitDate: formData.get("visitDate"),
    message: formData.get("message"),
    source: formData.get("source"),
    website: formData.get("website")
  };
}

function successResponse(request: Request, isFormPost: boolean, lead: unknown = null) {
  if (isFormPost) {
    const redirectUrl = new URL("/", request.url);
    redirectUrl.searchParams.set("lead", "success");
    redirectUrl.hash = "lead-form";
    return NextResponse.redirect(redirectUrl, 303);
  }

  return NextResponse.json({ lead }, { status: 201 });
}

function errorResponse(message: string, status: number, request: Request, isFormPost: boolean) {
  if (!isFormPost) {
    return NextResponse.json({ error: message }, { status });
  }

  const redirectUrl = new URL("/", request.url);
  redirectUrl.searchParams.set("lead", "error");
  redirectUrl.searchParams.set("message", message);
  redirectUrl.hash = "lead-form";
  return NextResponse.redirect(redirectUrl, 303);
}

async function readPayload(request: Request) {
  const contentType = request.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    const payload = (await request.json().catch(() => null)) as LeadPayload | null;
    return { payload, isFormPost: false };
  }

  const formData = await request.formData().catch(() => null);
  return { payload: formData ? formPayload(formData) : null, isFormPost: true };
}

export async function POST(request: Request) {
  const { payload, isFormPost } = await readPayload(request);

  if (!payload) {
    return errorResponse("Invalid enquiry payload.", 400, request, isFormPost);
  }

  // Honeypot: hidden "website" field is only filled by bots. Pretend success
  // so the bot moves on, but save nothing.
  if (clean(payload.website, 200)) {
    return successResponse(request, isFormPost);
  }

  const name = clean(payload.name, 120);
  const phone = clean(payload.phone, 30);
  const project = clean(payload.project, 160);
  const budget = clean(payload.budget, 80);

  if (name.length < 2) {
    return errorResponse("Please enter a valid name.", 400, request, isFormPost);
  }

  if (!/^[0-9+()\-\s]{8,20}$/.test(phone)) {
    return errorResponse("Please enter a valid phone number.", 400, request, isFormPost);
  }

  if (!project || !budget) {
    return errorResponse("Please select project and budget.", 400, request, isFormPost);
  }

  const headerList = headers();
  const lead = createLead({
    name,
    phone,
    email: optional(payload.email, 160),
    project,
    budget,
    requirement: optional(payload.requirement, 120),
    visitDate: optional(payload.visitDate, 20),
    message: optional(payload.message, 1000),
    source: clean(payload.source || "Website", 120),
    ipAddress: optional(headerList.get("x-forwarded-for"), 80)
  });

  return successResponse(request, isFormPost, lead);
}
