import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skandaestates.in";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#173f35"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Skanda Estates | Land Investment Projects in Andhra Pradesh and Telangana",
    template: "%s | Skanda Estates"
  },
  description:
    "Explore Skanda Estates land investment projects including Cloud Farming in Vinukonda and Peram's Aditya Gadimalkapur near the Shankarpally growth corridor.",
  keywords: [
    "Skanda Estates",
    "land investment",
    "plots in Shankarpally",
    "Cloud Farming Vinukonda",
    "Peram's Aditya Gadimalkapur",
    "real estate Andhra Pradesh",
    "Telangana plots"
  ],
  authors: [{ name: "Skanda Estates" }],
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: "Skanda Estates | Building Better Tomorrow",
    description:
      "Premium land-backed projects with clear pricing, local project visuals, and guided buyer support.",
    url: siteUrl,
    siteName: "Skanda Estates",
    type: "website",
    images: [
      {
        url: "/projects/perams-aditya/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Skanda Estates land investment project"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Skanda Estates | Land Investment Projects",
    description: "Cloud Farming and strategic plotted land opportunities by Skanda Estates.",
    images: ["/projects/perams-aditya/hero.jpeg"]
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: "Skanda Estates",
    slogan: "Building Better Tomorrow",
    description:
      "Land investment and real estate project advisory for Cloud Farming, plotted layouts, and growth corridor opportunities.",
    areaServed: ["Andhra Pradesh", "Telangana"],
    email: "sales@skandaestates.in",
    telephone: "+919876543210",
    url: siteUrl
  };

  return (
    <html lang="en">
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
