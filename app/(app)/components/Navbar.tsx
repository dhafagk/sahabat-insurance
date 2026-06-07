import { cache } from "react";
import { getPayload } from "payload";
import config from "@payload-config";
import NavbarClient from "./NavbarClient";
import { getLocale } from "../lib/locale";
import type {
  NavbarData,
  NavItem,
  DesktopNavLink,
  MobileSection,
} from "./navbarTypes";

const getPayloadInstance = cache(async () => getPayload({ config }));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetchNavbar = cache(async (): Promise<any> => {
  try {
    const payload = await getPayloadInstance();
    return payload.findGlobal({ slug: "navbar", depth: 2 });
  } catch {
    return null;
  }
});

// ─── Hardcoded defaults ───────────────────────────────────────────────────────

const DEFAULT_PRODUCTS: NavItem[] = [
  {
    title: "Life Insurance",
    description: "Protect your family's financial future",
    href: "#products",
    subItems: [
      { title: "Term Life", href: "#products" },
      { title: "Whole Life", href: "#products" },
      { title: "Unit Link", href: "#products" },
    ],
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
    subItems: [
      { title: "Car Insurance", href: "#products" },
      { title: "Motorcycle Insurance", href: "#products" },
      { title: "Fleet Insurance", href: "#products" },
    ],
  },
];

const DEFAULT_SERVICES: NavItem[] = [
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

const DEFAULT_COMPANY: NavItem[] = [
  {
    title: "About Us",
    description: "Our story, mission and values",
    href: "#about",
    subItems: [
      { title: "Company Profile", href: "#about" },
      { title: "Our History", href: "#about" },
      { title: "Organizational Structure", href: "#about" },
    ],
  },
  {
    title: "Visi & Misi",
    description: "Komitmen dan tujuan perusahaan kami",
    href: "/vision-and-mission",
  },
  {
    title: "Manajemen",
    description: "Dewan komisaris dan direksi perusahaan",
    href: "/management",
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

const DEFAULT_NAV: NavbarData = {
  desktop: [
    { href: "#products", label: "Products", dropdownItems: DEFAULT_PRODUCTS },
    { href: "#services", label: "Services", dropdownItems: DEFAULT_SERVICES },
    { href: "#about", label: "Company", dropdownItems: DEFAULT_COMPANY },
    { href: "#news", label: "News" },
  ],
  mobile: [
    {
      name: "Menu",
      items: [
        { href: "https://wa.me/622150508080", label: "Claim Via Whatsapp" },
      ],
    },
    {
      name: "Products",
      items: DEFAULT_PRODUCTS.map((item) => ({
        href: item.href,
        label: item.title,
        subItems: item.subItems?.map((s) => ({ href: s.href, label: s.title })),
      })),
    },
    {
      name: "Services",
      items: DEFAULT_SERVICES.map((item) => ({
        href: item.href,
        label: item.title,
      })),
    },
    {
      name: "Company",
      items: DEFAULT_COMPANY.map((item) => ({
        href: item.href,
        label: item.title,
        subItems: item.subItems?.map((s) => ({ href: s.href, label: s.title })),
      })),
    },
  ],
};

// ─── Payload → NavbarData mapper ─────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapPayloadToNavbarData(raw: any): NavbarData | null {
  const items = raw?.items;
  if (!Array.isArray(items) || items.length === 0) return null;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const desktop: DesktopNavLink[] = items.map((item: any) => ({
    href: item.href ?? "#",
    label: item.label ?? "",
    dropdownItems: Array.isArray(item.dropdownItems)
      ? item.dropdownItems.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (navItem: any): NavItem => ({
            title: navItem.title ?? "",
            description: navItem.description ?? undefined,
            href: navItem.href ?? "#",
            subItems: Array.isArray(navItem.subItems)
              ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
                navItem.subItems.map((sub: any) => ({
                  title: sub.title ?? "",
                  href: sub.href ?? "#",
                }))
              : undefined,
          }),
        )
      : undefined,
  }));

  const mobile: MobileSection[] = [
    {
      name: "Menu",
      items: [
        { href: "https://wa.me/622150508080", label: "Claim Via Whatsapp" },
      ],
    },
    ...desktop
      .filter((link) => link.dropdownItems && link.dropdownItems.length > 0)
      .map((link) => ({
        name: link.label,
        items: (link.dropdownItems ?? []).map((navItem) => ({
          href: navItem.href,
          label: navItem.title,
          subItems: navItem.subItems?.map((sub) => ({
            href: sub.href,
            label: sub.title,
          })),
        })),
      })),
  ];

  return { desktop, mobile };
}

// ─── Server component ─────────────────────────────────────────────────────────

export default async function Navbar() {
  const [raw, locale] = await Promise.all([fetchNavbar(), getLocale()]);
  const mapped = mapPayloadToNavbarData(raw);
  const navData = mapped ?? DEFAULT_NAV;

  return <NavbarClient data={navData} locale={locale} />;
}
