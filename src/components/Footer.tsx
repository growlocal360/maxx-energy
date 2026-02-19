"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Linkedin,
  Twitter,
} from "lucide-react";

const productLinks = [
  { name: "Chemical Solutions", href: "/products/chemical-solutions" },
  { name: "Containment Solutions", href: "/products/containment-solutions" },
];

const companyLinks = [
  { name: "About Us", href: "/company" },
  { name: "Our Team", href: "/company/team" },
  { name: "Markets", href: "/markets" },
  { name: "Shale Plays", href: "/shale-plays" },
  { name: "News & Events", href: "/news" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-maxx-950 border-t border-maxx-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center mb-6">
              <Image
                src="/maxx-energy-services-logo.svg"
                alt="MAXX Energy Services"
                width={180}
                height={40}
              />
            </Link>
            <p className="text-maxx-300 text-sm leading-relaxed mb-6">
              Premier specialty chemical solutions and containment products for oil & energy, agriculture, and municipalities. Unleashing the power of reliability.
            </p>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-maxx-400 hover:text-maxx-mint hover:bg-maxx-800 rounded-lg transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-white font-semibold mb-4">Products</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-maxx-300 hover:text-maxx-mint text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-maxx-300 hover:text-maxx-mint text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-maxx-mint mt-0.5 flex-shrink-0" />
                <span className="text-maxx-300 text-sm">
                  PO Box 444<br />
                  Godley, TX 76044
                </span>
              </li>
              <li>
                <a
                  href="tel:1-833-777-6299"
                  className="flex items-center space-x-3 text-maxx-300 hover:text-maxx-mint text-sm transition-colors"
                >
                  <Phone className="h-4 w-4 text-maxx-mint flex-shrink-0" />
                  <span>1-833-777-MAXX (6299)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@maxxenergysvcs.com"
                  className="flex items-center space-x-3 text-maxx-300 hover:text-maxx-mint text-sm transition-colors"
                >
                  <Mail className="h-4 w-4 text-maxx-mint flex-shrink-0" />
                  <span>info@maxxenergysvcs.com</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-maxx-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <a
              href="tel:1-833-777-6299"
              className="text-lg font-bold text-maxx-mint"
            >
              1-833-777-MAXX
            </a>
            <span className="text-maxx-600">|</span>
            <a
              href="mailto:info@maxxenergysvcs.com"
              className="text-maxx-accent hover:text-maxx-mint text-sm transition-colors"
            >
              info@maxxenergysvcs.com
            </a>
          </div>
          <p className="text-maxx-400 text-sm">
            &copy; {new Date().getFullYear()} MAXX Energy Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
