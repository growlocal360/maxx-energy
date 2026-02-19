"use client";

import { motion } from "framer-motion";
import { MapPin, FlaskConical, Factory, Shield } from "lucide-react";

const stats = [
  {
    value: "6",
    label: "Strategic Basins",
    icon: MapPin,
  },
  {
    value: "100+",
    label: "Chemical Products",
    icon: FlaskConical,
  },
  {
    value: "12",
    label: "Markets Served",
    icon: Factory,
  },
  {
    value: "100%",
    label: "Reliability Focused",
    icon: Shield,
  },
];

export default function StatsBar() {
  return (
    <section className="relative py-16 bg-maxx-900 border-y border-maxx-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex p-3 bg-maxx-mint/10 rounded-xl mb-4">
                  <Icon className="h-6 w-6 text-maxx-mint" />
                </div>
                <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-maxx-300 text-sm font-medium">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
