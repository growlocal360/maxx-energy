"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, AlertCircle, ArrowLeft, Droplets } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unauthorizedError = searchParams.get("error") === "unauthorized";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    // Check if user is approved
    const { data: approved } = await supabase
      .from("approved_emails")
      .select("id")
      .eq("email", email)
      .single();

    if (!approved) {
      await supabase.auth.signOut();
      setError("Your account is not authorized to access the admin area.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      {/* Back to site link */}
      <Link
        href="/"
        className="inline-flex items-center text-maxx-300 hover:text-maxx-mint mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to website
      </Link>

      <div className="bg-maxx-900 border border-maxx-700 rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-3">
            <Droplets className="h-10 w-10 text-maxx-mint" />
            <div>
              <span className="text-2xl font-bold text-white tracking-tight">MAXX</span>
              <span className="block text-xs text-maxx-accent tracking-[0.3em] uppercase">Energy Services</span>
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-white text-center mb-2">
          Admin Login
        </h1>
        <p className="text-maxx-300 text-center mb-8">
          Sign in to manage your content
        </p>

        {/* Error messages */}
        {(error || unauthorizedError) && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-start space-x-3 bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6"
          >
            <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-red-400 text-sm">
              {error ||
                "Your account is not authorized to access the admin area."}
            </p>
          </motion.div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-maxx-200 mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-mint rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="admin@maxxenergysvcs.com"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-maxx-200 mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-maxx-400" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-maxx-800 border border-maxx-700 focus:border-maxx-mint rounded-lg text-white placeholder-maxx-400 outline-none transition-colors"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 bg-gradient-to-r from-maxx-accent to-maxx-mint hover:from-maxx-mint hover:to-maxx-accent disabled:from-maxx-700 disabled:to-maxx-600 text-maxx-900 rounded-lg font-semibold transition-all shadow-lg shadow-maxx-accent/25 disabled:shadow-none"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>

      <p className="text-center text-maxx-400 text-sm mt-6">
        Access restricted to authorized personnel only
      </p>
    </motion.div>
  );
}

function LoginFormFallback() {
  return (
    <div className="w-full max-w-md">
      <div className="bg-maxx-900 border border-maxx-700 rounded-2xl p-8 animate-pulse">
        <div className="flex justify-center mb-8">
          <div className="h-10 w-40 bg-maxx-800 rounded" />
        </div>
        <div className="h-8 w-32 bg-maxx-800 rounded mx-auto mb-2" />
        <div className="h-4 w-48 bg-maxx-800 rounded mx-auto mb-8" />
        <div className="space-y-6">
          <div className="h-12 bg-maxx-800 rounded" />
          <div className="h-12 bg-maxx-800 rounded" />
          <div className="h-12 bg-maxx-800 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-maxx-950 flex items-center justify-center p-6">
      <Suspense fallback={<LoginFormFallback />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
