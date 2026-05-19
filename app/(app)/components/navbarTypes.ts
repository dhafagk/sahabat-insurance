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

export interface DesktopNavLink {
  href: string;
  label: string;
  dropdownItems?: NavItem[];
}

export interface MobileNavItem {
  href: string;
  label: string;
  subItems?: { href: string; label: string }[];
}

export interface MobileSection {
  name: string;
  items: MobileNavItem[];
}

export interface NavbarData {
  desktop: DesktopNavLink[];
  mobile: MobileSection[];
}
