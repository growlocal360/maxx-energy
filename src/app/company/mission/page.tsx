"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Shield,
  Lightbulb,
  HardHat,
  Handshake,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const values = [
  {
    title: "Reliability",
    icon: Shield,
    description:
      "We deliver on every commitment. Our customers count on MAXX for consistent, on-time chemical supply and containment solutions that keep their operations running without interruption.",
  },
  {
    title: "Innovation",
    icon: Lightbulb,
    description:
      "We continuously seek smarter, more efficient approaches to chemical formulation, distribution logistics, and containment engineering, driving measurable improvements for every customer.",
  },
  {
    title: "Safety",
    icon: HardHat,
    description:
      "Safety is non-negotiable. From product handling and transportation to on-site containment installation, every process is built around protecting people, communities, and the environment.",
  },
  {
    title: "Partnership",
    icon: Handshake,
    description:
      "We invest in long-term relationships. By understanding each customer's unique challenges, we develop tailored solutions that evolve with their business and deliver lasting value.",
  },
];

export default function MissionPage() {
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
          >
            <Link
              href="/company"
              className="inline-flex items-center space-x-2 text-maxx-300 hover:text-maxx-mint transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Back to Company</span>
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Our <span className="text-gradient">Mission</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-maxx-200 leading-relaxed max-w-3xl mx-auto"
          >
            Guided by purpose. Driven by values. Committed to excellence in
            every chemical and containment solution we deliver.
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

      {/* Mission Statement */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Mission Statement
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-maxx-900 mb-8"
          >
            Unleashing the Power of Reliability
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-6 text-maxx-600 text-lg leading-relaxed"
          >
            <p>
              At MAXX Energy Services, our mission is to be the most reliable
              chemical supply, distribution, and containment solutions partner in
              every market we serve. We exist to ensure our customers never have
              to worry about the chemicals and containment systems their
              operations depend on.
            </p>
            <p>
              We achieve this by combining deep technical expertise with a
              relentless commitment to service, delivering the right products at
              the right time, every time. From formulation to final delivery, we
              own every step of the process so our customers can focus on what
              they do best.
            </p>
          </motion.div>

          {/* Accent divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mx-auto mt-12 h-1 w-32 bg-gradient-to-r from-maxx-accent to-maxx-mint rounded-full"
          />
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

      {/* Core Values */}
      <section className="py-24 bg-maxx-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3"
            >
              What We Stand For
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold text-maxx-900"
            >
              Our Core Values
            </motion.h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15, duration: 0.5 }}
                  className="bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10 group"
                >
                  <div className="inline-flex p-4 bg-maxx-accent/10 rounded-2xl mb-6 group-hover:bg-maxx-accent/20 transition-colors">
                    <Icon className="h-10 w-10 text-maxx-accent" />
                  </div>

                  <h3 className="text-xl font-bold text-maxx-900 mb-3 group-hover:text-maxx-accent transition-colors">
                    {value.title}
                  </h3>

                  <p className="text-maxx-600 text-sm leading-relaxed">
                    {value.description}
                  </p>
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
            Partner With MAXX
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-maxx-200 mb-10 max-w-2xl mx-auto"
          >
            Experience the MAXX difference -- reliable supply, expert support,
            and solutions built around your success.
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
              <span>Contact Us Today</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
