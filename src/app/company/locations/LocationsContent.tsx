"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, ArrowLeft, ArrowRight, Star } from "lucide-react";
import type { Location } from "@/lib/types";

export default function LocationsContent({
  locations,
}: {
  locations: Location[];
}) {
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
            Our <span className="text-gradient">Locations</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-maxx-200 leading-relaxed max-w-3xl mx-auto"
          >
            Strategically positioned offices and service areas to deliver
            reliable chemical supply and containment solutions where you need
            them.
          </motion.p>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto fill-maxx-50"
            preserveAspectRatio="none"
          >
            <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,106.7C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Locations Grid */}
      <section className="py-24 bg-maxx-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {locations.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-maxx-600 text-lg">
                Location information coming soon.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative bg-white border border-maxx-100 hover:border-maxx-accent/30 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-maxx-accent/10"
                >
                  {/* HQ Badge */}
                  {location.is_headquarters && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-maxx-accent to-maxx-mint text-maxx-900 rounded-full text-xs font-bold uppercase tracking-wide">
                        <Star className="h-3 w-3 fill-maxx-900" />
                        <span>Headquarters</span>
                      </span>
                    </div>
                  )}

                  {/* Map accent bar */}
                  <div className="h-2 bg-gradient-to-r from-maxx-accent to-maxx-mint" />

                  <div className="p-8">
                    {/* Location name */}
                    <div className="flex items-start space-x-3 mb-6">
                      <div className="inline-flex p-3 bg-maxx-accent/10 rounded-xl shrink-0 group-hover:bg-maxx-accent/20 transition-colors">
                        <MapPin className="h-6 w-6 text-maxx-accent" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-maxx-900 group-hover:text-maxx-accent transition-colors">
                          {location.name}
                        </h3>
                        <p className="text-maxx-500 text-sm mt-1">
                          {location.city}, {location.state}
                        </p>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="space-y-3 text-sm">
                      <div className="text-maxx-600 leading-relaxed">
                        <p>{location.address}</p>
                        <p>
                          {location.city}, {location.state} {location.zip}
                        </p>
                      </div>

                      {/* Phone */}
                      {location.phone && (
                        <a
                          href={`tel:${location.phone}`}
                          className="flex items-center space-x-2 text-maxx-600 hover:text-maxx-accent transition-colors"
                        >
                          <Phone className="h-4 w-4 shrink-0" />
                          <span>{location.phone}</span>
                        </a>
                      )}

                      {/* Email */}
                      {location.email && (
                        <a
                          href={`mailto:${location.email}`}
                          className="flex items-center space-x-2 text-maxx-600 hover:text-maxx-accent transition-colors"
                        >
                          <Mail className="h-4 w-4 shrink-0" />
                          <span>{location.email}</span>
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
            Need a Local Contact?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-maxx-200 mb-10 max-w-2xl mx-auto"
          >
            Reach out to our team to discuss your chemical supply and
            containment needs. We are ready to help.
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
              <span>Contact Us</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
