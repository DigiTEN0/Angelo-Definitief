import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, Mail } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const [location] = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col cursor-pointer" data-testid="link-home">
              <span className="font-serif text-2xl font-bold text-primary">Angelo Randazzo Inc</span>
              <span className="text-xs text-muted-foreground uppercase tracking-wider">Real Estate Broker</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-foreground"
                  }`}
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Contact Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:5149107370">
              <Button variant="outline" size="default" data-testid="button-call">
                <Phone className="w-4 h-4 mr-2" />
                (514) 910-7370
              </Button>
            </a>
            <Link href="/contact">
              <Button size="default" data-testid="button-contact">
                Get in Touch
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="px-6 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left py-2 text-base font-medium uppercase tracking-wide transition-colors ${
                    isActive(link.href) ? "text-primary" : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
            <div className="pt-4 space-y-3 border-t border-border">
              <a href="tel:5149107370" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  (514) 910-7370
                </Button>
              </a>
              <a href="mailto:angelo_randazzo@hotmail.com" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Me
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
