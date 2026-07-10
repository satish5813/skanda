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
  plotOptions?: string[];
  paymentPlan?: {
    heading: string;
    note: string;
    items: { label: string; value: string }[];
  };
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
  },
  {
    slug: "macadamia-estate",
    title: "Macadamia Estate",
    shortTitle: "Macadamia Estate",
    location: "Narayanakhed Municipality (Abbenda)",
    description:
      "47-acre managed macadamia farmland with gunta-sized ownership, farm revenue sharing, easy EMI plans, and a luxury clubhouse with lifetime free membership.",
    heroImage: "/projects/macadamia-estate/hero.jpeg",
    rate: "Rs. 1,000 / sq. yd",
    investment: "Rs. 1.21L / gunta",
    focus: "Macadamia farmland",
    highlights: [
      "1 gunta (121 sq. yds) at Rs. 1,21,000 with spot registration",
      "Free NALA conversion communication on registration",
      "80% farm revenue share to the customer, 20% to the developer",
      "Year-on-year land rate appreciation as per market value",
      "Luxury clubhouse with lifetime free membership",
      "Sell your plot any time after 1 year — no maturity period"
    ],
    plotOptions: ["121 sq. yds", "303 sq. yds", "605 sq. yds", "1210 sq. yds"],
    paymentPlan: {
      heading: "Easy EMI ownership for 1 gunta (121 sq. yds).",
      note:
        "Example plan for 1 gunta. Flexible tenures of 12, 24, or 36 months are available — final schedule as per the payment agreement.",
      items: [
        { label: "Down payment", value: "Rs. 19,500 only" },
        { label: "Monthly EMI", value: "Rs. 4,500 x 36 months" },
        { label: "Total with EMI", value: "Rs. 1,81,500" },
        { label: "Tenure options", value: "12 / 24 / 36 months" }
      ]
    },
    gallery: [
      "/projects/macadamia-estate/gallery-1.jpeg",
      "/projects/macadamia-estate/gallery-2.jpeg",
      "/projects/macadamia-estate/gallery-3.jpeg",
      "/projects/macadamia-estate/gallery-4.jpeg",
      "/projects/macadamia-estate/gallery-5.jpeg",
      "/projects/macadamia-estate/gallery-6.jpeg"
    ],
    seoDescription:
      "Macadamia Estate by Skanda Estates — 47-acre macadamia farmland at Narayanakhed (Abbenda) with gunta plots from Rs. 1.21 Lakh, easy EMI plans, and farm revenue sharing."
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
