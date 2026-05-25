"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { cn } from "@/app/(app)/lib/utils";
import type { MobileSection } from "../navbarTypes";

type MobileNavProps = {
  nav: MobileSection[];
  solid?: boolean;
};

export function MobileNav({ nav, solid = true }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "relative size-9 touch-manipulation rounded-full focus-visible:ring-0 md:hidden",
            solid
              ? "bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 active:bg-[#1e3a8a]/90"
              : "bg-white/20 hover:bg-white/30 active:bg-white/30 border border-white/30",
          )}
        >
          {open ? (
            <X className="size-5 text-white" />
          ) : (
            <Menu className="size-5 text-white" />
          )}
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="no-scrollbar max-h-[85vh] w-[calc(100vw-2rem)] max-w-sm overflow-y-auto rounded-2xl border border-slate-200/60 bg-white p-0 shadow-2xl shadow-[#1e3a8a]/10 duration-200"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <div className="flex flex-col gap-8 overflow-auto p-6">
          {nav.map((category, index) => (
            <div className="flex flex-col gap-3" key={index}>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                {category.name}
              </p>
              <div className="flex flex-col gap-1">
                {category.items.map((item, i) => (
                  <React.Fragment key={i}>
                    <Link
                      href={item.href}
                      className="text-base font-medium text-text-primary hover:text-[#1e3a8a] py-1 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                    </Link>
                    {item.subItems && item.subItems.length > 0 && (
                      <div className="flex flex-col gap-0.5 pl-4 border-l-2 border-slate-100 mb-1">
                        {item.subItems.map((sub, j) => (
                          <Link
                            key={j}
                            href={sub.href}
                            className="text-sm font-medium text-text-muted hover:text-[#1e3a8a] py-0.5 transition-colors"
                            onClick={() => setOpen(false)}
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}

          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-[#1e3a8a] px-8 py-3.5 text-base font-semibold text-white hover:bg-[#1e3a8a]/90 transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
