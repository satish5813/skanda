import { LogIn } from "lucide-react";
import { redirect } from "next/navigation";
import { setAdminSession, validateAdminCredentials } from "@/lib/auth";

type LoginPageProps = {
  searchParams?: {
    error?: string;
  };
};

async function login(formData: FormData) {
  "use server";

  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");

  if (!validateAdminCredentials(username, password)) {
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
  return (
    <main className="admin-shell admin-shell--centered">
      <section className="admin-login">
        <img className="admin-login__logo" src="/logo.png" alt="Skanda Estates" />
        <p className="eyebrow">Admin Board</p>
        <h1>Lead dashboard access</h1>
        <p>
          Sign in to view saved enquiries, inspect buyer requirements, and download CSV lead data.
        </p>

        <form action={login} className="admin-login__form">
          <label>
            Username
            <input name="username" type="text" required autoComplete="username" />
          </label>
          <label>
            Admin password
            <input name="password" type="password" required autoComplete="current-password" />
          </label>
          {searchParams?.error === "invalid" ? (
            <p className="form-status form-status--error">Invalid username or password.</p>
          ) : null}
          <button className="button button--primary button--full" type="submit">
            <LogIn size={18} aria-hidden="true" />
            Open dashboard
          </button>
        </form>
      </section>
    </main>
  );
}
