import { Link } from "react-router-dom";
import LanguageToggle from "./LanguageToggle";
import CartSheet from "./CartSheet";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg h-14 md:h-16">
      <div className="h-full container mx-auto flex items-center justify-between px-3 md:px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-sm font-bold tracking-wider md:text-xl">
            <span className="text-primary">CHAMPION</span> <span className="text-foreground">SUPPLEMENT</span>
          </span>
        </Link>

        <div className="hidden items-center gap-4 md:flex">
          <LanguageToggle />
          <CartSheet />
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <LanguageToggle />
          <CartSheet />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
