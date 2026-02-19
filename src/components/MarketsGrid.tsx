"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Fuel,
  Wheat,
  Zap,
  Factory,
  Droplets,
  Mountain,
  ArrowRight,
} from "lucide-react";

const markets = [
  {
    name: "Oil & Gas",
    href: "/markets/oil-and-gas",
    icon: Fuel,
    description: "Comprehensive chemical and containment solutions for upstream, midstream, and downstream operations.",
  },
  {
    name: "Agriculture",
    href: "/markets/agriculture",
    icon: Wheat,
    description: "Specialized chemical solutions for water treatment, soil management, and crop protection.",
  },
  {
    name: "Energy Recovery",
    href: "/markets/energy-recovery",
    icon: Zap,
    description: "Chemical solutions supporting enhanced oil recovery and renewable energy production.",
  },
  {
    name: "Industrial",
    href: "/markets/industrial",
    icon: Factory,
    description: "Chemical supply and containment solutions for manufacturing and processing operations.",
  },
  {
    name: "Municipal Water",
    href: "/markets/municipal-water",
    icon: Droplets,
    description: "Water treatment chemicals for safe and reliable community water supply systems.",
  },
  {
    name: "Mining",
    href: "/markets/mining",
    icon: Mountain,
    description: "Chemical and containment solutions for dust control, water treatment, and environmental compliance.",
  },
];

export default function MarketsGrid() {
  return (
    <section className="relative py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-maxx-accent font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Markets Served
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-maxx-900 mb-4"
          >
            Industries We Serve
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-maxx-600 text-lg max-w-2xl mx-auto"
          >
            Delivering reliable chemical and containment solutions across diverse market sectors nationwide.
          </motion.p>
        </div>

        {/* Markets Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {markets.map((market, index) => {
            const Icon = market.icon;
            return (
              <motion.div
                key={market.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={market.href}
                  className="group block h-full bg-maxx-50 border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 text-center transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  <div className="inline-flex p-4 bg-maxx-accent/10 rounded-2xl mb-6 group-hover:bg-maxx-accent/20 transition-colors">
                    <Icon className="h-10 w-10 text-maxx-accent" />
                  </div>

                  <h3 className="text-xl font-bold text-maxx-900 mb-3 group-hover:text-maxx-accent transition-colors">
                    {market.name}
                  </h3>

                  <p className="text-maxx-600 text-sm leading-relaxed mb-6">
                    {market.description}
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

        {/* View All Markets */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            href="/markets"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-maxx-900 hover:bg-maxx-800 text-white rounded-lg font-semibold transition-colors"
          >
            <span>View All 12 Markets</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
