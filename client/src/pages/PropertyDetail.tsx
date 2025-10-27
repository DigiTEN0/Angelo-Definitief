import { useParams, Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import type { Property, InsertViewing } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/ContactForm";
import { 
  ArrowLeft, 
  Bed, 
  Bath, 
  Maximize2, 
  MapPin, 
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye
} from "lucide-react";
import { useState } from "react";
import angeloHeadshot from "@assets/generated_images/Angelo_Randazzo_professional_headshot_92ad9969.png";
import { MapSection } from "@/components/MapSection";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function PropertyDetail() {
  const params = useParams();
  const propertyId = params.id;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isViewingDialogOpen, setIsViewingDialogOpen] = useState(false);
  const [viewingForm, setViewingForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: ""
  });
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const { toast } = useToast();

  const { data: property, isLoading } = useQuery<Property>({
    queryKey: ["/api/properties", propertyId],
    enabled: !!propertyId,
  });

  const createViewingMutation = useMutation({
    mutationFn: async (data: InsertViewing) => {
      return await apiRequest("POST", "/api/viewings", data);
    },
    onSuccess: () => {
      toast({
        title: "Viewing Scheduled!",
        description: "Angelo will contact you to confirm this booking!",
      });
      setIsViewingDialogOpen(false);
      setViewingForm({
        name: "",
        email: "",
        phone: "",
        preferredDate: "",
        preferredTime: "",
        message: ""
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to schedule viewing. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleViewingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    
    createViewingMutation.mutate({
      propertyId: property.id,
      name: viewingForm.name,
      email: viewingForm.email,
      phone: viewingForm.phone,
      preferredDate: viewingForm.preferredDate || undefined,
      preferredTime: viewingForm.preferredTime || undefined,
      message: viewingForm.message || undefined,
    });
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextImage();
    }
    if (isRightSwipe) {
      prevImage();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-6">
          <Card className="h-96 animate-pulse bg-muted" />
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen py-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
          <Link href="/properties">
            <Button>Back to Properties</Button>
          </Link>
        </div>
      </div>
    );
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const images = property.images.length > 0 ? property.images : ['/placeholder-property.jpg'];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Back Button */}
        <Link href="/properties">
          <Button variant="ghost" className="mb-4" data-testid="button-back">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </Link>

        {/* Image Gallery */}
        <div className="mb-8">
          <div 
            className="relative aspect-[16/9] overflow-hidden rounded-md mb-4"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <img
              src={images[currentImageIndex]}
              alt={`${property.title} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              data-testid="img-main"
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center hover-elevate"
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/90 hover:bg-white flex items-center justify-center hover-elevate"
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Grid */}
          {images.length > 1 && (
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square overflow-hidden rounded-md transition-all hover-elevate ${
                    index === currentImageIndex ? "ring-2 ring-primary" : ""
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2" data-testid="text-title">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4" />
                    <span data-testid="text-address">{property.address}, {property.city}, {property.province}</span>
                  </div>
                </div>
                <Badge className={property.status === 'active' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-muted text-muted-foreground'}>
                  {property.status}
                </Badge>
              </div>
              <p className="font-serif text-4xl font-bold text-primary mb-6" data-testid="text-price">
                {formatPrice(property.price)}
              </p>
            </div>

            {/* Key Details */}
            <Card className="p-6 border-card-border">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <Bed className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold mb-1">{property.bedrooms}</p>
                  <p className="text-sm text-muted-foreground">Bedrooms</p>
                </div>
                <div className="text-center">
                  <Bath className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold mb-1">{property.bathrooms}</p>
                  <p className="text-sm text-muted-foreground">Bathrooms</p>
                </div>
                <div className="text-center">
                  <Maximize2 className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold mb-1">{property.squareFeet.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Sq Ft</p>
                </div>
                {property.yearBuilt && (
                  <div className="text-center">
                    <CalendarIcon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-2xl font-bold mb-1">{property.yearBuilt}</p>
                    <p className="text-sm text-muted-foreground">Year Built</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Description */}
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-4">Description</h2>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-description">
                {property.description}
              </p>
            </div>

            {/* Features */}
            {property.features.length > 0 && (
              <div>
                <h2 className="font-serif text-2xl font-semibold mb-4">Features & Amenities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24">
              <Card className="p-6 border-card-border">
                <h3 className="font-serif text-2xl font-semibold mb-6">Interested in this property?</h3>
                <ContactForm 
                  propertyId={property.id}
                  propertyTitle={property.title}
                />
              </Card>

              <Card className="p-6 border-card-border mt-6">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={angeloHeadshot}
                    alt="Angelo Randazzo"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">Angelo Randazzo</h4>
                    <p className="text-sm text-muted-foreground">Licensed Broker</p>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <Dialog open={isViewingDialogOpen} onOpenChange={setIsViewingDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="w-full">
                        <Eye className="w-4 h-4 mr-2" />
                        Schedule a Viewing
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md w-[95vw] md:w-full max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="font-serif text-xl md:text-2xl">Schedule a Viewing</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleViewingSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="viewing-name">Name *</Label>
                          <Input
                            id="viewing-name"
                            value={viewingForm.name}
                            onChange={(e) => setViewingForm({...viewingForm, name: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="viewing-email">Email *</Label>
                          <Input
                            id="viewing-email"
                            type="email"
                            value={viewingForm.email}
                            onChange={(e) => setViewingForm({...viewingForm, email: e.target.value})}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="viewing-phone">Phone Number *</Label>
                          <Input
                            id="viewing-phone"
                            type="tel"
                            value={viewingForm.phone}
                            onChange={(e) => setViewingForm({...viewingForm, phone: e.target.value})}
                            required
                          />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="viewing-date">Preferred Date</Label>
                            <Input
                              id="viewing-date"
                              type="date"
                              value={viewingForm.preferredDate}
                              onChange={(e) => setViewingForm({...viewingForm, preferredDate: e.target.value})}
                            />
                          </div>
                          <div>
                            <Label htmlFor="viewing-time">Preferred Time</Label>
                            <Input
                              id="viewing-time"
                              type="time"
                              value={viewingForm.preferredTime}
                              onChange={(e) => setViewingForm({...viewingForm, preferredTime: e.target.value})}
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="viewing-message">Additional Message</Label>
                          <Textarea
                            id="viewing-message"
                            value={viewingForm.message}
                            onChange={(e) => setViewingForm({...viewingForm, message: e.target.value})}
                            className="min-h-24"
                          />
                        </div>
                        <div className="flex gap-3">
                          <Button
                            type="submit"
                            disabled={createViewingMutation.isPending}
                            className="flex-1"
                          >
                            {createViewingMutation.isPending ? "Scheduling..." : "Schedule Viewing"}
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsViewingDialogOpen(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <a href="tel:5149107370">
                    <Button variant="outline" className="w-full justify-start">
                      Call (514) 910-7370
                    </Button>
                  </a>
                  <a href="mailto:angelo_randazzo@hotmail.com">
                    <Button variant="outline" className="w-full justify-start">
                      Send Email
                    </Button>
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Google Maps Embed */}
      <MapSection />
    </div>
  );
}
