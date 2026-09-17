"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Droplets,
  FlaskConical,
  Beaker,
  Truck,
  Shield,
  Volume2,
  Phone,
  Mail,
  User,
  FileText,
  HardHat,
  ClipboardCheck,
  Activity,
} from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const plugInPoints = [
  "Facility water (FW) loops — equipment yards, condenser and process water piping",
  "Technical water (TW) loops — row-by-row rack cooling systems",
  "Chilled water headers, manifolds, and bypass circuits",
  "Cooling towers, closed loops, and makeup water treatment",
  "Generator yards, chemical storage, and fuel transfer areas",
];

const stats = [
  {
    value: "24/7",
    label:
      "Onsite labor for support, material handling, install, flushing, and equipment removal during active operations",
  },
  { value: "100+", label: "Chemical products available by drum, tote, or bulk" },
  { value: "6", label: "Strategic basin locations backing nationwide delivery" },
  {
    value: "100%",
    label: "Reliability focused — one accountable partner from plan to final report",
  },
];

const whyPoints = [
  {
    title: "Engineered, not improvised.",
    body: "Every flush begins with a plan tailored to the system in front of us — correctly sized pump and filtration packages, target velocities, phasing, and connection points documented before we mobilize.",
  },
  {
    title: "Built around your schedule.",
    body: "Mobilizations are sequenced area by area and row by row so flushing tracks the construction and turnover sequence instead of fighting it.",
  },
  {
    title: "One partner, full stack.",
    body: "Flushing crews, treatment chemistry, bulk chemical logistics, and containment products come from the same organization — fewer vendors, fewer gaps.",
  },
  {
    title: "Documented turnover.",
    body: "Flow measurements, chemical readings, and a final report give the owner, GC, and mechanical contractor a defensible record of system cleanliness.",
  },
];

const services = [
  {
    icon: Droplets,
    title: "Hydronic Flushing & Chemical Cleaning",
    body: "Full-scope facility water and technical water flushing with engineered, correctly sized pump and filtration packages, hoses, fittings, and skilled labor.",
    points: [
      "Clear water flush at engineered minimum velocity",
      "Chemical circulation at reduced velocity for up to 24 hours",
      "Final dilution, rinse, and flow verification",
      "Temporary hose connections to flush ports",
    ],
  },
  {
    icon: FlaskConical,
    title: "Cooling Water Treatment",
    body: "Water treatment programs for open cooling towers, closed loops, and condenser water that hold heat transfer efficiency and protect metallurgy.",
    points: [
      "Corrosion and scale inhibitors",
      "Registered biocides and biofilm control",
      "Dispersants and passivation chemistry",
      "Sampling support alongside your treatment provider",
    ],
  },
  {
    icon: Beaker,
    title: "Technical Water & Specialty Fluids",
    body: "Treated and specialty fluids for precision cooling loops, blended to spec and delivered to the pad when the schedule calls for them.",
    points: [
      "Treated and process water for loop fill",
      "Inhibited glycol and heat transfer fluids",
      "Custom blending and precision formulation",
      "Drum, tote, or bulk packaging",
    ],
  },
  {
    icon: Truck,
    title: "Bulk Chemical Supply & Logistics",
    body: "A 100+ product chemical line with distribution built for staged jobsite delivery instead of guesswork.",
    points: [
      "Commodity, specialty, and industrial chemicals",
      "Deliveries staged to the commissioning sequence",
      "Consolidated supply across multiple site phases",
      "Nationwide reach from six basin locations",
    ],
  },
  {
    icon: Shield,
    title: "Spill Containment & Environmental Protection",
    body: "Containment products engineered for high chemical resistance in demanding industrial environments — sized for equipment yards and storage areas.",
    points: [
      "Foam wall spill berms and L-bracket berms",
      "Pond and secondary containment liners",
      "Spill response kits",
      "Generator, fuel, and chemical storage protection",
    ],
  },
  {
    icon: Volume2,
    title: "Dust & Noise Control",
    body: "Site-condition control for the construction and testing phases, when neighbors, inspectors, and equipment all have a stake in the outcome.",
    points: [
      "Dust control systems for haul roads and pads",
      "Noise control barriers",
      "Support for environmental compliance requirements",
      "Deployment coordinated with site activity",
    ],
  },
];

const programSteps = [
  {
    title: "Technical data & flush concept",
    body: "We collect system data, then develop a flush concept covering flow groups and phasing, procedure outline, piping connection plan, makeup and discharge water strategy, equipment locations, and bypass approach.",
  },
  {
    title: "Engineered flush plan",
    body: "The concept becomes a documented, engineered flush plan: target branch flow rates, final equipment sizing and logistics, expected makeup and discharge volumes and rates, and equipment submittals.",
  },
  {
    title: "Planning & scheduling meetings",
    body: "Pre-job coordination with the owner, GC, mechanical contractor, and treatment provider so possible scenarios are addressed and mitigation plans are in place before anyone arrives on site.",
  },
  {
    title: "Mobilization",
    body: "Crews, trucks, pumps, filtration vessels, hoses, tools, filters, forklifts, and man lifts arrive as a package. Mobilization and demobilization are planned per area and per phase.",
  },
  {
    title: "Flush execution with 24-hour support",
    body: "Clear water flush at engineered velocity, chemical circulation, and final rinse — with onsite labor around the clock for support, material handling, installation, flushing, and removal of temporary hoses and equipment.",
  },
  {
    title: "Documentation & turnover",
    body: "Flow measurements and chemical readings are recorded throughout, and a final report documents every service performed on site for owner and contractor sign-off.",
  },
];

const scopeIncluded = [
  "Engineered flush plan customized to site requirements",
  "Planning and scheduling meetings with mitigation plans in place before mobilization",
  "Mobilization and demobilization of crews and equipment for each planned phase",
  "Engineered, correctly sized pumps and filtration packages",
  "Temporary hose connections to flush connection points",
  "Flow measurements and chemical readings, coordinated with the selected chemical provider",
  "Forklifts, man lifts, pumps, and tools required for the stated flushing scope",
  "24-hour onsite labor for support, material handling, install, flushing, and equipment removal",
  "Final report and documentation for all services performed on site",
];

const scopeCoordinated = [
  "Headers, manifolds, bypasses, temporary piping spools, valves, and backflow preventers",
  "Auxiliary equipment such as heat exchangers, temporary chillers, air handlers, generators, and temporary cooling",
  "Structural supports for hoses, piping, and equipment",
  "Crane support and specialty lifting beyond our standard equipment",
  "Electrical power and fuel supply for flush equipment",
  "Water storage, supply, and discharge capacity, including permits and permissions",
  "Hydro testing completed and passed before mobilization",
  "Site readiness to accept equipment and begin work on the mobilization date",
];

const lifecycle = [
  {
    icon: HardHat,
    phase: "Construction",
    body: "Dust and noise control, spill berms and liners for laydown yards and chemical storage, containment for generator and fuel areas, and early flush planning built into the schedule.",
  },
  {
    icon: ClipboardCheck,
    phase: "Commissioning",
    body: "Engineered facility water and technical water flushes, chemical cleaning and passivation, loop fill with treated water or inhibited fluids, flow verification, and documented turnover packages.",
  },
  {
    icon: Activity,
    phase: "Operations",
    body: "Ongoing cooling water treatment chemistry, makeup and process water programs, replenishment of specialty fluids, spill response supplies, and repeat flush support for expansions and retrofits.",
  },
];

const basins = [
  ["Permian / Delaware", "Southwest"],
  ["Eagle Ford", "South Texas"],
  ["Haynesville / Bossier", "Gulf Coast"],
  ["Bakken", "Northern Plains"],
  ["Marcellus", "Northeast"],
  ["Utica", "Appalachian"],
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={`font-semibold tracking-wider uppercase text-sm mb-3 ${
        light ? "text-maxx-mint" : "text-maxx-accent"
      }`}
    >
      {children}
    </p>
  );
}

export default function DataCentersClient() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-28 overflow-hidden bg-maxx-950">
        <Image
          src="/markets/data-centers/hero.jpg"
          alt="Temporary flush pump skids and filtration vessels connected to chiller equipment in a data center yard at dusk"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-maxx-950/90 via-maxx-950/60 to-maxx-950/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-maxx-950/60 via-transparent to-maxx-950/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <Link
              href="/markets"
              className="inline-flex items-center text-maxx-300 hover:text-maxx-accent transition-colors text-sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Markets
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-maxx-mint font-semibold tracking-wider uppercase text-sm mb-4"
              >
                Markets Served / Data Centers
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.08] mb-6"
              >
                Clean loops. Protected assets.{" "}
                <span className="text-maxx-mint">Commissioning on schedule.</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-lg sm:text-xl text-maxx-100 max-w-2xl leading-relaxed mb-8"
              >
                MAXX Energy Services supports hyperscale and colocation builds
                with engineered hydronic flushing, cooling water chemistry, bulk
                chemical supply, and spill containment — delivered by crews who
                stay on site around the clock until the system is turned over.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint text-maxx-950 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-maxx-accent/25"
                >
                  Request a Flush Consultation
                  <ArrowRight className="h-5 w-5" />
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center justify-center px-7 py-4 border border-white/25 bg-white/5 hover:bg-white/15 text-white rounded-lg font-semibold transition-all backdrop-blur-sm"
                >
                  Explore Our Services
                </a>
              </motion.div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-maxx-950/70 backdrop-blur-md border border-white/15 rounded-2xl p-7 sm:p-8"
            >
              <h2 className="text-white text-xl font-bold mb-5">
                Where we plug into your project
              </h2>
              <ul className="space-y-3.5">
                {plugInPoints.map((point) => (
                  <li key={point} className="flex gap-3 text-maxx-100 text-sm leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 rounded-full bg-maxx-mint shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        aria-label="MAXX Energy Services at a glance"
        className="bg-maxx-900 border-y border-maxx-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.value}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="border-l-2 border-maxx-mint/60 pl-5"
              >
                <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-maxx-200 text-sm leading-relaxed">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div {...fadeUp}>
            <div className="w-12 h-1 bg-gradient-to-r from-maxx-accent to-maxx-mint rounded mb-6" />
            <Eyebrow>Why it matters</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900 mb-6 leading-tight">
              A data center is only as reliable as the water moving through it.
            </h2>
            <p className="text-maxx-700 text-lg leading-relaxed">
              Weld slag, mill scale, pipe dope, construction debris, and
              biological growth all end up in newly built hydronic systems. Left
              in place, they plug coil passages and CDU strainers, foul heat
              transfer surfaces, accelerate corrosion, and put equipment
              warranties at risk before the first server rack ever comes online.
            </p>
          </motion.div>

          <ul className="space-y-6">
            {whyPoints.map((point, i) => (
              <motion.li
                key={point.title}
                {...fadeUp}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-maxx-accent/10">
                  <Check className="h-4 w-4 text-maxx-accent" />
                </span>
                <p className="text-maxx-700 leading-relaxed">
                  <strong className="text-maxx-900">{point.title}</strong>{" "}
                  {point.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 bg-maxx-50 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl mb-12">
            <Eyebrow>Service Offerings</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900 mb-4 leading-tight">
              Everything the mechanical scope needs from a chemical and water
              partner
            </h2>
            <p className="text-maxx-700 text-lg">
              Six capability areas, deployed individually or as a coordinated
              program across the build.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.title}
                  {...fadeUp}
                  transition={{ delay: i * 0.06 }}
                  className="bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:shadow-maxx-accent/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 bg-maxx-accent/10 rounded-xl">
                      <Icon className="h-6 w-6 text-maxx-accent" />
                    </div>
                    <span className="font-mono text-sm font-semibold text-maxx-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-maxx-900 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-maxx-600 text-sm leading-relaxed mb-5">
                    {service.body}
                  </p>
                  <ul className="space-y-2">
                    {service.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-maxx-700">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-maxx-mint shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Flushing Program */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-14">
            <motion.div {...fadeUp}>
              <Eyebrow>The MAXX Flushing Program</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900 mb-5 leading-tight">
                From technical data to signed-off system, in six steps
              </h2>
              <p className="text-maxx-700 text-lg leading-relaxed">
                Every flush we perform follows our internal MAXX Energy Services
                flushing standards, and our team works hand in hand with the
                mechanical trade to carry the agreed plan through to completion.
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="relative aspect-[3/2] rounded-2xl overflow-hidden shadow-xl shadow-maxx-900/10"
            >
              <Image
                src="/markets/data-centers/flush-program.jpg"
                alt="Chilled water headers with valved connection points and temporary flush hoses running to a filtration vessel"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>
          </div>

          <ol className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programSteps.map((step, i) => (
              <motion.li
                key={step.title}
                {...fadeUp}
                transition={{ delay: i * 0.06 }}
                className="relative bg-maxx-50 border border-maxx-100 rounded-2xl p-7"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-maxx-accent to-maxx-mint text-maxx-950 font-bold mb-5">
                  {i + 1}
                </span>
                <h3 className="text-lg font-bold text-maxx-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-maxx-600 text-sm leading-relaxed">{step.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      {/* Scope Clarity */}
      <section className="py-20 bg-maxx-900 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl mb-12">
            <Eyebrow light>Scope Clarity</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 leading-tight">
              What we bring, and what we coordinate
            </h2>
            <p className="text-maxx-200 text-lg">
              No surprises at the trailer. Here is how a typical MAXX flush scope
              divides responsibility.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6">
            <motion.div
              {...fadeUp}
              className="bg-white rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-maxx-900 mb-6">
                Included in a MAXX flush scope
              </h3>
              <ul className="space-y-3.5">
                {scopeIncluded.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-maxx-700 leading-relaxed">
                    <Check className="h-4 w-4 mt-0.5 text-maxx-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ delay: 0.1 }}
              className="bg-maxx-950/60 border border-maxx-700 rounded-2xl p-8"
            >
              <h3 className="text-xl font-bold text-white mb-6">
                Coordinated with site and trade partners
              </h3>
              <ul className="space-y-3.5">
                {scopeCoordinated.map((item) => (
                  <li key={item} className="flex gap-3 text-sm text-maxx-100 leading-relaxed">
                    <span className="mt-1.5 w-2 h-2 rounded-full border border-maxx-mint shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.15 }}
            className="mt-8 border-l-2 border-maxx-mint bg-maxx-950/40 rounded-r-xl px-6 py-5 text-sm text-maxx-100 leading-relaxed"
          >
            Flush performance depends on water logistics: makeup water supply
            and discharge capacity must support the flow rates defined in the
            engineered flush plan and meet an approved flow capacity confirmed by
            MAXX before award. Water treatment chemicals can be supplied directly
            by MAXX rather than sourced separately — one of the simplest ways to
            reduce cost and vendor count on a flush package.
          </motion.p>
        </div>
      </section>

      {/* Lifecycle */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="max-w-3xl mb-12">
            <Eyebrow>Full Lifecycle Coverage</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900 leading-tight">
              Support that does not end at turnover
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {lifecycle.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.phase}
                  {...fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="border border-maxx-100 rounded-2xl p-8 border-t-4 border-t-maxx-accent"
                >
                  <Icon className="h-8 w-8 text-maxx-accent mb-5" />
                  <h3 className="text-xl font-bold text-maxx-900 mb-3">
                    {item.phase}
                  </h3>
                  <p className="text-maxx-600 text-sm leading-relaxed">{item.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Strategic Presence */}
      <section className="py-20 bg-maxx-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div {...fadeUp}>
            <div className="w-12 h-1 bg-gradient-to-r from-maxx-accent to-maxx-mint rounded mb-6" />
            <Eyebrow>Strategic Presence</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900 leading-tight">
              Positioned where data center growth is happening
            </h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ delay: 0.1 }}>
            <p className="text-maxx-700 text-lg leading-relaxed mb-8">
              MAXX Energy Services delivers nationwide from six strategic basin
              locations, with distribution infrastructure built for the volume
              and response times that heavy industrial work demands — including
              markets seeing the fastest data center expansion in the country.
            </p>
            <div className="flex flex-wrap gap-3">
              {basins.map(([name, region]) => (
                <span
                  key={name}
                  className="inline-flex items-center gap-1.5 bg-white border border-maxx-100 rounded-full px-4 py-2 text-sm text-maxx-600"
                >
                  <strong className="text-maxx-900">{name}</strong>
                  <span className="text-maxx-300">·</span>
                  {region}
                </span>
              ))}
            </div>
            <Link
              href="/shale-plays"
              className="inline-flex items-center mt-6 text-maxx-accent hover:text-maxx-600 font-semibold text-sm transition-colors"
            >
              View our basin locations
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="relative py-20 overflow-hidden bg-maxx-950 scroll-mt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800" />
        <div className="absolute inset-0 grid-pattern opacity-40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <Eyebrow light>Ready to Get Started?</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-5 leading-tight">
              Let&apos;s build the flush plan around your schedule
            </h2>
            <p className="text-maxx-200 text-lg leading-relaxed mb-8">
              Send us your drawings and commissioning sequence, and our team will
              walk the scope with you — flush concept, water logistics,
              chemistry, and containment in one conversation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:information@maxxenergysvcs.com?subject=Data%20Center%20Flush%20%26%20Chemical%20Services%20Inquiry"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint text-maxx-950 rounded-lg font-bold transition-all shadow-lg hover:shadow-xl hover:shadow-maxx-accent/25"
              >
                Request a Consultation
                <ArrowRight className="h-5 w-5" />
              </a>
              <a
                href="tel:1-833-777-6299"
                className="inline-flex items-center justify-center gap-2 px-7 py-4 border border-white/25 bg-white/5 hover:bg-white/15 text-white rounded-lg font-semibold transition-all"
              >
                <Phone className="h-5 w-5" />
                Call 1-833-777-MAXX
              </a>
            </div>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/15 rounded-2xl divide-y divide-white/10"
          >
            <div className="flex items-start gap-4 p-6">
              <Phone className="h-5 w-5 text-maxx-mint mt-0.5 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-maxx-300 mb-1">Phone</p>
                <a href="tel:1-833-777-6299" className="text-white font-semibold hover:text-maxx-mint transition-colors">
                  1-833-777-MAXX (6299)
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <Mail className="h-5 w-5 text-maxx-mint mt-0.5 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-maxx-300 mb-1">Email</p>
                <a href="mailto:information@maxxenergysvcs.com" className="text-white font-semibold hover:text-maxx-mint transition-colors break-all">
                  information@maxxenergysvcs.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <User className="h-5 w-5 text-maxx-mint mt-0.5 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-maxx-300 mb-1">Data Center Programs</p>
                <a href="mailto:bryan@maxxenergysvcs.com" className="text-white font-semibold hover:text-maxx-mint transition-colors">
                  Bryan Stubblefield, Chief Revenue Officer
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6">
              <FileText className="h-5 w-5 text-maxx-mint mt-0.5 shrink-0" />
              <div>
                <p className="text-xs uppercase tracking-wider text-maxx-300 mb-1">What to send</p>
                <p className="text-white font-semibold leading-relaxed">
                  Drawing set, system volumes, commissioning sequence, and site
                  water availability
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Back Navigation */}
      <section className="py-8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/markets"
            className="inline-flex items-center text-maxx-600 hover:text-maxx-accent transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to All Markets
          </Link>
        </div>
      </section>
    </>
  );
}
