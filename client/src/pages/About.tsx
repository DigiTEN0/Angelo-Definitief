import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import {
  Award,
  Users,
  TrendingUp,
  Heart,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";
import angeloHeadshot from "@assets/generated_images/Angelo_Randazzo_professional_headshot_92ad9969.png";
import { MapSection } from "@/components/MapSection";

export default function About() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            About Angelo Randazzo
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner in Montreal real estate for over 15 years
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-32">
          <div className="relative aspect-[3/4] overflow-hidden rounded-md lg:sticky lg:top-24">
            <img
              src={angeloHeadshot}
              alt="Angelo Randazzo"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="font-serif text-3xl font-semibold mb-4">
                Your Montreal Real Estate Expert
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  With over 15 years of dedicated service in Montreal's real
                  estate market, I've built my reputation on integrity,
                  expertise, and exceptional client service. As a solo broker, I
                  provide personalized attention that larger firms simply cannot
                  match.
                </p>
                <p>
                  My deep understanding of Montreal's diverse neighborhoods—from
                  the historic charm of Old Montreal to the vibrant energy of
                  the Plateau, from the elegance of Westmount to the
                  family-friendly streets of NDG—allows me to guide you to the
                  perfect property that matches your lifestyle and investment
                  goals.
                </p>
                <p>
                  Whether you're a first-time homebuyer, seasoned investor, or
                  looking to sell your property for the best possible price, I
                  bring a wealth of market knowledge and negotiation expertise
                  to ensure your success.
                </p>
                <p>
                  What sets me apart is my commitment to understanding your
                  unique needs and goals. I don't just show you properties—I
                  listen, advise, and work tirelessly to find solutions that
                  exceed your expectations.
                </p>
              </div>
            </div>

            {/* Contact Info Card */}
            <Card className="p-6 border-card-border">
              <h3 className="font-semibold mb-4">Let's Connect</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Office</p>
                    <p className="text-sm text-muted-foreground">
                      405 Rue de la Concorde, Suite 906
                      <br />
                      Montreal, Quebec
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <a
                      href="tel:5149107370"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      (514) 910-7370
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <a
                      href="mailto:angelo_randazzo@hotmail.com"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      angelo_randazzo@hotmail.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* How We Work Together */}
        <div className="mb-32 -mx-6 px-6 py-32 bg-gradient-to-br from-slate-50 to-slate-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How We Work Together
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              A straightforward process focused on finding you the right
              property
            </p>
          </div>

          <div className="relative">
            {/* Desktop connecting line */}
            <div className="hidden lg:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
              <div className="relative group">
                <div className="flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">1</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Discovery
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Initial consultation to understand your requirements and
                    preferences
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">2</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Property Search
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Curated property matches and organized viewings on your
                    schedule
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">3</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">
                    Offer & Due Diligence
                  </h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Strategic negotiation and thorough property evaluation
                  </p>
                </div>
              </div>

              <div className="relative group">
                <div className="flex flex-col">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                        <span className="text-white text-xl font-bold">4</span>
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">Close</h3>
                  <p className="text-muted-foreground text-center leading-relaxed">
                    Seamless transaction management through to move-in day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-32">
          <h2 className="font-serif text-3xl font-semibold text-center mb-12">
            My Commitment to You
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-8 border-card-border">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Client-Focused Service
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your goals become my goals. I provide personalized attention and
                tailored strategies to ensure your real estate journey is smooth
                and successful.
              </p>
            </Card>

            <Card className="p-8 border-card-border">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <Award className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Expertise & Integrity
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                With deep market knowledge and unwavering ethical standards, I
                provide honest advice and skilled negotiation to protect your
                interests.
              </p>
            </Card>

            <Card className="p-8 border-card-border">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <MapPin className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Local Knowledge
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Intimate understanding of Montreal's neighborhoods, market
                trends, and hidden gems helps you make informed decisions.
              </p>
            </Card>

            <Card className="p-8 border-card-border">
              <div className="w-14 h-14 rounded-md bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">
                Proven Results
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                A track record of successful transactions and satisfied clients
                demonstrates my ability to deliver exceptional outcomes.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <Card className="p-12 text-center border-card-border bg-primary text-primary-foreground">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold mb-4">
            Ready to Work Together?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Let's discuss your real estate goals and create a plan to achieve
            them.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              variant="outline"
              className="backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30 text-white h-14 px-8"
              data-testid="button-contact"
            >
              Get in Touch
            </Button>
          </Link>
        </Card>
      </div>

      {/* Google Maps Embed */}
      <MapSection />
    </div>
  );
}
