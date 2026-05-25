"use client";

import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { MobileNav } from "./ui/navbar";
import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { NavbarData, NavItem } from "./navbarTypes";

interface Props {
  data: NavbarData;
}

export default function NavbarClient({ data }: Props) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6">
      <div className="pointer-events-auto mx-auto flex h-14 md:h-20 w-full max-w-7xl items-center justify-between gap-2 rounded-full px-4 sm:px-6 border border-slate-200/80 bg-white/95 shadow-xl shadow-[#1e3a8a]/10 backdrop-blur-md">
        {/* Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Sahabat Insurance home"
        >
          <Image
            src="/logo-1.png"
            alt="Sahabat Insurance"
            width={200}
            height={68}
            className="h-12 md:h-18 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="max-md:hidden" delayDuration={0}>
          <NavigationMenuList>
            {data.desktop.map((link, index) => {
              if (link.dropdownItems && link.dropdownItems.length > 0) {
                return (
                  <NavigationMenuItem key={index} className="relative">
                    <NavigationMenuTrigger className="h-9 rounded-full px-3 py-1.5 text-base font-bold transition-all bg-transparent text-[#1e3a8a] hover:bg-slate-100 data-[state=open]:bg-slate-100">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50">
                      <div className="p-3">
                        <CategoryItems items={link.dropdownItems} />
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    asChild
                    className="inline-flex h-9 items-center rounded-full px-3 py-1.5 text-base font-bold transition-all text-[#1e3a8a] hover:bg-slate-100"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA + mobile hamburger */}
        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/contact-us"
            className="hidden md:inline-flex items-center justify-center font-semibold px-5 text-sm h-9 rounded-full transition-all duration-200 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white shadow-sm shadow-[#1e3a8a]/30"
            aria-label="Hubungi Kami"
          >
            Hubungi Kami
          </Link>
          <MobileNav nav={data.mobile} solid={true} />
        </div>
      </div>
    </header>
  );
}

function CategoryItems({ items }: { items: NavItem[] }) {
  const hasAnySubItems = items.some(
    (item) => item.subItems && item.subItems.length > 0,
  );
  const [activeItem, setActiveItem] = React.useState<NavItem | null>(null);

  if (!hasAnySubItems) {
    return (
      <ul className="grid gap-0.5">
        {items.map((item) => (
          <SimpleListItem
            key={item.title}
            title={item.title}
            href={item.href}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className="flex items-start" onMouseLeave={() => setActiveItem(null)}>
      {/* Level 2 */}
      <ul className="grid gap-0.5 w-max">
        {items.map((item) => (
          <li key={item.title}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="group/item flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-text-primary hover:bg-slate-50 hover:text-[#1e3a8a]"
                onMouseEnter={() => {
                  setActiveItem(
                    item.subItems && item.subItems.length > 0 ? item : null,
                  );
                }}
              >
                <span className="flex-1 text-sm font-semibold leading-snug">
                  {item.title}
                </span>
                {item.subItems && item.subItems.length > 0 ? (
                  <ChevronRight className="size-3.5 shrink-0 text-text-muted opacity-0 group-hover/item:opacity-100 transition-all" />
                ) : (
                  <ArrowRight className="size-3.5 shrink-0 text-text-muted opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                )}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>

      {/* Level 3 panel */}
      {activeItem?.subItems && activeItem.subItems.length > 0 && (
        <>
          <div className="w-px bg-slate-100 mx-2 self-stretch" />
          <div className="w-max">
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted px-2 pt-1.5 pb-1">
              {activeItem.title}
            </p>
            <ul className="grid gap-0.5">
              {activeItem.subItems.map((subItem) => (
                <li key={subItem.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={subItem.href}
                      className="group/sub flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-primary hover:bg-slate-50 hover:text-[#1e3a8a] transition-all"
                    >
                      <span className="flex-1">{subItem.title}</span>
                      <ArrowRight className="size-3 shrink-0 text-text-muted opacity-0 group-hover/sub:opacity-100 transition-all" />
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function SimpleListItem({
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="group/row flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-all"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary group-hover/row:text-[#1e3a8a] transition-colors leading-snug">
              {title}
            </p>
          </div>
          <ArrowRight className="size-3.5 mt-0.5 shrink-0 text-text-muted opacity-0 -translate-x-1 group-hover/row:opacity-100 group-hover/row:translate-x-0 transition-all" />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
