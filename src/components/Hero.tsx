"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Droplets } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-maxx-900">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800" />

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-maxx-mint/10 border border-maxx-mint/20 rounded-full mb-8"
          >
            <Droplets className="h-4 w-4 text-maxx-mint" />
            <span className="text-maxx-mint text-sm font-medium">Oil & Energy &bull; Agriculture &bull; Municipalities</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
          >
            Chemical &{" "}
            <span className="text-gradient">Containment</span>
            <br />
            Solutions
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-maxx-200 leading-relaxed mb-10 max-w-2xl"
          >
            Unleashing the power of reliability in chemical supply, distribution
            & containment. Premier specialty chemical solutions serving energy,
            agriculture, and municipal markets nationwide.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-maxx-mint hover:bg-maxx-mint/90 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-mint/25 hover:shadow-maxx-mint/30"
            >
              <ArrowRight className="h-5 w-5" />
              <span>Get In Touch</span>
            </Link>
            <a
              href="tel:1-833-777-6299"
              className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-maxx-800/50 hover:bg-maxx-700/50 border border-maxx-700 hover:border-maxx-accent/50 text-white rounded-lg font-semibold transition-all"
            >
              <Phone className="h-5 w-5 text-maxx-accent" />
              <span>1-833-777-MAXX</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-16 sm:h-20"
        >
          <path
            d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,50 1440,40 L1440,80 L0,80 Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="w-6 h-10 border-2 border-maxx-500 rounded-full flex justify-center"
        >
          <div className="w-1 h-2 bg-maxx-mint rounded-full mt-2" />
        </motion.div>
      </motion.div>
    </section>
  );
}
