"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" as const },
  }),
};

const contactInfo = [
  {
    icon: Phone,
    label: "Phone",
    value: "1-833-777-MAXX (6299)",
    href: "tel:18337776299",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@maxxenergysvcs.com",
    href: "mailto:info@maxxenergysvcs.com",
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "Godley, TX",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday - Friday, 7:00 AM - 5:00 PM",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  const inputClasses =
    "w-full px-4 py-3 bg-white border border-maxx-200 focus:border-maxx-accent rounded-lg text-maxx-900 placeholder-maxx-400 outline-none transition-colors duration-200";

  return (
    <>
      {/* Hero Section */}
      <section className="bg-maxx-900 pt-32 pb-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-maxx-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            We&apos;d love to hear from you
          </motion.p>
        </div>
      </section>

      {/* Wave Divider */}
      <div className="relative -mt-1">
        <svg
          viewBox="0 0 1440 120"
          className="w-full h-auto fill-white"
          preserveAspectRatio="none"
        >
          <path d="M0,96L48,85.3C96,75,192,53,288,48C384,43,480,53,576,69.3C672,85,768,107,864,106.7C960,107,1056,85,1152,74.7C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" />
        </svg>
      </div>

      {/* Content Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left: Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-maxx-900 mb-6">
                Send Us a Message
              </h2>

              {status === "success" ? (
                <motion.div
                  className="bg-maxx-50 border border-maxx-mint rounded-lg p-8 text-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-maxx-accent to-maxx-mint rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-maxx-900 mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-maxx-600 mb-6">
                    Thank you for reaching out. Our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="text-maxx-accent font-semibold hover:underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-maxx-700 mb-1.5">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-maxx-700 mb-1.5">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-maxx-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm font-medium text-maxx-700 mb-1.5">
                        Company
                      </label>
                      <input
                        id="company"
                        name="company"
                        type="text"
                        placeholder="Your company name"
                        value={formData.company}
                        onChange={handleChange}
                        className={inputClasses}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-maxx-700 mb-1.5">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project or inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                      className={`${inputClasses} resize-vertical`}
                    />
                  </div>

                  {status === "error" && (
                    <motion.div
                      className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      {errorMessage}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-6 bg-gradient-to-r from-maxx-accent to-maxx-mint text-maxx-900 rounded-lg font-semibold text-lg transition-opacity duration-200 hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {status === "submitting" ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </motion.div>

            {/* Right: Contact Info Cards */}
            <div className="space-y-6 lg:pl-8">
              <motion.h2
                className="text-2xl md:text-3xl font-bold text-maxx-900 mb-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                custom={0}
              >
                Contact Information
              </motion.h2>

              {contactInfo.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="flex items-start gap-4 p-5 bg-maxx-50 rounded-xl"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-50px" }}
                  variants={fadeUp}
                  custom={i + 1}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-maxx-accent to-maxx-mint rounded-lg flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-maxx-500 mb-0.5">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-maxx-900 font-semibold hover:text-maxx-accent transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-maxx-900 font-semibold">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
