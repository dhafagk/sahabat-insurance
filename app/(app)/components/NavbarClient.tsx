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
import { cn } from "@/app/(app)/lib/utils";
import { MobileNav } from "./ui/navbar";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronRight } from "lucide-react";
import type { NavbarData, NavItem } from "./navbarTypes";

interface Props {
  data: NavbarData;
}

export default function NavbarClient({ data }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isLanding = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const solid = !isLanding || scrolled;

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-500",
        solid
          ? "bg-white/95 top-0 backdrop-blur-md shadow-lg border border-slate-200/60"
          : "bg-transparent top-5 border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 md:h-20 justify-between items-center gap-2 sm:gap-4 px-4 sm:px-6 max-w-7xl">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center"
          aria-label="Sahabat Insurance home"
        >
          <Image
            src="/logo-1.png"
            alt="Sahabat Insurance"
            width={200}
            height={68}
            className={cn(
              "h-12 md:h-14 mt-1.5 md:mt-0 w-auto object-contain transition-[filter] duration-300",
              !solid && "brightness-0 invert",
            )}
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
                    <NavigationMenuTrigger
                      className={cn(
                        "h-9 rounded-none px-3 py-1.5 font-medium border-b-2 border-transparent transition-all bg-transparent hover:bg-transparent",
                        solid
                          ? "text-text-primary hover:text-navy hover:border-navy data-[state=open]:border-navy data-[state=open]:bg-transparent data-[state=open]:text-navy"
                          : "text-white hover:text-white hover:border-white/60 data-[state=open]:border-white data-[state=open]:bg-transparent data-[state=open]:text-white",
                      )}
                    >
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
                    className={cn(
                      "text-sm h-9 rounded-none px-3 py-1.5 font-medium border-b-2 border-transparent transition-all bg-transparent hover:bg-transparent",
                      solid
                        ? "text-text-primary hover:text-navy hover:border-navy"
                        : "text-white hover:text-white hover:border-white/60",
                    )}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA + mobile hamburger */}
        <div
          className={cn(
            "flex md:hidden items-center justify-end gap-2",
            !solid && "text-white",
          )}
        >
          <Link
            href="#contact"
            className="hidden md:inline-flex items-center justify-center font-semibold px-5 text-sm h-9 rounded-full transition-all duration-200 bg-navy hover:bg-navy/90 text-white shadow-sm"
            aria-label="Hubungi Kami"
          >
            Hubungi Kami
          </Link>
          <MobileNav nav={data.mobile} />
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
                className="group/item flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all text-text-primary hover:bg-slate-50 hover:text-navy"
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
                      className="group/sub flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-primary hover:bg-slate-50 hover:text-navy transition-all"
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
            <p className="text-sm font-semibold text-text-primary group-hover/row:text-navy transition-colors leading-snug">
              {title}
            </p>
          </div>
          <ArrowRight className="size-3.5 mt-0.5 shrink-0 text-text-muted opacity-0 -translate-x-1 group-hover/row:opacity-100 group-hover/row:translate-x-0 transition-all" />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
