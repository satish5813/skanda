import { AlertTriangle, LogIn } from "lucide-react";
import { redirect } from "next/navigation";
import { isAdminConfigured, setAdminSession, validateAdminPassword } from "@/lib/auth";

type LoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

async function login(formData: FormData) {
  "use server";

  const password = String(formData.get("password") || "");

  if (!validateAdminPassword(password)) {
    redirect("/admin/login?error=invalid");
  }

  setAdminSession();
  redirect("/admin");
}

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Login | Skanda Estates",
  robots: {
    index: false,
    follow: false
  }
};

export default function AdminLoginPage({ searchParams }: LoginPageProps) {
  const configured = isAdminConfigured();

  return (
    <main className="admin-shell admin-shell--centered">
      <section className="admin-login">
        <img className="admin-login__logo" src="/logo.png" alt="Skanda Estates" />
        <p className="eyebrow">Admin Board</p>
        <h1>Lead dashboard access</h1>
        <p>
          Sign in to view saved enquiries, inspect buyer requirements, and download CSV lead data.
        </p>

        {!configured ? (
          <div className="setup-warning">
            <AlertTriangle size={20} aria-hidden="true" />
            <span>
              Set <strong>ADMIN_PASSWORD</strong> and <strong>AUTH_SECRET</strong> in your environment before using admin access.
            </span>
          </div>
        ) : (
          <form action={login} className="admin-login__form">
            <label>
              Admin password
              <input name="password" type="password" required autoComplete="current-password" />
            </label>
            {searchParams?.error === "invalid" ? (
              <p className="form-status form-status--error">Invalid admin password.</p>
            ) : null}
            <button className="button button--primary button--full" type="submit">
              <LogIn size={18} aria-hidden="true" />
              Open dashboard
            </button>
          </form>
        )}
      </section>
    </main>
  );
}


