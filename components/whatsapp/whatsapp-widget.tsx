"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/icon";

type QuickOption = {
  label: string;
  message: string;
};

const quickOptions: QuickOption[] = [
  {
    label: "🌐 Build a Website",
    message: "Hi PSDigiLabs, I'm looking to build a Next.js / high-performance business website. Could you share details and an estimate?",
  },
  {
    label: "📱 Android App Development",
    message: "Hi PSDigiLabs, I have an Android application project in mind and would like to discuss scope and timelines.",
  },
  {
    label: "🧪 Testing & QA Engineering",
    message: "Hi PSDigiLabs, I need automated or manual software testing and quality engineering for our product.",
  },
  {
    label: "⚡ Workflow Automation",
    message: "Hi PSDigiLabs, I'm interested in business process automation and custom workflow integrations.",
  },
  {
    label: "💬 Direct Chat with Founder",
    message: "Hi Prithwish, I visited psdigilabs.in and would like to connect directly for a project consultation.",
  },
];

export function WhatsAppWidget({ phone = "916289482083" }: { phone?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const cleanPhone = phone.replace(/[^0-9]/g, "");

  const sendWhatsApp = (text: string) => {
    const finalMsg = text.trim() || "Hi PSDigiLabs, I would like to discuss a project with your team.";
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(finalMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="psdl-whatsapp-root" ref={panelRef}>
      {/* WhatsApp Automation Popover Panel */}
      {isOpen && (
        <aside className="psdl-whatsapp-panel" role="dialog" aria-label="WhatsApp quick chat">
          <div className="psdl-whatsapp-header">
            <div className="psdl-whatsapp-header-info">
              <div className="psdl-whatsapp-avatar">
                <Icon name="whatsapp" width={22} height={22} />
                <span className="psdl-whatsapp-online-dot" />
              </div>
              <div>
                <strong>PSDigiLabs Studio</strong>
                <p>Typically replies in minutes • Online</p>
              </div>
            </div>
            <button
              type="button"
              className="psdl-whatsapp-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close WhatsApp chat"
            >
              ×
            </button>
          </div>

          <div className="psdl-whatsapp-body">
            <div className="psdl-whatsapp-bubble">
              <p>Hi there! 👋 Welcome to PSDigiLabs. How can we help engineer or automate your digital product?</p>
              <span className="psdl-whatsapp-bubble-tag">Automated Concierge</span>
            </div>

            <div className="psdl-whatsapp-options">
              <span className="psdl-whatsapp-options-label">Select a quick topic:</span>
              {quickOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  className="psdl-whatsapp-chip"
                  onClick={() => sendWhatsApp(opt.message)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <form
              className="psdl-whatsapp-form"
              onSubmit={(e) => {
                e.preventDefault();
                sendWhatsApp(customMsg);
              }}
            >
              <input
                type="text"
                placeholder="Or type a custom brief..."
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                className="psdl-whatsapp-input"
              />
              <button type="submit" className="psdl-whatsapp-send-btn" aria-label="Send via WhatsApp">
                Send ↗
              </button>
            </form>
          </div>
        </aside>
      )}

      {/* Floating Bottom-Left Button */}
      <button
        type="button"
        className="psdl-whatsapp-fab"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close WhatsApp chat" : "Chat with PSDigiLabs on WhatsApp"}
        aria-expanded={isOpen}
      >
        <span className="psdl-whatsapp-fab-icon">
          <Icon name="whatsapp" width={26} height={26} />
        </span>
        <span className="psdl-whatsapp-online-badge" />
      </button>
    </div>
  );
}
