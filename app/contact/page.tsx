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
      {/* 1. Hero Header Banner */}
      <section className="relative w-full bg-[#071524] text-white pt-32 pb-20 px-4 sm:px-6 lg:px-8 border-b border-slate-800 overflow-hidden">
        {/* Ambient Radial Blue Glow */}
        <div
          aria-hidden="true"
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-blue-600/20 blur-[130px] rounded-full pointer-events-none"
        />

        <div className="relative z-10 max-w-6xl mx-auto text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold tracking-widest uppercase mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Start a Conversation
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Let’s Build Something That <span className="text-blue-500">Works.</span>
          </h1>

          <p className="text-slate-400 max-w-2xl text-base sm:text-lg leading-relaxed">
            Tell PSDigiLabs what you want to build and share enough detail to begin a
            meaningful technical project discussion.
          </p>
        </div>
      </section>

      {/* 2. Main Two-Column Content Area */}
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Context Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-block text-xs font-bold uppercase tracking-widest text-blue-600">
              Project Enquiry
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              A useful first conversation starts with context.
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Share your goals, users, key functionality, and timeline. Starting prices are
              directional; final quotes depend on scope, integrations, complexity, and
              delivery requirements.
            </p>

            <div className="pt-4 border-t border-slate-200">
              <span className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Direct Inquiries
              </span>
              <a
                href="mailto:contact@psdigilabs.in"
                className="text-blue-600 hover:text-blue-700 font-semibold text-base transition-colors"
              >
                contact@psdigilabs.in
              </a>
            </div>
          </div>

          {/* Right Elevated Form Card Column */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-slate-200/80">
            <ContactForm />
          </div>

        </div>
      </section>
    </main>
  );
}