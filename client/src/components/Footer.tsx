import { Link } from "wouter";
import { MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Angelo Randazzo Inc</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Your trusted real estate broker in Montreal. Providing personalized service and expert guidance for all your property needs.
            </p>
            <p className="text-xs text-muted-foreground">
              License: Real Estate Broker<br />
              Montreal, Quebec
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/properties">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Browse Properties
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    About Angelo
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Contact Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/admin/login">
                  <span className="text-sm text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                    Admin Login
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  405 Rue de la Concorde, Suite 906<br />
                  Montreal, Quebec
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="tel:5149107370" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  (514) 910-7370
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <a href="mailto:angelo_randazzo@hotmail.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  angelo_randazzo@hotmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-12 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Angelo Randazzo Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
