"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: i * 0.1 },
  }),
};

export interface ContactChannel {
  iconType: "phone" | "whatsapp" | "email" | "form";
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
}

interface ContactPageContentProps {
  sectionTitle: string;
  sectionSubtitle: string;
  channels: ContactChannel[];
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width={48}
      height={48}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#EFF6FF" />
      <path
        d="M30 28.92v2a1.33 1.33 0 01-1.45 1.33 13.2 13.2 0 01-5.75-2.05 13 13 0 01-4-4 13.2 13.2 0 01-2.05-5.78 1.33 1.33 0 011.33-1.45h2a1.33 1.33 0 011.33 1.15c.085.64.24 1.27.467 1.874a1.33 1.33 0 01-.3 1.407l-.847.847a10.67 10.67 0 004 4l.847-.847a1.33 1.33 0 011.407-.3c.604.227 1.234.382 1.874.467A1.33 1.33 0 0130 28.92z"
        stroke="#2887C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width={48}
      height={48}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#F0FDF4" />
      <path
        d="M24 15a9 9 0 00-7.79 13.5l-1.21 4.5 4.5-1.21A9 9 0 1024 15z"
        stroke="#22C55E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.5 22.5a.5.5 0 00.5.5c1 0 2.5 2 3 3a.5.5 0 00.5.5c.5 0 2-.5 2-.5"
        stroke="#22C55E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width={48}
      height={48}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#EFF6FF" />
      <rect
        x="14"
        y="18"
        width="20"
        height="14"
        rx="2"
        stroke="#2887C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 20l10 7 10-7"
        stroke="#2887C1"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      width={48}
      height={48}
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="#FFF7ED" />
      <circle cx="24" cy="21" r="4" stroke="#F97316" strokeWidth="1.5" />
      <path
        d="M16 33c0-4.418 3.582-8 8-8s8 3.582 8 8"
        stroke="#F97316"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

const CHANNEL_ICONS: Record<ContactChannel["iconType"], React.ReactNode> = {
  phone: <PhoneIcon />,
  whatsapp: <WhatsAppIcon />,
  email: <EmailIcon />,
  form: <FormIcon />,
};

function ArrowRight() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      width={14}
      height={14}
      aria-hidden="true"
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPageContent({
  sectionTitle,
  sectionSubtitle,
  channels,
}: ContactPageContentProps) {
  return (
    <main className="bg-bg min-h-screen">
      {/* Contact cards */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-text-muted text-sm uppercase tracking-widest font-semibold mb-2">
            Saluran Komunikasi
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            {sectionTitle}
          </h2>
          <p className="text-text-muted mt-3 max-w-md mx-auto text-sm leading-relaxed">
            {sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((card, i) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              custom={i}
              className="bg-card rounded-2xl border border-slate-100 p-6 flex flex-col gap-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div>{CHANNEL_ICONS[card.iconType]}</div>
              <div className="flex flex-col gap-2 flex-1">
                <h3 className="font-semibold text-navy text-base">
                  {card.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed flex-1">
                  {card.description}
                </p>
              </div>
              {card.href && (
                <a
                  href={card.href}
                  target={card.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    card.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  className="inline-flex items-center gap-1.5 text-navy text-sm font-medium hover:underline"
                >
                  {card.hrefLabel}
                  <ArrowRight />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
