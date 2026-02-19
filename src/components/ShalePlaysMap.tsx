"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";

const basins = [
  {
    name: "Utica Basin",
    region: "Appalachian",
    description: "Serving eastern Ohio, western Pennsylvania, and West Virginia.",
    x: 72,
    y: 35,
  },
  {
    name: "Marcellus Basin",
    region: "Northeast",
    description: "Supporting natural gas operations across PA, WV, and Ohio.",
    x: 76,
    y: 30,
  },
  {
    name: "Bakken Basin",
    region: "Northern Plains",
    description: "Chemical solutions for North Dakota and Montana operations.",
    x: 38,
    y: 15,
  },
  {
    name: "Permian / Delaware Basin",
    region: "Southwest",
    description: "Full-service supply for West Texas and southeastern New Mexico.",
    x: 35,
    y: 62,
  },
  {
    name: "Eagle Ford Basin",
    region: "South Texas",
    description: "Comprehensive chemical supply from the Mexican border to East Texas.",
    x: 42,
    y: 75,
  },
  {
    name: "Haynesville / Bossier Basin",
    region: "Gulf Coast",
    description: "Chemical and containment for NW Louisiana and eastern Texas.",
    x: 55,
    y: 68,
  },
];

export default function ShalePlaysMap() {
  const [activeBasin, setActiveBasin] = useState<number | null>(null);

  return (
    <section className="relative py-24 bg-maxx-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-maxx-mint font-semibold tracking-wider uppercase text-sm mb-3"
          >
            Strategic Presence
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
          >
            Shale Plays & Basins
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-maxx-300 text-lg max-w-2xl mx-auto"
          >
            Strategically positioned across six major US energy basins to deliver reliable chemical supply where you need it.
          </motion.p>
        </div>

        {/* Map and Basin Cards */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[4/3] bg-maxx-800/50 rounded-2xl border border-maxx-700 overflow-hidden"
          >
            {/* US Map outline SVG */}
            <svg
              viewBox="0 0 100 80"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Simplified US outline */}
              <path
                d="M10,15 L25,12 L35,10 L50,12 L60,10 L75,12 L85,15 L90,20 L88,30 L90,35 L87,40 L85,50 L80,55 L75,52 L70,55 L65,50 L60,55 L55,60 L50,65 L45,70 L40,72 L35,70 L30,65 L25,60 L20,55 L15,50 L12,40 L10,30 L8,20 Z"
                fill="none"
                stroke="rgba(0,175,199,0.2)"
                strokeWidth="0.5"
              />

              {/* Basin pins */}
              {basins.map((basin, index) => (
                <g key={basin.name}>
                  {/* Pulse animation */}
                  <circle
                    cx={basin.x}
                    cy={basin.y}
                    r={activeBasin === index ? 4 : 2}
                    fill={activeBasin === index ? "#03e4b7" : "#00afc7"}
                    opacity={activeBasin === index ? 0.3 : 0.2}
                    className="transition-all duration-300"
                  />
                  {/* Main pin */}
                  <circle
                    cx={basin.x}
                    cy={basin.y}
                    r={activeBasin === index ? 2.5 : 1.5}
                    fill={activeBasin === index ? "#03e4b7" : "#00afc7"}
                    className="cursor-pointer transition-all duration-300"
                    onMouseEnter={() => setActiveBasin(index)}
                    onMouseLeave={() => setActiveBasin(null)}
                  />
                  {/* Label */}
                  {activeBasin === index && (
                    <text
                      x={basin.x}
                      y={basin.y - 5}
                      textAnchor="middle"
                      fill="#03e4b7"
                      fontSize="2.5"
                      fontWeight="bold"
                    >
                      {basin.name}
                    </text>
                  )}
                </g>
              ))}
            </svg>
          </motion.div>

          {/* Basin Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {basins.map((basin, index) => (
              <motion.div
                key={basin.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                onMouseEnter={() => setActiveBasin(index)}
                onMouseLeave={() => setActiveBasin(null)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  activeBasin === index
                    ? "bg-maxx-mint/10 border-maxx-mint/30"
                    : "bg-maxx-800/50 border-maxx-700 hover:border-maxx-accent/30"
                }`}
              >
                <div className="flex items-start space-x-3">
                  <MapPin
                    className={`h-5 w-5 mt-0.5 flex-shrink-0 transition-colors ${
                      activeBasin === index ? "text-maxx-mint" : "text-maxx-accent"
                    }`}
                  />
                  <div>
                    <h3 className="font-semibold text-white text-sm">
                      {basin.name}
                    </h3>
                    <p className="text-maxx-400 text-xs mt-1">
                      {basin.region}
                    </p>
                    <AnimatePresence>
                      {activeBasin === index && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="text-maxx-300 text-xs mt-2"
                        >
                          {basin.description}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/shale-plays"
            className="inline-flex items-center space-x-2 px-8 py-3 bg-maxx-mint hover:bg-maxx-mint/90 text-maxx-900 rounded-lg font-semibold transition-colors"
          >
            <span>Explore All Basins</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
