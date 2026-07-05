"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, Send, UserRound } from "lucide-react";
import { budgetOptions, projects, requirementOptions } from "@/lib/projects";

type LeadFormProps = {
  source: string;
  defaultProject?: string;
  compact?: boolean;
};

type Status = {
  kind: "idle" | "loading" | "success" | "error";
  message: string;
};

const defaultStatus: Status = {
  kind: "idle",
  message: "Fill the required fields and press Submit enquiry."
};

export function LeadForm({ source, defaultProject = "", compact = false }: LeadFormProps) {
  const [status, setStatus] = useState<Status>(defaultStatus);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("lead") === "success") {
      setStatus({
        kind: "success",
        message: "Thank you! Your enquiry has been received. Our team will contact you shortly."
      });
    }

    if (params.get("lead") === "error") {
      setStatus({
        kind: "error",
        message: params.get("message") || "Unable to save the enquiry. Please try again."
      });
    }
  }, []);

  async function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const project = String(formData.get("project") || "").trim();
    const budget = String(formData.get("budget") || "").trim();

    if (name.length < 2) {
      setStatus({ kind: "error", message: "Please enter your full name." });
      form.querySelector<HTMLInputElement>('[name="name"]')?.focus();
      return;
    }

    if (!/^[0-9+()\-\s]{8,20}$/.test(phone)) {
      setStatus({ kind: "error", message: "Please enter a valid phone number." });
      form.querySelector<HTMLInputElement>('[name="phone"]')?.focus();
      return;
    }

    if (!project) {
      setStatus({ kind: "error", message: "Please select a project." });
      form.querySelector<HTMLSelectElement>('[name="project"]')?.focus();
      return;
    }

    if (!budget) {
      setStatus({ kind: "error", message: "Please select your budget." });
      form.querySelector<HTMLSelectElement>('[name="budget"]')?.focus();
      return;
    }

    setStatus({ kind: "loading", message: "Saving your enquiry..." });

    const payload = {
      name,
      phone,
      email: String(formData.get("email") || ""),
      project,
      budget,
      requirement: String(formData.get("requirement") || ""),
      visitDate: String(formData.get("visitDate") || ""),
      message: String(formData.get("message") || ""),
      source,
      website: String(formData.get("website") || "")
    };

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setStatus({
          kind: "error",
          message: body?.error || "Unable to save the enquiry. Please try again."
        });
        return;
      }

      form.reset();
      setStatus({
        kind: "success",
        message: "Thank you! Your enquiry has been received. Our team will contact you shortly."
      });
    } catch {
      form.submit();
    }
  }

  return (
    <form
      action="/api/leads"
      className={`lead-form ${compact ? "lead-form--compact" : ""}`}
      method="post"
      noValidate
      onSubmit={submitLead}
    >
      <input aria-hidden="true" autoComplete="off" className="lead-form__trap" name="website" tabIndex={-1} />
      <input name="source" type="hidden" value={source} />
      <div className="form-heading">
        <span className="icon-chip" aria-hidden="true">
          <UserRound size={18} />
        </span>
        <div>
          <p className="eyebrow">Lead Capture</p>
          <h2>Request project details</h2>
        </div>
      </div>

      <label>
        Full name
        <input name="name" placeholder="Your name" />
      </label>

      <div className="form-grid">
        <label>
          Phone
          <input name="phone" placeholder="+91 98765 43210" inputMode="tel" />
        </label>
        <label>
          Email
          <input name="email" type="email" placeholder="name@example.com" />
        </label>
      </div>

      <div className="form-grid">
        <label>
          Project
          <select name="project" defaultValue={defaultProject}>
            <option value="">Select project</option>
            {projects.map((project) => (
              <option key={project.slug} value={project.title}>
                {project.title}
              </option>
            ))}
            <option value="Cloud Farming - 1/4 Acre">Cloud Farming - 1/4 Acre</option>
            <option value="Cloud Farming - 1/2 Acre">Cloud Farming - 1/2 Acre</option>
            <option value="Cloud Farming - 1 Acre">Cloud Farming - 1 Acre</option>
          </select>
        </label>
        <label>
          Budget
          <select name="budget" defaultValue="">
            <option value="">Select budget</option>
            {budgetOptions.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="form-grid">
        <label>
          Visit date
          <span className="input-with-icon">
            <CalendarDays size={18} aria-hidden="true" />
            <input name="visitDate" type="date" />
          </span>
        </label>
        <label>
          Requirement
          <select name="requirement" defaultValue={requirementOptions[0]}>
            {requirementOptions.map((requirement) => (
              <option key={requirement} value={requirement}>
                {requirement}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label>
        Message
        <textarea
          name="message"
          rows={4}
          placeholder="Tell us your preferred plot size, callback time, or site visit plan"
        />
      </label>

      <button className="button button--primary button--full" disabled={status.kind === "loading"} type="submit">
        <Send size={18} aria-hidden="true" />
        {status.kind === "loading" ? "Saving..." : "Submit enquiry"}
      </button>

      <p className={`form-status form-status--${status.kind}`} role="status" aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
