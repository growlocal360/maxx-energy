"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FlaskConical, Shield, ArrowRight } from "lucide-react";

const products = [
  {
    name: "Chemical Solutions",
    href: "/products/chemical-solutions",
    icon: FlaskConical,
    image: "/maxx-containment-solutions-background.jpg",
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
    image: "/containment-solutions-hero.jpg",
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
                  className="group block h-full relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maxx-950/95 via-maxx-950/75 to-maxx-950/40" />
                  </div>

                  <div className="relative p-8">
                    <div className="p-4 bg-maxx-accent/20 backdrop-blur-sm rounded-xl w-fit mb-6">
                      <Icon className="h-8 w-8 text-maxx-mint" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-maxx-mint transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-maxx-200 leading-relaxed mb-6">
                      {product.description}
                    </p>

                    <ul className="space-y-2 mb-8">
                      {product.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center text-sm text-maxx-300"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-maxx-mint mr-3 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <span className="inline-flex items-center text-maxx-mint font-semibold group-hover:text-white transition-colors">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
