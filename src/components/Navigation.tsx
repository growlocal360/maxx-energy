"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const companyLinks = [
  { name: "About Us", href: "/company" },
  { name: "Our Team", href: "/company/team" },
  { name: "Our Mission", href: "/company/mission" },
  { name: "Locations", href: "/company/locations" },
];

const productLinks = [
  { name: "Chemical Solutions", href: "/products/chemical-solutions" },
  { name: "Containment Solutions", href: "/products/containment-solutions" },
];

const marketLinks = [
  { name: "Oil & Gas", href: "/markets/oil-and-gas" },
  { name: "Agriculture", href: "/markets/agriculture" },
  { name: "Energy Recovery", href: "/markets/energy-recovery" },
  { name: "Municipal Water", href: "/markets/municipal-water" },
  { name: "Industrial", href: "/markets/industrial" },
  { name: "Mining", href: "/markets/mining" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [marketsOpen, setMarketsOpen] = useState(false);
  const [mobileCompanyOpen, setMobileCompanyOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileMarketsOpen, setMobileMarketsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileCompanyOpen(false);
    setMobileProductsOpen(false);
    setMobileMarketsOpen(false);
  }, [pathname]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-maxx-900/95 backdrop-blur-md shadow-lg border-b border-maxx-800"
          : "bg-maxx-900/80 backdrop-blur-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/maxx-energy-services-logo.svg"
              alt="MAXX Energy Services"
              width={200}
              height={45}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {/* Company Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCompanyOpen(true)}
              onMouseLeave={() => setCompanyOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname.startsWith("/company")
                    ? "text-maxx-mint"
                    : "text-maxx-100 hover:text-white"
                )}
              >
                <span>Company</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {companyOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-maxx-900 border border-maxx-700 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-semibold text-maxx-400 uppercase tracking-wider">
                        About MAXX Energy
                      </p>
                      {companyLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "block px-3 py-2.5 text-sm rounded-lg transition-colors",
                            pathname === link.href
                              ? "text-maxx-mint bg-maxx-mint/10"
                              : "text-maxx-200 hover:text-white hover:bg-maxx-800"
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname.startsWith("/products")
                    ? "text-maxx-mint"
                    : "text-maxx-100 hover:text-white"
                )}
              >
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {productsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-64 bg-maxx-900 border border-maxx-700 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-semibold text-maxx-400 uppercase tracking-wider">
                        Our Products
                      </p>
                      {productLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "block px-3 py-2.5 text-sm rounded-lg transition-colors",
                            pathname === link.href
                              ? "text-maxx-mint bg-maxx-mint/10"
                              : "text-maxx-200 hover:text-white hover:bg-maxx-800"
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <div className="border-t border-maxx-700 mt-2 pt-2">
                        <Link
                          href="/products"
                          className="block px-3 py-2.5 text-sm text-maxx-accent hover:text-maxx-mint rounded-lg transition-colors"
                        >
                          View All Products
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Markets Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setMarketsOpen(true)}
              onMouseLeave={() => setMarketsOpen(false)}
            >
              <button
                className={cn(
                  "flex items-center space-x-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname.startsWith("/markets")
                    ? "text-maxx-mint"
                    : "text-maxx-100 hover:text-white"
                )}
              >
                <span>Markets</span>
                <ChevronDown className="h-4 w-4" />
              </button>
              <AnimatePresence>
                {marketsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-1 w-56 bg-maxx-900 border border-maxx-700 rounded-xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      <p className="px-3 py-2 text-xs font-semibold text-maxx-400 uppercase tracking-wider">
                        Markets Served
                      </p>
                      {marketLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "block px-3 py-2.5 text-sm rounded-lg transition-colors",
                            pathname === link.href
                              ? "text-maxx-mint bg-maxx-mint/10"
                              : "text-maxx-200 hover:text-white hover:bg-maxx-800"
                          )}
                        >
                          {link.name}
                        </Link>
                      ))}
                      <div className="border-t border-maxx-700 mt-2 pt-2">
                        <Link
                          href="/markets"
                          className="block px-3 py-2.5 text-sm text-maxx-accent hover:text-maxx-mint rounded-lg transition-colors"
                        >
                          View All Markets
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Shale Plays Direct Link */}
            <Link
              href="/shale-plays"
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-lg transition-colors",
                pathname.startsWith("/shale-plays")
                  ? "text-maxx-mint"
                  : "text-maxx-100 hover:text-white"
              )}
            >
              Shale Plays
            </Link>

            {/* Contact CTA */}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center space-x-2 px-6 py-2.5 bg-maxx-mint hover:bg-maxx-mint/90 text-maxx-900 rounded-full font-semibold text-sm transition-all shadow-lg shadow-maxx-mint/25"
            >
              <ArrowRight className="h-4 w-4" />
              <span>Contact</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 text-maxx-100 hover:text-white transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-maxx-900 border-t border-maxx-800"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {/* Company Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileCompanyOpen(!mobileCompanyOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-maxx-100 hover:text-white rounded-lg hover:bg-maxx-800 transition-colors"
                >
                  <span className="font-medium">Company</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileCompanyOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileCompanyOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1"
                    >
                      {companyLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-maxx-300 hover:text-white rounded-lg hover:bg-maxx-800 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Products Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-maxx-100 hover:text-white rounded-lg hover:bg-maxx-800 transition-colors"
                >
                  <span className="font-medium">Products</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileProductsOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileProductsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1"
                    >
                      {productLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-maxx-300 hover:text-white rounded-lg hover:bg-maxx-800 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Markets Mobile Dropdown */}
              <div>
                <button
                  onClick={() => setMobileMarketsOpen(!mobileMarketsOpen)}
                  className="w-full flex items-center justify-between px-4 py-3 text-maxx-100 hover:text-white rounded-lg hover:bg-maxx-800 transition-colors"
                >
                  <span className="font-medium">Markets</span>
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition-transform",
                      mobileMarketsOpen && "rotate-180"
                    )}
                  />
                </button>
                <AnimatePresence>
                  {mobileMarketsOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-4 space-y-1"
                    >
                      {marketLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block px-4 py-2.5 text-sm text-maxx-300 hover:text-white rounded-lg hover:bg-maxx-800 transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                      <Link
                        href="/markets"
                        className="block px-4 py-2.5 text-sm text-maxx-accent hover:text-maxx-mint rounded-lg transition-colors"
                      >
                        View All Markets
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link
                href="/shale-plays"
                className="block px-4 py-3 text-maxx-100 hover:text-white font-medium rounded-lg hover:bg-maxx-800 transition-colors"
              >
                Shale Plays
              </Link>

              {/* Mobile CTA */}
              <div className="pt-4 border-t border-maxx-800">
                <Link
                  href="/contact"
                  className="flex items-center justify-center space-x-2 w-full px-6 py-3 bg-maxx-mint hover:bg-maxx-mint/90 text-maxx-900 rounded-lg font-semibold transition-colors"
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
