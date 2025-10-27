import { Property } from "@shared/schema";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bed, Bath, Maximize2 } from "lucide-react";
import { Link } from "wouter";

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
    }).format(parseFloat(price));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'pending':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'sold':
        return 'bg-muted text-muted-foreground border-muted/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const mainImage = property.images[0] || '/placeholder-property.jpg';

  return (
    <Link href={`/properties/${property.id}`}>
      <Card 
        className="overflow-hidden hover-elevate transition-all duration-300 cursor-pointer group border-card-border"
        data-testid={`card-property-${property.id}`}
      >
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={mainImage}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            data-testid={`img-property-${property.id}`}
          />
          <div className="absolute top-4 left-4">
            <Badge className={`${getStatusColor(property.status)} font-sans text-xs uppercase tracking-wider`}>
              {property.status}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <span className="text-white font-sans text-sm uppercase tracking-wide">View Details</span>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <p className="font-serif text-2xl font-semibold text-primary mb-1" data-testid={`text-price-${property.id}`}>
              {formatPrice(property.price)}
            </p>
            <h3 className="font-serif text-xl font-semibold mb-1 line-clamp-1" data-testid={`text-title-${property.id}`}>
              {property.title}
            </h3>
            <p className="text-sm text-muted-foreground" data-testid={`text-address-${property.id}`}>
              {property.address}, {property.city}
            </p>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms} bd</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms} ba</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="w-4 h-4" />
              <span>{property.squareFeet.toLocaleString()} sqft</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
