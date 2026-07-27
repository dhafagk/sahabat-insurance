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

export interface CtaButton {
  label: string;
  href: string;
}

// ponytail: one nav list drives desktop and mobile — no separate mobile shape to drift
export interface NavbarData {
  desktop: DesktopNavLink[];
  ctaButton: CtaButton;
}
