import { Card } from "@/components/ui/card";
import { ContactForm } from "@/components/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MapSection } from "@/components/MapSection";

export default function Contact() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Get in Touch</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ready to start your real estate journey? I'm here to help you every step of the way.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <Card className="p-8 border-card-border">
              <h2 className="font-serif text-2xl font-semibold mb-6">Send Me a Message</h2>
              <ContactForm />
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-6">
                <Card className="p-6 border-card-border hover-elevate transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a 
                        href="tel:5149107370"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        data-testid="link-phone"
                      >
                        (514) 910-7370
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        Available Mon-Sat, 9AM-6PM
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-card-border hover-elevate transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a 
                        href="mailto:angelo_randazzo@hotmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors break-all"
                        data-testid="link-email"
                      >
                        angelo_randazzo@hotmail.com
                      </a>
                      <p className="text-sm text-muted-foreground mt-1">
                        I'll respond within 24 hours
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-card-border hover-elevate transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Location</h3>
                      <p className="text-muted-foreground">
                        405 Rue de la Concorde<br />
                        Suite 906<br />
                        Montreal, Quebec
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border-card-border hover-elevate transition-all">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <div className="text-muted-foreground space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: By Appointment</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            {/* Why Contact Me */}
            <Card className="p-8 bg-primary text-primary-foreground border-primary-border">
              <h3 className="font-serif text-xl font-semibold mb-4">Why Choose Me?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="opacity-90">15+ years of Montreal real estate experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="opacity-90">Personalized, one-on-one service</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="opacity-90">Deep knowledge of Montreal neighborhoods</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs">✓</span>
                  </div>
                  <span className="opacity-90">Proven track record of successful sales</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <MapSection />
    </div>
  );
}
