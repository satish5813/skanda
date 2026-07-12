import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  MapPinned,
  PhoneCall,
  ShieldCheck,
  Sprout,
  TrendingUp
} from "lucide-react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroSlideshow } from "@/components/HeroSlideshow";
import { LeadForm } from "@/components/LeadForm";
import { projects } from "@/lib/projects";

const heroSlides = [
  { src: "/projects/perams-aditya/hero.jpeg", alt: "Peram's Aditya plotted layout near Shankarpally growth corridor" },
  { src: "/projects/macadamia-estate/hero.jpeg", alt: "Macadamia Estate sapling plantation at Narayanakhed" },
  { src: "/projects/cloud-farming/hero.jpeg", alt: "Cloud Farming integrated farm land in Vinukonda" },
  { src: "/projects/perams-aditya/gallery-1.jpeg", alt: "Peram's Aditya project site visuals" },
  { src: "/projects/macadamia-estate/gallery-1.jpeg", alt: "Macadamia Estate nursery rows ready for plantation" },
  { src: "/projects/cloud-farming/gallery-2.jpeg", alt: "Cloud Farming green landscape view" }
];

const advantages = [
  {
    icon: ShieldCheck,
    title: "Clear guidance",
    text: "Project-wise pricing, document discussion, and buyer support before site visits."
  },
  {
    icon: MapPinned,
    title: "Location logic",
    text: "Investment pages built around corridor, access, and long-term demand context."
  },
  {
    icon: CalendarCheck,
    title: "Guided site visits",
    text: "Pick a convenient date and our team walks you through the project on the ground."
  },
  {
    icon: PhoneCall,
    title: "Quick response",
    text: "Every enquiry reaches our sales team immediately for a fast callback."
  }
];

export default function HomePage() {
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
            <a href="#projects">Projects</a>
            <a href="#insight">Insight</a>
            <a href="#gallery">Gallery</a>
            <a href="#lead-form">Enquire</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero">
          <HeroSlideshow slides={heroSlides} />
          <div className="hero__shade" />
          <div className="hero__content">
            <div className="hero-badge">
              <span className="hero-badge__dot" aria-hidden="true" />
              Land Investment Advisory
            </div>
            <h1>
              Skanda Estates
              <em className="hero__accent">Building Better Tomorrow</em>
            </h1>
            <p>
              Premium farm land and growth-corridor plots with transparent pricing,
              document guidance, and personally guided site visits.
            </p>
            <div className="hero__actions">
              <a className="button button--primary button--lg" href="#projects">
                Explore projects
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button--ghost button--lg" href="#lead-form">
                <PhoneCall size={17} aria-hidden="true" />
                Request callback
              </a>
            </div>
            <div className="hero-chips" aria-label="Project locations">
              <span>
                <MapPinned size={15} aria-hidden="true" />
                Vinukonda, Andhra Pradesh
              </span>
              <span>
                <MapPinned size={15} aria-hidden="true" />
                Shankarpally Corridor, Telangana
              </span>
              <span>
                <MapPinned size={15} aria-hidden="true" />
                Narayanakhed, Telangana
              </span>
            </div>
          </div>
          <aside className="hero-panel" aria-label="Project highlights">
            <div>
              <span>03</span>
              <strong>Featured projects</strong>
              <small>Farm land &amp; plotted layouts</small>
            </div>
            <div>
              <span>Rs. 1.21L</span>
              <strong>Entry investment</strong>
              <small>Macadamia Estate guntas onwards</small>
            </div>
            <div>
              <span>12,600 ac</span>
              <strong>NIMZ growth zone</strong>
              <small>Zaheerabad corridor influence</small>
            </div>
          </aside>
          <a className="hero-scroll" href="#projects" aria-label="Scroll to projects">
            <span aria-hidden="true" />
          </a>
        </section>

        <section className="section intro-section">
          <div>
            <p className="eyebrow">Introduction</p>
            <h2>Building trust, creating value, and securing future-ready land opportunities.</h2>
          </div>
          <p>
            Skanda Estates brings carefully evaluated real estate opportunities across Telangana
            and Andhra Pradesh. Every project is assessed for location strength, documentation
            clarity, and long-term growth potential — so you can invest with confidence.
          </p>
        </section>

        <section className="advantage-strip" aria-label="Skanda Estates platform strengths">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <article key={item.title}>
                <Icon size={24} aria-hidden="true" />
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </article>
            );
          })}
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading">
            <p className="eyebrow">Featured Projects</p>
            <h2>Choose the right land-backed opportunity.</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.slug}>
                <Link className="project-card__media" href={`/projects/${project.slug}`}>
                  <Image src={project.heroImage} alt={project.title} fill sizes="(max-width: 900px) 100vw, 50vw" />
                  <span>{project.location}</span>
                </Link>
                <div className="project-card__body">
                  <p className="eyebrow">{project.focus}</p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <dl className="spec-grid">
                    <div>
                      <dt>Rate</dt>
                      <dd>{project.rate}</dd>
                    </div>
                    <div>
                      <dt>Investment</dt>
                      <dd>{project.investment}</dd>
                    </div>
                  </dl>
                  <div className="card-actions">
                    <Link className="button button--primary" href={`/projects/${project.slug}`}>
                      Details
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>
                    <a className="button button--outline" href="#lead-form">
                      Enquire
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section insight-section" id="insight">
          <div className="insight-panel">
            <p className="eyebrow">Location Insight</p>
            <h2>Growth corridors create future demand.</h2>
            <p>
              Project positioning highlights industrial movement, employment generation, and
              improved access around the NIMZ influence zone and NH-65 connectivity.
            </p>
          </div>
          <div className="metric-grid">
            <article>
              <Building2 size={22} aria-hidden="true" />
              <strong>12,600 acres</strong>
              <span>NIMZ Zaheerabad zone</span>
            </article>
            <article>
              <TrendingUp size={22} aria-hidden="true" />
              <strong>2,00,000+</strong>
              <span>Expected employment generation</span>
            </article>
            <article>
              <Sprout size={22} aria-hidden="true" />
              <strong>Farm + plots</strong>
              <span>Diversified land-backed portfolio</span>
            </article>
          </div>
        </section>

        <section className="gallery-band" id="gallery">
          <div className="section-heading">
            <p className="eyebrow">Gallery</p>
            <h2>Real project visuals for buyer inspection.</h2>
          </div>
          <GalleryGrid
            images={projects.flatMap((project) =>
              project.gallery.slice(0, 2).map((image, index) => ({
                src: image,
                alt: `${project.title} project visual`,
                caption: project.shortTitle,
                large: index === 0
              }))
            )}
          />
        </section>

        <section className="section lead-section" id="lead-form">
          <div className="lead-copy">
            <p className="eyebrow">Enquiry</p>
            <h2>Tell us what you are looking for.</h2>
            <p>
              Share your details and preferred visit date — our team will call you back with
              pricing, plot availability, and site visit arrangements.
            </p>
          </div>
          <LeadForm source="Home page" />
        </section>
      </main>

      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Skanda Estates. Building Better Tomorrow.</span>
        <span>All project details are indicative and subject to final documentation.</span>
        <span>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </span>
      </footer>
    </>
  );
}
