import type { Lead } from "./db";

function escapeCsv(value: string | number | null) {
  const text = value === null ? "" : String(value);
  return `"${text.replaceAll('"', '""')}"`;
}

export function leadsToCsv(leads: Lead[]) {
  const headers = [
    "ID",
    "Name",
    "Phone",
    "Email",
    "Project",
    "Budget",
    "Requirement",
    "Visit Date",
    "Message",
    "Source",
    "Created At"
  ];

  const rows = leads.map((lead) => [
    lead.id,
    lead.name,
    lead.phone,
    lead.email,
    lead.project,
    lead.budget,
    lead.requirement,
    lead.visitDate,
    lead.message,
    lead.source,
    lead.createdAt
  ]);

  return [headers, ...rows]
    .map((row) => row.map((value) => escapeCsv(value)).join(","))
    .join("\n");
}
