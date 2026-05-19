"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";

const DOTS = [0, 1, 2];

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, #1a3578 0%, #21408f 50%, #2a52b5 100%)",
          }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Decorative blobs */}
          <motion.div
            className="absolute -top-24 -right-24 size-96 rounded-full opacity-[0.08]"
            style={{ background: "#6366f1" }}
            animate={{ scale: [1, 1.15, 1], rotate: [0, 15, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-32 -left-32 size-[28rem] rounded-full opacity-[0.06]"
            style={{ background: "#6366f1" }}
            animate={{ scale: [1.1, 1, 1.1], rotate: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 -left-16 size-48 rounded-full opacity-[0.05]"
            style={{ background: "#ffffff" }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Center content */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.75, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="drop-shadow-2xl"
            >
              <Image
                src="/logo-1.png"
                alt="Sahabat Insurance"
                width={260}
                height={88}
                className="h-20 w-auto brightness-0 invert"
                priority
              />
            </motion.div>

            {/* Tagline */}
            <motion.p
              className="text-white/70 text-sm tracking-[0.2em] uppercase font-medium text-center mx-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
            >
              Solusi Perlindungan Terpercaya
            </motion.p>

            {/* Loading dots */}
            <motion.div
              className="flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              {DOTS.map((i) => (
                <motion.span
                  key={i}
                  className="block size-2 rounded-full bg-white"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                    y: [0, -6, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.18,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="relative w-48 h-[2px] rounded-full overflow-hidden"
              style={{ background: "rgba(255,255,255,0.15)" }}
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ delay: 0.9, duration: 0.4 }}
            >
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,0.4), #ffffff, rgba(255,255,255,0.4))",
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
