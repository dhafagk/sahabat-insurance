"use client";

import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/app/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
} from "@/app/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { MobileNav } from "@/app/components/ui/navbar";
import React, { useState, useEffect } from "react";

const products = [
  {
    title: "Life Insurance",
    description: "Protect your family's financial future",
    href: "#products",
  },
  {
    title: "Health Insurance",
    description: "Comprehensive medical coverage for you and your family",
    href: "#products",
  },
  {
    title: "Vehicle Insurance",
    description: "Full protection for your car and motorcycle",
    href: "#products",
  },
];

const services = [
  {
    title: "Claims Service",
    description: "Fast and easy claims processing",
    href: "#services",
  },
  {
    title: "Customer Support",
    description: "24/7 support whenever you need us",
    href: "#services",
  },
];

const company = [
  {
    title: "About Us",
    description: "Our story, mission and values",
    href: "#about",
  },
  {
    title: "Awards",
    description: "Recognition for our excellence",
    href: "#awards",
  },
  {
    title: "Latest News",
    description: "News and updates from Sahabat Insurance",
    href: "#news",
  },
];

const navigationLinks = {
  mobile: [
    {
      name: "Menu",
      items: [
        { href: "#contact", label: "Contact" },
        { href: "tel:02150508080", label: "Call Us" },
      ],
    },
    {
      name: "Products",
      items: products.map((item) => ({
        href: item.href,
        label: item.title,
      })),
    },
    {
      name: "Services",
      items: services.map((item) => ({
        href: item.href,
        label: item.title,
      })),
    },
    {
      name: "Company",
      items: company.map((item) => ({
        href: item.href,
        label: item.title,
      })),
    },
  ],
  desktop: [
    {
      href: "#products",
      label: "Products",
      gridCols: 3,
      categories: [
        {
          name: "Insurance Products",
          id: "products",
          items: products,
        },
      ],
    },
    {
      href: "#services",
      label: "Services",
      gridCols: 2,
      categories: [
        {
          name: "Our Services",
          id: "services",
          items: services,
        },
      ],
    },
    {
      href: "#about",
      label: "Company",
      gridCols: 2,
      categories: [
        {
          name: "About Sahabat",
          id: "company",
          items: company,
        },
      ],
    },
    { href: "#news", label: "News" },
  ],
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-slate-200/60 bg-white/90 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container mx-auto flex h-16 md:h-20 items-center justify-between gap-2 sm:gap-4 px-4 sm:px-6 max-w-7xl">
        {/* Logo — always left */}
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

        {/* Desktop nav — center */}
        <NavigationMenu className="max-md:hidden">
          <NavigationMenuList>
            {navigationLinks.desktop.map((link, index) => {
              if (link.categories && link.categories.length > 0) {
                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuTrigger className="h-8 rounded-none px-3 py-1.5 font-medium text-text-primary hover:text-navy border-b-2 border-transparent hover:border-navy transition-colors bg-transparent hover:bg-transparent data-[state=open]:border-navy data-[state=open]:text-navy">
                      {link.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent
                      className={cn(
                        "z-50 p-2 min-w-[200px]",
                        link.gridCols === 2 && "min-w-[240px]",
                        link.gridCols === 3 && "min-w-[280px]",
                      )}
                    >
                      {link.categories.map((category) => (
                        <ul key={category.id} className="grid gap-0.5">
                          {category.items.map((item) => (
                            <ListItem
                              key={item.title}
                              title={item.title}
                              href={item.href}
                            />
                          ))}
                        </ul>
                      ))}
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                );
              }

              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuLink
                    href={link.href}
                    asChild
                    className="rounded-none px-3 py-1.5 font-medium text-text-primary hover:text-navy border-b-2 border-transparent hover:border-navy transition-colors"
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right side: CTA on desktop, hamburger on mobile */}
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
          <MobileNav nav={navigationLinks.mobile} />
        </div>
      </div>
    </header>
  );
}

function ListItem({
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block px-3 py-2.5 text-sm text-text-primary hover:text-navy hover:bg-slate-50 rounded transition-colors"
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
