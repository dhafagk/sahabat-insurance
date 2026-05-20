"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function TopBarProgress() {
  const pathname = usePathname();
  const [active, setActive] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setActive(true);
    setAnimKey((k) => k + 1);
    const t = setTimeout(() => setActive(false), 700);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key={animKey}
          className="fixed top-0 left-0 right-0 z-[10000]"
          style={{ height: "4px" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Base bar */}
          <motion.div
            className="absolute inset-0 origin-left"
            style={{
              background:
                "linear-gradient(90deg, #2887C1 0%, #6366f1 60%, #2887C1 100%)",
              boxShadow:
                "0 0 8px rgba(99,102,241,0.6), 0 0 20px rgba(40,135,193,0.4)",
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Shimmer sweep */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <motion.div
              className="absolute inset-y-0 w-24"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
              }}
              initial={{ x: "-100px" }}
              animate={{ x: "calc(100vw + 100px)" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            />
          </motion.div>

          {/* Glow dot at leading edge */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full"
            style={{
              background: "#6366f1",
              boxShadow: "0 0 8px 3px rgba(99,102,241,0.8)",
              right: 0,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.2, delay: 0.45 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
