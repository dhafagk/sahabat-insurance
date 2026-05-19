"use client";

import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Button } from "./button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { MobileSection } from "../navbarTypes";

type MobileNavProps = {
  nav: MobileSection[];
};

export function MobileNav({ nav }: MobileNavProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative size-9 touch-manipulation rounded-md bg-navy hover:bg-navy/90 focus-visible:ring-0 active:bg-navy/90 md:hidden"
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
        className="bg-white no-scrollbar h-(--radix-popover-content-available-height) w-(--radix-popover-content-available-width) overflow-y-auto rounded-none border-none p-0 shadow-lg duration-100 mt-2.5"
        align="start"
        side="bottom"
        alignOffset={-16}
        sideOffset={4}
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
                      className="text-base font-medium text-text-primary hover:text-navy py-1 transition-colors"
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
                            className="text-sm font-medium text-text-muted hover:text-navy py-0.5 transition-colors"
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

          {/* CTA inside menu */}
          <Link
            href="#contact"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center rounded-full bg-navy px-8 py-3.5 text-base font-semibold text-white hover:bg-navy/90 transition-colors"
          >
            Hubungi Kami
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
}
