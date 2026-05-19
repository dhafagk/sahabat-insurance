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
import { buttonVariants } from "./ui/button";
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid
          ? "border-b border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 max-w-7xl">
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
            className="h-12 md:h-14 mt-1.5 md:mt-0 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <NavigationMenu className="max-md:hidden" delayDuration={0}>
          <NavigationMenuList>
            {data.desktop.map((link, index) => {
              if (link.categories && link.categories.length > 0) {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger className="h-9 rounded-none px-3 py-1.5 font-medium text-text-primary hover:text-navy border-b-2 border-transparent hover:border-navy hover:bg-transparent transition-all bg-transparent data-[state=open]:border-navy data-[state=open]:bg-transparent data-[state=open]:text-navy">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent className="z-50 overflow-hidden">
                      <div className="h-1 w-full bg-gradient-to-r from-navy via-navy/80 to-blue-400" />
                      <div className="p-3">
                        {link.categories.map((category) => (
                          <CategoryItems key={category.id} items={category.items} />
                        ))}
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
                    className="text-sm h-9 rounded-none px-3 py-1.5 font-medium text-text-primary hover:text-navy border-b-2 border-transparent hover:border-navy hover:bg-transparent transition-all bg-transparent"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* CTA + mobile hamburger */}
        <div className="flex items-center justify-end gap-2">
          <Link
            href="#contact"
            className={cn(
              buttonVariants({ variant: "default", size: "sm" }),
              "hidden md:inline-flex bg-navy hover:bg-navy/90 text-white font-semibold px-5",
            )}
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
  const hasAnySubItems = items.some((item) => item.subItems && item.subItems.length > 0);
  const defaultActive = items.find((item) => item.subItems && item.subItems.length > 0) ?? null;
  const [activeItem, setActiveItem] = React.useState<NavItem | null>(defaultActive);

  if (!hasAnySubItems) {
    return (
      <ul className="grid gap-0.5">
        {items.map((item) => (
          <SimpleListItem key={item.title} title={item.title} href={item.href} />
        ))}
      </ul>
    );
  }

  return (
    <div className="flex">
      {/* Level 2 */}
      <ul className="grid gap-0.5 min-w-[200px]">
        {items.map((item) => (
          <li key={item.title}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all",
                  activeItem?.title === item.title
                    ? "bg-slate-50 text-navy"
                    : "text-text-primary hover:bg-slate-50 hover:text-navy",
                )}
                onMouseEnter={() => {
                  if (item.subItems && item.subItems.length > 0) setActiveItem(item);
                }}
              >
                <span className="flex-1 text-sm font-semibold leading-snug">
                  {item.title}
                </span>
                {item.subItems && item.subItems.length > 0 ? (
                  <ChevronRight className="size-3.5 shrink-0 text-text-muted" />
                ) : (
                  <ArrowRight className="size-3.5 shrink-0 text-text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                )}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>

      {/* Divider */}
      <div className="w-px bg-slate-100 mx-2 self-stretch" />

      {/* Level 3 sub-items panel */}
      <div className="min-w-[170px]">
        {activeItem?.subItems && activeItem.subItems.length > 0 && (
          <>
            <p className="text-xs font-semibold uppercase tracking-widest text-text-muted px-2 pt-1.5 pb-1">
              {activeItem.title}
            </p>
            <ul className="grid gap-0.5">
              {activeItem.subItems.map((subItem) => (
                <li key={subItem.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={subItem.href}
                      className="group flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-primary hover:bg-slate-50 hover:text-navy transition-all"
                    >
                      <span className="flex-1">{subItem.title}</span>
                      <ArrowRight className="size-3 shrink-0 text-text-muted opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </NavigationMenuLink>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
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
          className="group flex items-start gap-3 rounded-lg px-3 py-2.5 hover:bg-slate-50 transition-all"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-text-primary group-hover:text-navy transition-colors leading-snug">
              {title}
            </p>
          </div>
          <ArrowRight className="size-3.5 mt-0.5 shrink-0 text-text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
