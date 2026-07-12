import Image from "next/image";
import Link from "next/link";
import {
  Baby,
  Cookie,
  Database,
  FileText,
  Lock,
  Mail,
  MessageCircle,
  Phone,
  RefreshCw,
  Share2,
  ShieldCheck,
  UserCheck
} from "lucide-react";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How Skanda Estates collects, uses, and protects your personal information across our website, lead forms, and WhatsApp communications.",
  robots: {
    index: true,
    follow: true
  }
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label="Primary navigation">
          <Link className="brand" href="/">
            <Image src="/logo.png" alt="Skanda Estates" width={48} height={48} priority />
            <span>
              <strong>Skanda Estates</strong>
              <small>Building Better Tomorrow</small>
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/#projects">Projects</Link>
            <Link href="/#gallery">Gallery</Link>
            <Link href="/#lead-form">Enquire</Link>
          </div>
        </nav>
      </header>

      <main className="legal-page">
        <section className="legal-hero">
          <p className="eyebrow">Your Privacy Matters</p>
          <h1>Privacy Policy</h1>
          <p className="legal-hero__meta">
            <ShieldCheck size={16} aria-hidden="true" />
            Skanda Estates &middot; Last Updated: July 12, 2026
          </p>
        </section>

        <section className="legal-body">
          <div className="legal-intro">
            <p>
              Welcome to Skanda Estates (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We
              are committed to protecting your personal information and your right to privacy. This
              Privacy Policy explains what information we collect, how we use it, and what rights you
              have in relation to it.
            </p>
            <p>
              This policy applies to all information collected through our website
              (https://www.skandaestates.in), our advertisements on Facebook, Instagram and other
              platforms, our lead generation forms, WhatsApp communications, and any related services,
              sales, and marketing activities.
            </p>
          </div>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <FileText size={20} />
              </span>
              1. Information We Collect
            </h2>
            <p>We collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Fill out a lead form on our website or on our Facebook/Instagram advertisements</li>
              <li>Contact us via WhatsApp, phone, or email</li>
              <li>Express interest in our projects, plots, or properties</li>
              <li>Register for a site visit</li>
            </ul>
            <p>The personal information we collect may include:</p>
            <ul>
              <li>
                <strong>Name</strong> — to identify and address you
              </li>
              <li>
                <strong>Phone number</strong> — to contact you regarding your enquiry
              </li>
              <li>
                <strong>Email address</strong> — to send you project details and updates
              </li>
              <li>
                <strong>Property preferences</strong> — such as plot size, budget, payment preference,
                and purchase timeline
              </li>
              <li>
                <strong>Location information</strong> — city or area, to suggest suitable projects
              </li>
            </ul>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <UserCheck size={20} />
              </span>
              2. How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>
                Respond to your enquiries about our projects (including Macadamia Estate and other
                Skanda Estates projects)
              </li>
              <li>
                Contact you via phone, WhatsApp, SMS, or email regarding property details, pricing,
                EMI options, and site visits
              </li>
              <li>Schedule and coordinate free site visits</li>
              <li>
                Send you updates about new projects, offers, and promotions (you may opt out at any
                time)
              </li>
              <li>Improve our services, website, and advertising campaigns</li>
              <li>Comply with legal obligations</li>
            </ul>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <Share2 size={20} />
              </span>
              3. Sharing of Your Information
            </h2>
            <p>
              We respect your privacy. We do <strong>not</strong> sell, rent, or trade your personal
              information to third parties for their marketing purposes.
            </p>
            <p>Your information may be shared only with:</p>
            <ul>
              <li>
                <strong>Our internal sales team</strong> — to respond to your enquiry
              </li>
              <li>
                <strong>Service providers</strong> — such as CRM tools, communication platforms (e.g.,
                WhatsApp Business), and advertising platforms (e.g., Meta) that help us manage
                enquiries, strictly for the purposes described in this policy
              </li>
              <li>
                <strong>Legal authorities</strong> — if required by law, regulation, or legal process
              </li>
            </ul>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <MessageCircle size={20} />
              </span>
              4. Data from Facebook/Instagram Lead Ads
            </h2>
            <p>
              When you submit your details through our lead forms on Facebook or Instagram, the
              information you provide (such as name, phone number, and your answers to form questions)
              is shared with us by Meta Platforms, Inc. in accordance with their Data Policy. We use
              this information solely to contact you about your property enquiry as described in this
              policy.
            </p>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <Database size={20} />
              </span>
              5. Data Retention
            </h2>
            <p>
              We retain your personal information only for as long as necessary to fulfil the purposes
              outlined in this policy, respond to your enquiry, and comply with legal requirements.
              You may request deletion of your data at any time (see Section 7).
            </p>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <Lock size={20} />
              </span>
              6. Data Security
            </h2>
            <p>
              We use reasonable administrative and technical safeguards to protect your personal
              information. However, no method of transmission over the internet is 100% secure, and we
              cannot guarantee absolute security.
            </p>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <ShieldCheck size={20} />
              </span>
              7. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access the personal information we hold about you</li>
              <li>Correct any inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>
                Opt out of marketing communications at any time by replying &ldquo;STOP&rdquo; on
                WhatsApp/SMS or informing our team
              </li>
            </ul>
            <p>To exercise any of these rights, contact us using the details below.</p>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <Cookie size={20} />
              </span>
              8. Cookies and Website Analytics
            </h2>
            <p>
              Our website may use cookies and similar technologies to improve user experience and
              analyse website traffic. You can control cookies through your browser settings.
            </p>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <Baby size={20} />
              </span>
              9. Children&rsquo;s Privacy
            </h2>
            <p>
              Our services are intended for individuals aged 18 and above. We do not knowingly collect
              information from minors.
            </p>
          </article>

          <article className="legal-section">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <RefreshCw size={20} />
              </span>
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be posted
              on this page with a revised &ldquo;Last Updated&rdquo; date.
            </p>
          </article>

          <article className="legal-section legal-contact">
            <h2>
              <span className="legal-section__num" aria-hidden="true">
                <Mail size={20} />
              </span>
              11. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy or how we handle your data, please
              contact us:
            </p>
            <div className="legal-contact__card">
              <strong>Skanda Estates</strong>
              <a href="mailto:sales@skandaestates.in">
                <Mail size={16} aria-hidden="true" />
                sales@skandaestates.in
              </a>
              <a href="tel:+919876543210">
                <Phone size={16} aria-hidden="true" />
                +91 98765 43210
              </a>
              <span>Website: https://www.skandaestates.in</span>
            </div>
          </article>
        </section>
      </main>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Skanda Estates. Building Better Tomorrow.</span>
        <span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </span>
      </footer>
    </>
  );
}
