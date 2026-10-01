import React from "react";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata = {
  title: "Contact PSDigiLabs | Start a Project Conversation",
  description:
    "Share your goals, users, key functionality, and timeline to begin a technical project discussion with PSDigiLabs.",
};

export default function ContactPage() {
  return (
    <main className="w-full min-h-screen bg-slate-50">
      {/* 1. Header Banner - Clean White Text on Navy */}
      <section className="w-full bg-[#071524] text-white pt-28 pb-16 px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-bold tracking-widest text-blue-400 uppercase mb-3">
            START A CONVERSATION
          </p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            LET&apos;S BUILD SOMETHING THAT WORKS
          </h1>
          <p className="text-slate-300 max-w-2xl text-sm sm:text-base leading-relaxed">
            Tell PSDigiLabs what you want to build and share enough detail to begin a meaningful project discussion.
          </p>
        </div>
      </section>

      {/* 2. Side-by-Side 2-Column Section */}
      <section className="w-full py-16 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Left Column (Context & Email) */}
          <div className="w-full lg:w-5/12 flex-shrink-0 space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
              PROJECT ENQUIRY
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
              A useful first conversation starts with context.
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Share your goals, users, key functionality and timeline. Starting prices are directional; the final quote depends on scope, integrations, content, complexity and delivery requirements.
            </p>
            <div className="pt-2">
              <a
                href="mailto:contact@psdigilabs.in"
                className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                contact@psdigilabs.in
              </a>
            </div>
          </div>

          {/* Right Column (Form Card) */}
          <div className="w-full lg:w-7/12 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <ContactForm />
          </div>

        </div>
      </section>
    </main>
  );
}