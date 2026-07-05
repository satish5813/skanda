import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { GalleryGrid } from "@/components/GalleryGrid";
import { LeadForm } from "@/components/LeadForm";
import { getProject, projects } from "@/lib/projects";

type ProjectPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProject(params.slug);

  if (!project) {
    return {};
  }

  return {
    title: project.title,
    description: project.seoDescription,
    openGraph: {
      title: `${project.title} | Skanda Estates`,
      description: project.seoDescription,
      images: [project.heroImage]
    }
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <header className="site-header">
        <nav className="nav" aria-label={`${project.title} navigation`}>
          <Link className="brand" href="/">
            <Image src="/logo.png" alt="Skanda Estates" width={48} height={48} priority />
            <span>
              <strong>{project.shortTitle}</strong>
              <small>{project.location}</small>
            </span>
          </Link>
          <div className="nav-links">
            <Link href="/">Home</Link>
            <a href="#details">Details</a>
            <a href="#gallery">Gallery</a>
            <a href="#lead-form">Enquire</a>
          </div>
        </nav>
      </header>

      <main>
        <section className="project-hero">
          <Image className="hero__image" src={project.heroImage} alt={project.title} fill priority sizes="100vw" />
          <div className="hero__shade" />
          <div className="hero__content">
            <Link className="back-link" href="/">
              <ArrowLeft size={18} aria-hidden="true" />
              Back to Skanda Estates
            </Link>
            <p className="eyebrow">{project.location}</p>
            <h1>{project.title}</h1>
            <p>{project.description}</p>
            <div className="hero__actions">
              <a className="button button--primary" href="#lead-form">
                Book consultation
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="button button--ghost" href="#gallery">
                View gallery
              </a>
            </div>
          </div>
        </section>

        <section className="section project-detail" id="details">
          <div>
            <p className="eyebrow">Project Snapshot</p>
            <h2>{project.focus} with clear buyer follow-up.</h2>
            <p>{project.seoDescription}</p>
          </div>
          <div className="detail-list">
            {project.highlights.map((highlight) => (
              <div key={highlight}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section investment-strip" aria-label={`${project.title} investment summary`}>
          <article>
            <span>Rate</span>
            <strong>{project.rate}</strong>
          </article>
          <article>
            <span>Investment</span>
            <strong>{project.investment}</strong>
          </article>
          <article>
            <span>Focus</span>
            <strong>{project.focus}</strong>
          </article>
        </section>

        <section className="gallery-band" id="gallery">
          <div className="section-heading">
            <p className="eyebrow">Project Gallery</p>
            <h2>{project.shortTitle} visuals.</h2>
          </div>
          <GalleryGrid
            variant="project"
            images={project.gallery.map((image, index) => ({
              src: image,
              alt: `${project.title} gallery ${index + 1}`,
              caption: project.shortTitle,
              large: index === 0
            }))}
          />
        </section>

        <section className="section lead-section" id="lead-form">
          <div className="lead-copy">
            <p className="eyebrow">Project Enquiry</p>
            <h2>Send this buyer directly to sales follow-up.</h2>
            <p>
              The selected project is prefilled. Submissions are saved in the same SQLite admin database.
            </p>
          </div>
          <LeadForm source={`${project.title} page`} defaultProject={project.title} />
        </section>
      </main>
    </>
  );
}



