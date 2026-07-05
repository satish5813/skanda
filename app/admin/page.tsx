import { Download, LogOut, Phone, Search, UsersRound } from "lucide-react";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/auth";
import { listLeads } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Lead Admin | Skanda Estates",
  robots: {
    index: false,
    follow: false
  }
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(new Date(value.replace(" ", "T")));
}

export default function AdminDashboard() {
  if (!hasAdminSession()) {
    redirect("/admin/login");
  }

  const leads = listLeads();
  const projects = new Set(leads.map((lead) => lead.project)).size;
  const siteVisits = leads.filter((lead) =>
    `${lead.requirement || ""} ${lead.message || ""}`.toLowerCase().includes("visit")
  ).length;

  return (
    <main className="admin-shell">
      <section className="admin-hero">
        <div>
          <p className="eyebrow">Admin Board</p>
          <h1>Skanda Estates leads</h1>
          <p>Live SQLite lead storage with project, budget, visit date, and buyer message details.</p>
        </div>
        <div className="admin-actions">
          <a className="button button--primary" href="/api/leads/download">
            <Download size={18} aria-hidden="true" />
            Download CSV
          </a>
          <a className="button button--ghost" href="/admin/logout">
            <LogOut size={18} aria-hidden="true" />
            Logout
          </a>
        </div>
      </section>

      <section className="admin-stats" aria-label="Lead summary">
        <article>
          <UsersRound size={22} aria-hidden="true" />
          <span>Total leads</span>
          <strong>{leads.length}</strong>
        </article>
        <article>
          <Search size={22} aria-hidden="true" />
          <span>Projects requested</span>
          <strong>{projects}</strong>
        </article>
        <article>
          <Phone size={22} aria-hidden="true" />
          <span>Site visit signals</span>
          <strong>{siteVisits}</strong>
        </article>
      </section>

      <section className="lead-board">
        <div className="lead-board__heading">
          <div>
            <p className="eyebrow">Saved Data View</p>
            <h2>Recent enquiries</h2>
          </div>
          <span>{leads.length ? "Newest first" : "No leads yet"}</span>
        </div>

        {leads.length ? (
          <>
            <div className="lead-table" role="region" aria-label="Lead table">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Project</th>
                    <th>Budget</th>
                    <th>Requirement</th>
                    <th>Created</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id}>
                      <td>
                        <strong>{lead.name}</strong>
                        <small>{lead.source}</small>
                      </td>
                      <td>
                        <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                        {lead.email ? <small>{lead.email}</small> : null}
                      </td>
                      <td>{lead.project}</td>
                      <td>{lead.budget}</td>
                      <td>
                        <span>{lead.requirement || "Not specified"}</span>
                        {lead.visitDate ? <small>Visit: {lead.visitDate}</small> : null}
                        {lead.message ? <small>{lead.message}</small> : null}
                      </td>
                      <td>{formatDate(lead.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lead-cards">
              {leads.map((lead) => (
                <article key={lead.id} className="lead-card">
                  <div>
                    <strong>{lead.name}</strong>
                    <span>{formatDate(lead.createdAt)}</span>
                  </div>
                  <a href={`tel:${lead.phone}`}>{lead.phone}</a>
                  {lead.email ? <span>{lead.email}</span> : null}
                  <p>{lead.project}</p>
                  <small>{lead.budget}</small>
                  {lead.message ? <em>{lead.message}</em> : null}
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="empty-state">
            <h3>No leads saved yet</h3>
            <p>Submit the public enquiry form once and it will appear here automatically.</p>
          </div>
        )}
      </section>
    </main>
  );
}


