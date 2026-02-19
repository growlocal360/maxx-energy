"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, Shield, ArrowRight } from "lucide-react";

const products = [
  {
    name: "Chemical Solutions",
    href: "/products/chemical-solutions",
    icon: FlaskConical,
    description:
      "Revolutionary oilfield chemical formulations delivering permanent, cost-effective solutions for fracturing, production, drilling, water treatment, and more.",
    features: [
      "Acid Chemicals & Inhibitors",
      "Frac Chemical Systems",
      "Specialty Surfactants",
      "Coiled Tubing Chemicals",
      "Water Treatment Solutions",
      "Agricultural Chemicals",
    ],
  },
  {
    name: "Containment Solutions",
    href: "/products/containment-solutions",
    icon: Shield,
    description:
      "Industry-leading spill containment and environmental protection products featuring high chemical resistance and engineered for demanding industrial environments.",
    features: [
      "Foam Wall Spill Berms",
      "L-Bracket Berms",
      "Spill Response Kits",
      "Pond Liners",
      "Dust Control Systems",
      "Noise Control Barriers",
    ],
  },
];

export default function ProductsOverview() {
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
            Our Products
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-maxx-900 mb-4"
          >
            Unleashing The Power Of Reliability
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-maxx-600 text-lg max-w-2xl mx-auto"
          >
            Two comprehensive product lines delivering chemical supply, distribution, and containment solutions across all industries.
          </motion.p>
        </div>

        {/* Products Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
              >
                <Link
                  href={product.href}
                  className="group block h-full bg-maxx-50 border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  <div className="p-4 bg-maxx-accent/10 rounded-xl w-fit mb-6 group-hover:bg-maxx-accent/20 transition-colors">
                    <Icon className="h-8 w-8 text-maxx-accent" />
                  </div>

                  <h3 className="text-2xl font-bold text-maxx-900 mb-3 group-hover:text-maxx-accent transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-maxx-600 leading-relaxed mb-6">
                    {product.description}
                  </p>

                  <ul className="space-y-2 mb-8">
                    {product.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center text-sm text-maxx-700"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-maxx-mint mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <span className="inline-flex items-center text-maxx-accent font-semibold group-hover:text-maxx-mint transition-colors">
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
