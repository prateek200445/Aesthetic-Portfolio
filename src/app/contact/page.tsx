"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, Send, AlertCircle, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("Message sent successfully! I'll get back to you soon.");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    setErrorMessage("");
    setSuccessMessage("Message sent successfully! I'll get back to you soon.");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage(result.message || "Message sent successfully! I'll get back to you soon.");
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(result.message || "Failed to send message");
      }
    } catch (err) {
      setStatus("error");
      setErrorMessage("An error occurred. Please try again.");
      console.error("Contact form error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#ece9e9] text-[#2b1f1f]">
      <div className="w-full px-4 py-10 md:px-6 md:py-12 lg:px-8">
        {/* Back Link */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h1
            className="text-[clamp(2.5rem,7vw,5rem)] leading-[0.95] mb-4"
            style={{ fontFamily: "var(--font-cormorant)", letterSpacing: "0.01em" }}
          >
            Get In Touch
          </h1>
          <p
            className="text-lg opacity-70 max-w-2xl"
            style={{ fontFamily: "var(--font-geist-sans)" }}
          >
            Have a question or want to collaborate? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm uppercase tracking-[0.1em] mb-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#f5f3f3] border border-black/10 rounded-lg focus:outline-none focus:border-black/30 transition-colors"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm uppercase tracking-[0.1em] mb-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#f5f3f3] border border-black/10 rounded-lg focus:outline-none focus:border-black/30 transition-colors"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm uppercase tracking-[0.1em] mb-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-[#f5f3f3] border border-black/10 rounded-lg focus:outline-none focus:border-black/30 transition-colors"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm uppercase tracking-[0.1em] mb-2"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-[#f5f3f3] border border-black/10 rounded-lg focus:outline-none focus:border-black/30 transition-colors resize-none"
                style={{ fontFamily: "var(--font-geist-sans)" }}
              />
            </div>

            {/* Status Messages */}
            {status === "success" && (
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <p className="text-sm text-green-700" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  {successMessage}
                </p>
              </div>
            )}

            {status === "error" && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
                <p className="text-sm text-red-700" style={{ fontFamily: "var(--font-geist-sans)" }}>
                  {errorMessage}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#2b1f1f] text-[#ece9e9] font-medium uppercase tracking-[0.1em] rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "var(--font-geist-sans)" }}
            >
              <Send className="w-4 h-4" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Alternative Contact */}
          <div className="mt-12 pt-8 border-t border-black/10">
            <p className="text-sm opacity-70 mb-4" style={{ fontFamily: "var(--font-geist-sans)" }}>
              Or reach out directly:
            </p>
            <div className="space-y-2">
              <p style={{ fontFamily: "var(--font-geist-sans)" }}>
                <a
                  href="mailto:prateeklachwani24@gmail.com"
                  className="text-[#2b1f1f] hover:opacity-70 transition-opacity"
                >
                  prateeklachwani24@gmail.com
                </a>
              </p>
              <p style={{ fontFamily: "var(--font-geist-sans)" }}>
                <a href="tel:+918003518222" className="text-[#2b1f1f] hover:opacity-70 transition-opacity">
                  +91 8003518222
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
