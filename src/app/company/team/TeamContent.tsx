"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import type { TeamMember } from "@/lib/types";

export default function TeamContent({ members }: { members: TeamMember[] }) {
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
            Our <span className="text-gradient">Team</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-maxx-200 leading-relaxed max-w-3xl mx-auto"
          >
            Meet the experienced professionals driving MAXX Energy Services
            forward with decades of combined industry expertise.
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

      {/* Team Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {members.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-maxx-600 text-lg">
                Team information coming soon.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  {/* Photo */}
                  <div className="aspect-square bg-maxx-50 overflow-hidden">
                    {member.photo_url ? (
                      <img
                        src={member.photo_url}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-maxx-100 to-maxx-50">
                        <span className="text-6xl font-bold text-maxx-300">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-maxx-900 mb-1 group-hover:text-maxx-accent transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-maxx-accent font-medium text-sm mb-4">
                      {member.title}
                    </p>

                    <div className="space-y-2">
                      {member.email && (
                        <a
                          href={`mailto:${member.email}`}
                          className="flex items-center space-x-2 text-maxx-600 hover:text-maxx-accent transition-colors text-sm"
                        >
                          <Mail className="h-4 w-4 shrink-0" />
                          <span className="truncate">{member.email}</span>
                        </a>
                      )}
                      {member.phone && (
                        <a
                          href={`tel:${member.phone}`}
                          className="flex items-center space-x-2 text-maxx-600 hover:text-maxx-accent transition-colors text-sm"
                        >
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>{member.phone}</span>
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
