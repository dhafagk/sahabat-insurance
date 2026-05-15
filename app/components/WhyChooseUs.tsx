// app/components/WhyChooseUs.tsx
"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Trophy, MapPin, Zap } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Reason {
  Icon: LucideIcon;
  title: string;
  body: string;
}

const reasons: Reason[] = [
  {
    Icon: Award,
    title: "Fitch A(idn) Rating",
    body: "Nationally recognized financial strength rating",
  },
  {
    Icon: Trophy,
    title: "Infobank Excellent ×5",
    body: "5 consecutive years of excellence award",
  },
  {
    Icon: MapPin,
    title: "20+ Branches Nationwide",
    body: "Serving customers across Indonesia",
  },
  {
    Icon: Zap,
    title: "Fast Claims Process",
    body: "Efficient, transparent claims handling",
  },
];

export default function WhyChooseUs() {
  return (
    <section
      id="about"
      className="relative overflow-hidden"
      style={{ background: "#0F172A" }}
      aria-label="Why choose Sahabat Insurance"
    >
      {/* Desktop: full-height image pinned to the right */}
      <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2">
        <Image
          src="/assets/2.png"
          alt="Tim Sahabat Insurance di kantor"
          fill
          className="object-cover"
          sizes="50vw"
        />
        {/* <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-black/50">
          <p className="text-white text-sm font-medium">
            Tim profesional kami siap membantu Anda
          </p>
        </div> */}
      </div>

      {/* Skewed divider — sits on top of the image edge, matches section bg */}
      <div
        className="hidden lg:block absolute inset-y-0 z-10 pointer-events-none"
        style={{
          left: "calc(50% - 48px)",
          width: "96px",
          background: "#0F172A",
          transform: "skewX(-5deg)",
        }}
      />

      {/* Main content — left half on desktop */}
      <div className="relative z-20 max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 lg:max-w-[50%] lg:pr-16"
        >
          <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-accent/20 text-accent text-sm font-semibold w-fit">
            Why Choose Us
          </span>
          <h2 className="font-open-sans text-3xl sm:text-4xl font-bold text-white leading-tight">
            Why Indonesians Trust Sahabat
          </h2>
          <p className="text-slate-400 leading-relaxed max-w-md">
            Selama lebih dari 13 tahun, kami telah memberikan perlindungan
            terbaik kepada jutaan pelanggan di seluruh Indonesia dengan layanan
            yang cepat, transparan, dan dapat diandalkan.
          </p>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {reasons.map(({ Icon, title, body }) => (
              <div
                key={title}
                className="flex flex-col gap-1 border-t border-white/10 pt-3"
              >
                <div className="flex items-center gap-2">
                  <Icon
                    size={15}
                    style={{ color: "#6366F1" }}
                    aria-hidden="true"
                  />
                  <h3 className="font-semibold text-white text-sm">{title}</h3>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center w-fit px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-dark transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Learn More About Us
          </a>
        </motion.div>

        {/* Mobile-only image (stacked below content) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="lg:hidden mt-12 relative rounded-xl overflow-hidden aspect-[4/3]"
        >
          <Image
            src="/assets/2.png"
            alt="Tim Sahabat Insurance di kantor"
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 bg-black/50 rounded-b-xl">
            <p className="text-white text-sm font-medium">
              Tim profesional kami siap membantu Anda
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
