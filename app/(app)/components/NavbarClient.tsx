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
import React, { useState } from "react";
import { ArrowRight, ChevronRight, Menu, X } from "lucide-react";
import type { NavbarData, NavItem, MobileSection } from "./navbarTypes";
import SearchButton from "./SearchButton";
import SearchOverlay from "./SearchOverlay";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Locale } from "../lib/locale";

interface Props {
  data: NavbarData;
  locale: Locale;
}

export default function NavbarClient({ data, locale }: Props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {isMobileOpen && (
        <div
          className="pointer-events-auto fixed inset-0 z-[49] md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
      <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 sm:px-6">
        <div className="pointer-events-auto relative mx-auto w-full max-w-7xl">
          {/* Navbar pill */}
          <div className="flex h-14 md:h-20 w-full items-center justify-between gap-2 rounded-full px-4 sm:px-6 border border-slate-200/80 bg-white/95 shadow-xl shadow-[#1e3a8a]/10 backdrop-blur-md">
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

            {/* CTA + search + mobile hamburger */}
            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden md:block">
                <LanguageSwitcher currentLocale={locale} />
              </div>
              <SearchButton onClick={() => setIsSearchOpen(true)} />
              <Link
                href="/contact-us"
                className="hidden md:inline-flex items-center justify-center font-semibold px-5 text-sm h-9 rounded-full transition-all duration-200 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 text-white shadow-sm shadow-[#1e3a8a]/30"
                aria-label="Hubungi Kami"
              >
                Hubungi Kami
              </Link>
              <button
                type="button"
                className="relative inline-flex size-9 touch-manipulation items-center justify-center rounded-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 active:bg-[#1e3a8a]/90 focus-visible:outline-none md:hidden"
                onClick={() => setIsMobileOpen((prev) => !prev)}
                aria-label="Toggle Menu"
                aria-expanded={isMobileOpen}
              >
                {isMobileOpen ? (
                  <X className="size-5 text-white" />
                ) : (
                  <Menu className="size-5 text-white" />
                )}
                <span className="sr-only">Toggle Menu</span>
              </button>
            </div>
          </div>

          {/* Mobile dropdown — anchored directly below the navbar pill */}
          {isMobileOpen && (
            <div className="no-scrollbar absolute right-0 top-[calc(100%+8px)] max-h-[calc(85vh-5rem)] w-[calc(100vw-2rem)] max-w-sm overflow-y-auto rounded-2xl border border-slate-200/60 bg-white shadow-2xl shadow-[#1e3a8a]/10 md:hidden">
              <MobileMenuContent
                nav={data.mobile}
                locale={locale}
                onClose={() => setIsMobileOpen(false)}
              />
            </div>
          )}
        </div>

        <SearchOverlay
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />
      </header>
    </>
  );
}

function MobileMenuContent({
  nav,
  locale,
  onClose,
}: {
  nav: MobileSection[];
  locale: Locale;
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col gap-8 p-6">
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
                  className="py-1 text-base font-medium text-text-primary transition-colors hover:text-[#1e3a8a]"
                  onClick={onClose}
                >
                  {item.label}
                </Link>
                {item.subItems && item.subItems.length > 0 && (
                  <div className="mb-1 flex flex-col gap-0.5 border-l-2 border-slate-100 pl-4">
                    {item.subItems.map((sub, j) => (
                      <Link
                        key={j}
                        href={sub.href}
                        className="py-0.5 text-sm font-medium text-text-muted transition-colors hover:text-[#1e3a8a]"
                        onClick={onClose}
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

      <div className="flex flex-col gap-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-text-muted">
          Language
        </p>
        <LanguageSwitcher currentLocale={locale} />
      </div>

      <Link
        href="/contact-us"
        onClick={onClose}
        className="inline-flex items-center justify-center rounded-full bg-[#1e3a8a] px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-[#1e3a8a]/90"
      >
        Hubungi Kami
      </Link>
    </div>
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
      <ul className="grid w-max gap-0.5">
        {items.map((item) => (
          <li key={item.title}>
            <NavigationMenuLink asChild>
              <Link
                href={item.href}
                className="group/item flex items-center gap-3 rounded-lg px-3 py-2.5 text-text-primary transition-all hover:bg-slate-50 hover:text-[#1e3a8a]"
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
                  <ChevronRight className="size-3.5 shrink-0 text-text-muted opacity-0 transition-all group-hover/item:opacity-100" />
                ) : (
                  <ArrowRight className="size-3.5 shrink-0 -translate-x-1 text-text-muted opacity-0 transition-all group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                )}
              </Link>
            </NavigationMenuLink>
          </li>
        ))}
      </ul>

      {/* Level 3 panel */}
      {activeItem?.subItems && activeItem.subItems.length > 0 && (
        <>
          <div className="mx-2 w-px self-stretch bg-slate-100" />
          <div className="w-max">
            <p className="px-2 pb-1 pt-1.5 text-xs font-semibold uppercase tracking-widest text-text-muted">
              {activeItem.title}
            </p>
            <ul className="grid gap-0.5">
              {activeItem.subItems.map((subItem) => (
                <li key={subItem.title}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={subItem.href}
                      className="group/sub flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-text-primary transition-all hover:bg-slate-50 hover:text-[#1e3a8a]"
                    >
                      <span className="flex-1">{subItem.title}</span>
                      <ArrowRight className="size-3 shrink-0 text-text-muted opacity-0 transition-all group-hover/sub:opacity-100" />
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
          className="group/row flex items-start gap-3 rounded-lg px-3 py-2.5 transition-all hover:bg-slate-50"
        >
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-snug text-text-primary transition-colors group-hover/row:text-[#1e3a8a]">
              {title}
            </p>
          </div>
          <ArrowRight className="mt-0.5 size-3.5 shrink-0 -translate-x-1 text-text-muted opacity-0 transition-all group-hover/row:translate-x-0 group-hover/row:opacity-100" />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
