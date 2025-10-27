import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ArrowRight,
  Home as HomeIcon,
  Users,
  Award,
  TrendingUp,
  Building2,
  MapPin,
  ShieldCheck,
  Heart,
  BarChart3,
  Clock,
  Phone,
  Mail,
  MapPinned,
} from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { ContactForm } from "@/components/ContactForm";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import angeloHeadshot from "@assets/generated_images/Angelo_Randazzo_professional_headshot_92ad9969.png";
import { MapSection } from "@/components/MapSection";

export default function Home() {
  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const featuredProperties =
    properties?.filter((p) => p.status === "active").slice(0, 3) || [];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0">
          <video
            src="https://www.digiten.nl/wp-content/uploads/2025/10/an-aerial-shot-of-downtown-montreal-and-its-skyscr-2025-08-29-01-40-54-utc-1.mov"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Discover Your Dream Home in Montreal
          </h1>
          <p className="text-base md:text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
            Expert guidance and personalized service for luxury real estate in
            Montreal's finest neighborhoods
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link href="/properties">
              <Button
                size="lg"
                className="text-base backdrop-blur-md bg-primary/90 hover:bg-primary border border-primary-border h-14 px-8"
                data-testid="button-view-properties"
              >
                View Available Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="text-base backdrop-blur-md bg-white/10 hover:bg-white/20 border-white/30 text-white h-14 px-8"
                data-testid="button-schedule-consultation"
              >
                Schedule Consultation
              </Button>
            </Link>
          </div>

          {/* Service Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-semibold mb-1">Licensed Broker</p>
              <p className="text-sm text-white/70">Certified professional</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-semibold mb-1">Montreal Expert</p>
              <p className="text-sm text-white/70">All neighborhoods & areas</p>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <p className="text-white font-semibold mb-1">Full Service</p>
              <p className="text-sm text-white/70">
                Buying, selling & investing
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-5xl font-bold mb-4">
              Why Work With Angelo Randazzo Inc?
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Expertise, dedication, and results-driven service for all your
              real estate needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Trusted Expertise</h3>
              <p className="text-muted-foreground leading-relaxed">
                Over 15 years of experience in Montreal's luxury real estate
                market with proven results
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                Personalized Service
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Every client receives tailored attention and customized
                strategies for their unique needs
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <BarChart3 className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Market Knowledge</h3>
              <p className="text-muted-foreground leading-relaxed">
                Deep understanding of Montreal neighborhoods, market trends, and
                property values
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Always Available</h3>
              <p className="text-muted-foreground leading-relaxed">
                Dedicated support throughout your journey with quick responses
                and proactive communication
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-5xl font-semibold mb-4">
              Featured Properties
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Explore our handpicked selection of luxury properties in
              Montreal's most desirable locations
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="h-96 animate-pulse bg-muted" />
              ))}
            </div>
          ) : featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No properties available at the moment. Check back soon!
              </p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/properties">
              <Button size="lg" variant="outline" data-testid="button-view-all">
                View All Properties
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* The Journey */}
      <section className="py-32 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-2xl md:text-5xl font-bold mb-4">
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

          <div className="text-center mt-16">
            <Link href="/contact">
              <Button size="lg" className="h-14 px-8 text-base">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-2xl">
              <img
                src={angeloHeadshot}
                alt="Angelo Randazzo"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
                Your Trusted Montreal Real Estate Expert
              </h2>
              <p className="text-base text-muted-foreground leading-relaxed mb-6">
                With{" "}
                <span className="font-semibold text-foreground">
                  over 15 years of experience
                </span>{" "}
                in Montreal's real estate market, I provide{" "}
                <span className="font-semibold text-foreground">
                  personalized service
                </span>{" "}
                and expert guidance to help you find your perfect property or
                sell your home for the{" "}
                <span className="font-semibold text-foreground">
                  best price
                </span>
                .
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-10">
                My{" "}
                <span className="font-semibold text-foreground">
                  deep knowledge
                </span>{" "}
                of Montreal's neighborhoods, combined with a commitment to{" "}
                <span className="font-semibold text-foreground">
                  exceptional client service
                </span>
                , ensures a smooth and successful real estate experience.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Licensed Broker</p>
                    <p className="text-muted-foreground">
                      Certified real estate professional
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Users className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Client-Focused</p>
                    <p className="text-muted-foreground">
                      Your goals are my priority
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">
                      Proven Track Record
                    </p>
                    <p className="text-muted-foreground">
                      500+ successful transactions
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-lg mb-1">Market Expert</p>
                    <p className="text-muted-foreground">
                      Deep neighborhood knowledge
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/about">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base"
                  data-testid="button-learn-more"
                >
                  Learn More About Angelo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6">
              Get In Touch
            </h2>
            <p className="text-base text-white/80 max-w-2xl mx-auto leading-relaxed">
              Ready to start your real estate journey? I'm here to help you
              every step of the way.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-bold text-white mb-6">
                  Let's Connect
                </h3>
                <p className="text-base text-white/70 leading-relaxed mb-8">
                  Whether you're buying your first home, selling a property, or
                  looking for investment opportunities, I'm committed to
                  providing you with exceptional service and expert guidance
                  throughout the entire process.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                        Phone
                      </p>
                      <a
                        href="tel:+15141234567"
                        className="text-xl font-semibold text-white hover:text-primary transition-colors"
                      >
                        (514) 123-4567
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                        Email
                      </p>
                      <a
                        href="mailto:angelo@angelorandazzo.com"
                        className="text-xl font-semibold text-white hover:text-primary transition-colors break-all"
                      >
                        angelo@angelorandazzo.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all group">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                      <MapPinned className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-white/60 uppercase tracking-wider mb-2">
                        Office
                      </p>
                      <p className="text-xl font-semibold text-white">
                        Montreal, Quebec
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              <div className="pt-6">
                <h4 className="text-lg font-semibold text-white mb-4">
                  Office Hours
                </h4>
                <div className="space-y-2 text-white/70">
                  <p className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="text-white font-medium">
                      9:00 AM - 6:00 PM
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="text-white font-medium">
                      10:00 AM - 4:00 PM
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="text-white font-medium">
                      By Appointment
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="p-8 lg:p-10 bg-white border-0 shadow-2xl">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
              <ContactForm />
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-5xl font-bold mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Get answers to common questions about buying and selling real
              estate in Montreal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-4">
                What areas of Montreal do you serve?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I serve{" "}
                <span className="font-semibold text-foreground">
                  all areas of Montreal
                </span>{" "}
                and surrounding regions. My extensive neighborhood knowledge
                helps guide you to the{" "}
                <span className="font-semibold text-foreground">
                  perfect location
                </span>{" "}
                for your needs.
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-4">
                How long does it typically take to buy a home?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                On average,{" "}
                <span className="font-semibold text-foreground">
                  2-3 months
                </span>{" "}
                from search to closing. This includes viewings, offer,
                negotiation, inspection, and financing approval.
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-4">
                What should I look for when viewing a property?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Beyond aesthetics, consider{" "}
                <span className="font-semibold text-foreground">
                  location, amenities, natural light, storage
                </span>
                , and condition. I'll guide you through viewings, highlighting{" "}
                <span className="font-semibold text-foreground">
                  important details
                </span>{" "}
                for your long-term needs.
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-4">
                Do I need a pre-approved mortgage?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                While not mandatory,{" "}
                <span className="font-semibold text-foreground">
                  highly recommended
                </span>
                . It clarifies your budget, makes you a{" "}
                <span className="font-semibold text-foreground">
                  more attractive buyer
                </span>
                , and speeds up closing.
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-4">
                What are the costs involved in buying?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Beyond purchase price, budget for{" "}
                <span className="font-semibold text-foreground">
                  closing costs (1.5-4%)
                </span>{" "}
                including notary fees, land transfer taxes, inspection, and
                moving. I'll provide a{" "}
                <span className="font-semibold text-foreground">
                  detailed breakdown
                </span>{" "}
                early on.
              </p>
            </Card>

            <Card className="p-8 border-card-border hover:shadow-lg transition-shadow text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-base font-bold mb-4">
                How do you determine listing price?
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                I conduct{" "}
                <span className="font-semibold text-foreground">
                  comprehensive market analysis
                </span>{" "}
                examining comparable sales, trends, and your property's unique
                features. This ensures{" "}
                <span className="font-semibold text-foreground">
                  competitive pricing that maximizes return
                </span>
                .
              </p>
            </Card>
          </div>

          <div className="mt-12 text-center">
            <Card className="p-8 bg-card/50 border-card-border">
              <h3 className="text-2xl font-bold mb-3">Still Have Questions?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Don't see your question answered here? I'm happy to discuss any
                aspect of buying or selling real estate in Montreal.
              </p>
              <Link href="/contact">
                <Button size="lg" className="h-14 px-8 text-base">
                  Contact Angelo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <MapSection />
    </div>
  );
}
