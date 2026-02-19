"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-maxx-accent to-maxx-mint" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-maxx-900/70 font-semibold tracking-wider uppercase text-sm mb-3"
        >
          Ready to Get Started?
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-5xl font-bold text-maxx-900 mb-6"
        >
          Let&apos;s Power Your Operations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-maxx-900/70 text-lg max-w-2xl mx-auto mb-10"
        >
          Contact our team for a consultation on your chemical supply, containment, or distribution needs.
          Reliable solutions for every industry.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/contact"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-maxx-900 hover:bg-maxx-950 text-white rounded-lg font-bold transition-all shadow-lg"
          >
            <ArrowRight className="h-5 w-5" />
            <span>Get In Touch</span>
          </Link>
          <a
            href="tel:1-833-777-6299"
            className="inline-flex items-center space-x-2 px-8 py-4 border-2 border-maxx-900/30 hover:border-maxx-900/60 text-maxx-900 rounded-lg font-semibold transition-all"
          >
            <Phone className="h-5 w-5" />
            <span>Call 1-833-777-MAXX</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
