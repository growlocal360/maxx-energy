import { Metadata } from "next";
import DataCentersClient from "./DataCentersClient";

// Dedicated page for the Data Centers market. This static route takes
// precedence over the generic /markets/[slug] page.
export const metadata: Metadata = {
  title: "Data Centers | Markets | MAXX Energy Services",
  description:
    "Engineered hydronic flushing, cooling water chemistry, bulk chemical supply, and spill containment for hyperscale and colocation data center builds — with 24-hour onsite crews through turnover.",
  openGraph: {
    title: "Data Centers | MAXX Energy Services",
    description:
      "Clean loops. Protected assets. Commissioning on schedule. Hydronic flushing, water treatment, chemical supply, and containment for data centers.",
    images: ["/markets/data-centers/hero.jpg"],
  },
};

export default function DataCentersPage() {
  return <DataCentersClient />;
}
