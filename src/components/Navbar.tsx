import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageToggle from "./LanguageToggle";
import CartSheet from "./CartSheet";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const navLinks = [
    { label: t("nav.products"), href: "/products" },
    { label: t("nav.categories"), href: "/#categories" },
    { label: t("nav.about"), href: "/#about" },
    { label: t("nav.contact"), href: "/#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto flex h-14 items-center justify-between px-3 md:h-16 md:px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-sm font-bold tracking-wider md:text-xl">
            <span className="text-primary">CHAMPION</span> <span className="text-foreground">SUPPLEMENT</span>
          </span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="font-body text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle />
          <CartSheet />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <CartSheet />
          <button onClick={() => setOpen(!open)} className="text-foreground">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              className="block py-3 font-body text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
