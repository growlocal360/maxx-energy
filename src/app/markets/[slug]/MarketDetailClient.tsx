"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Fuel,
  Wheat,
  Zap,
  Factory,
  Droplets,
  Mountain,
  Building2,
  Truck,
  Waves,
  Globe,
  FlaskConical,
  Shield,
  Phone,
} from "lucide-react";
import type { Market } from "@/lib/types";
import RichTextContent from "@/components/RichTextContent";

function getMarketIcon(slug: string) {
  switch (slug) {
    case "oil-and-gas":
      return Fuel;
    case "agriculture":
      return Wheat;
    case "energy-recovery":
      return Zap;
    case "industrial":
      return Factory;
    case "municipal-water":
      return Droplets;
    case "mining":
      return Mountain;
    case "construction":
      return Building2;
    case "transportation":
      return Truck;
    case "water-management":
      return Waves;
    default:
      return Globe;
  }
}

interface MarketDetailClientProps {
  market: Market;
}

export default function MarketDetailClient({
  market,
}: MarketDetailClientProps) {
  const Icon = getMarketIcon(market.slug);

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 overflow-hidden bg-maxx-900">
        <div className="absolute inset-0 bg-gradient-to-br from-maxx-950 via-maxx-900 to-maxx-800" />
        <div className="absolute inset-0 grid-pattern opacity-50" />

        {/* Hero background image if available */}
        {market.hero_image_url && (
          <div className="absolute inset-0">
            <img
              src={market.hero_image_url}
              alt=""
              className="w-full h-full object-cover opacity-15"
            />
          </div>
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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

          <div className="flex items-start gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="p-4 bg-maxx-accent/10 border border-maxx-accent/20 rounded-xl hidden sm:block"
            >
              <Icon className="h-10 w-10 text-maxx-accent" />
            </motion.div>

            <div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4"
              >
                {market.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-maxx-200 max-w-3xl leading-relaxed"
              >
                Reliable chemical and containment solutions for the{" "}
                {market.name.toLowerCase()} industry.
              </motion.p>
            </div>
          </div>
        </div>

        {/* Wave divider */}
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
      </section>

      {/* Market Description */}
      {market.description && (
        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <RichTextContent content={market.description} />
            </motion.div>
          </div>
        </section>
      )}

      {/* Related Products CTA */}
      <section className="py-20 bg-maxx-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3">
              Solutions for {market.name}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-maxx-900 mb-4">
              Our Products for This Market
            </h2>
            <p className="text-maxx-600 text-lg max-w-2xl mx-auto">
              Explore our chemical and containment product lines designed to meet
              the demands of the {market.name.toLowerCase()} sector.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Link
                href="/products/chemical-solutions"
                className="group block h-full bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
              >
                <div className="inline-flex p-4 bg-maxx-accent/10 rounded-2xl mb-6 group-hover:bg-maxx-accent/20 transition-colors">
                  <FlaskConical className="h-10 w-10 text-maxx-accent" />
                </div>
                <h3 className="text-xl font-bold text-maxx-900 mb-2 group-hover:text-maxx-accent transition-colors">
                  Chemical Solutions
                </h3>
                <p className="text-maxx-600 text-sm leading-relaxed mb-4">
                  Specialty chemical formulations for treatment, production, and
                  processing applications.
                </p>
                <span className="inline-flex items-center text-maxx-accent text-sm font-semibold group-hover:text-maxx-mint transition-colors">
                  View Products
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Link
                href="/products/containment-solutions"
                className="group block h-full bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
              >
                <div className="inline-flex p-4 bg-maxx-accent/10 rounded-2xl mb-6 group-hover:bg-maxx-accent/20 transition-colors">
                  <Shield className="h-10 w-10 text-maxx-accent" />
                </div>
                <h3 className="text-xl font-bold text-maxx-900 mb-2 group-hover:text-maxx-accent transition-colors">
                  Containment Solutions
                </h3>
                <p className="text-maxx-600 text-sm leading-relaxed mb-4">
                  Spill containment, environmental protection, and compliance
                  products built for demanding environments.
                </p>
                <span className="inline-flex items-center text-maxx-accent text-sm font-semibold group-hover:text-maxx-mint transition-colors">
                  View Products
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-maxx-accent to-maxx-mint" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold text-maxx-900 mb-4"
          >
            Ready to Discuss Your {market.name} Needs?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-maxx-900/70 text-lg max-w-2xl mx-auto mb-10"
          >
            Our experts are ready to help you find the right chemical and
            containment solutions for your operations.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
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
