export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  location: string;
  description: string;
  heroImage: string;
  rate: string;
  investment: string;
  focus: string;
  highlights: string[];
  gallery: string[];
  seoDescription: string;
};

export const projects: Project[] = [
  {
    slug: "cloud-farming",
    title: "Cloud Farming",
    shortTitle: "Cloud Farming",
    location: "Vinukonda, Andhra Pradesh",
    description:
      "Integrated farm ownership positioned for sustainable agriculture, annual benefit communication, and long-term land value.",
    heroImage: "/projects/cloud-farming/hero.jpeg",
    rate: "Rs. 629 / sq. yd",
    investment: "Rs. 7.61L onwards",
    focus: "Farm-backed land",
    highlights: [
      "1/4, 1/2, and 1 acre package options",
      "Booking amount communication from Rs. 2 Lakhs",
      "Crop profit, appreciation, and food credit benefits subject to final documents"
    ],
    gallery: [
      "/projects/cloud-farming/gallery-1.jpeg",
      "/projects/cloud-farming/gallery-2.jpeg",
      "/projects/cloud-farming/gallery-3.jpeg",
      "/projects/cloud-farming/gallery-4.jpeg"
    ],
    seoDescription:
      "Cloud Farming by Skanda Estates in Vinukonda, Andhra Pradesh with farm-backed land investment options and project enquiry support."
  },
  {
    slug: "perams-aditya",
    title: "Peram's Aditya - Gadimalkapur",
    shortTitle: "Peram's Aditya",
    location: "Shankarpally Growth Corridor",
    description:
      "Strategic land banking near NIMZ influence, NH-65 connectivity, and industrial growth triggers around Gadimalkapur.",
    heroImage: "/projects/perams-aditya/hero.jpeg",
    rate: "Rs. 20,000 / sq. yd",
    investment: "Rs. 36.60L onwards",
    focus: "Growth corridor plots",
    highlights: [
      "183 sq. yd minimum plot communication",
      "NIMZ Zaheerabad and NH-65 corridor context",
      "Long-term appreciation thesis subject to market conditions"
    ],
    gallery: [
      "/projects/perams-aditya/gallery-1.jpeg",
      "/projects/perams-aditya/gallery-2.jpeg",
      "/projects/perams-aditya/gallery-3.jpeg",
      "/projects/perams-aditya/hero.jpeg"
    ],
    seoDescription:
      "Peram's Aditya Gadimalkapur by Skanda Estates near the Shankarpally growth corridor with plot enquiry and site visit support."
  }
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export const budgetOptions = [
  "Below Rs. 10 Lakhs",
  "Rs. 10 Lakhs - Rs. 25 Lakhs",
  "Rs. 25 Lakhs - Rs. 50 Lakhs",
  "Above Rs. 50 Lakhs",
  "Need consultation"
];

export const requirementOptions = [
  "Investment details",
  "Site visit",
  "Plot availability",
  "Document verification",
  "Price sheet"
];
