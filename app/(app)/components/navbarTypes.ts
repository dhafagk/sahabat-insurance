export interface NavSubItem {
  title: string;
  href: string;
}

export interface NavItem {
  title: string;
  description?: string;
  href: string;
  subItems?: NavSubItem[];
}

export interface NavCategory {
  name: string;
  id: string;
  items: NavItem[];
}

export interface DesktopNavLink {
  href: string;
  label: string;
  categories?: NavCategory[];
}

export interface MobileNavItem {
  href: string;
  label: string;
  subItems?: { href: string; label: string }[];
}

export interface MobileCategory {
  name: string;
  items: MobileNavItem[];
}

export interface NavbarData {
  desktop: DesktopNavLink[];
  mobile: MobileCategory[];
}
