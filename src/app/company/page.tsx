"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Target, MapPin, ArrowRight, Droplets } from "lucide-react";

const subpages = [
  {
    title: "Our Team",
    description:
      "Meet the experienced professionals driving MAXX Energy Services forward with decades of combined industry expertise.",
    href: "/company/team",
    icon: Users,
  },
  {
    title: "Mission & Values",
    description:
      "Discover the core principles that guide every decision we make and every solution we deliver.",
    href: "/company/mission",
    icon: Target,
  },
  {
    title: "Locations",
    description:
      "Find our offices and service areas strategically positioned to serve customers across key markets.",
    href: "/company/locations",
    icon: MapPin,
  },
];

export default function CompanyPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800">
        <div className="absolute inset-0 grid-pattern opacity-50" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-maxx-mint/10 border border-maxx-mint/20 rounded-full mb-8"
          >
            <Droplets className="h-4 w-4 text-maxx-mint" />
            <span className="text-maxx-mint text-sm font-medium">
              Godley, TX &bull; Serving Nationwide
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            About <span className="text-gradient">MAXX</span> Energy Services
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-maxx-200 leading-relaxed max-w-3xl mx-auto"
          >
            A full-service chemical supply, distribution, and containment
            solutions provider headquartered in Godley, Texas.
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,106.7C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
                Who We Are
              </p>
              <h2 className="text-4xl sm:text-5xl font-bold text-maxx-900 mb-6">
                Unleashing the Power of{" "}
                <span className="text-gradient">Reliability</span>
              </h2>
              <div className="space-y-4 text-maxx-600 text-lg leading-relaxed">
                <p>
                  MAXX Energy Services is a full-service chemical supply,
                  distribution, and containment solutions provider headquartered
                  in Godley, Texas. We specialize in delivering high-quality
                  specialty chemicals and engineered containment systems to
                  industries that demand uncompromising reliability and
                  performance.
                </p>
                <p>
                  Our operations span the oil and gas, agriculture, municipal,
                  and industrial sectors, providing tailored chemical programs
                  and turnkey containment solutions that help our customers
                  operate safely, efficiently, and in compliance with
                  environmental standards.
                </p>
                <p>
                  With a commitment to rapid response, deep technical expertise,
                  and a customer-first approach, MAXX Energy Services has become
                  a trusted partner for operators and organizations across the
                  nation who need dependable chemical and containment solutions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {[
                { label: "Oil & Gas", detail: "Upstream, midstream & downstream chemical programs" },
                { label: "Agriculture", detail: "Water treatment & crop protection solutions" },
                { label: "Municipalities", detail: "Safe, reliable community water treatment" },
                { label: "Industrial", detail: "Manufacturing & processing chemical supply" },
              ].map((sector, i) => (
                <div
                  key={sector.label}
                  className="bg-maxx-50 border border-maxx-100 rounded-2xl p-6 text-center hover:border-maxx-accent/30 transition-all duration-300 hover:shadow-lg hover:shadow-maxx-accent/10"
                >
                  <h3 className="text-lg font-bold text-maxx-900 mb-2">
                    {sector.label}
                  </h3>
                  <p className="text-maxx-600 text-sm leading-relaxed">
                    {sector.detail}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Wave transition to light bg */}
      <div className="relative -mt-1">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-maxx-50"
          preserveAspectRatio="none"
        >
          <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,106.7C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>

      {/* Subpage Links */}
      <section className="py-24 bg-maxx-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3"
            >
              Learn More
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-maxx-900"
            >
              Explore Our Company
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subpages.map((page, index) => {
              const Icon = page.icon;
              return (
                <motion.div
                  key={page.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                >
                  <Link
                    href={page.href}
                    className="group block h-full bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-10 text-center transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                  >
                    <div className="inline-flex p-4 bg-maxx-accent/10 rounded-2xl mb-6 group-hover:bg-maxx-accent/20 transition-colors">
                      <Icon className="h-10 w-10 text-maxx-accent" />
                    </div>

                    <h3 className="text-2xl font-bold text-maxx-900 mb-3 group-hover:text-maxx-accent transition-colors">
                      {page.title}
                    </h3>

                    <p className="text-maxx-600 leading-relaxed mb-6">
                      {page.description}
                    </p>

                    <span className="inline-flex items-center text-maxx-accent text-sm font-semibold group-hover:text-maxx-mint transition-colors">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Ready to Work With Us?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-maxx-200 mb-10 max-w-2xl mx-auto"
          >
            Contact our team to discuss how MAXX Energy Services can support
            your chemical supply and containment needs.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 hover:shadow-maxx-mint/30"
            >
              <span>Get In Touch</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
