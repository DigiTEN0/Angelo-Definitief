import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Property } from "@shared/schema";
import { PropertyCard } from "@/components/PropertyCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { MapSection } from "@/components/MapSection";

export default function Properties() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bedroomFilter, setBedroomFilter] = useState<string>("all");
  const [priceSort, setPriceSort] = useState<string>("desc");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const filteredProperties = properties
    ?.filter((property) => {
      const matchesSearch =
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || property.status === statusFilter;
      const matchesBedrooms =
        bedroomFilter === "all" || property.bedrooms >= parseInt(bedroomFilter);

      return matchesSearch && matchesStatus && matchesBedrooms;
    })
    .sort((a, b) => {
      const priceA = parseFloat(a.price);
      const priceB = parseFloat(b.price);
      return priceSort === "asc" ? priceA - priceB : priceB - priceA;
    });

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">
            Browse Properties
          </h1>
          <p className="propertyText">
            Discover exceptional properties in Montreal's most sought-after
            neighborhoods
          </p>
        </div>

        {/* Filters */}
        <Card className="p-6 mb-12 border-card-border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 h-12"
                  data-testid="input-search"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12" data-testid="select-status">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
              </SelectContent>
            </Select>

            <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
              <SelectTrigger className="h-12" data-testid="select-bedrooms">
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Bedrooms</SelectItem>
                <SelectItem value="1">1+ Bedrooms</SelectItem>
                <SelectItem value="2">2+ Bedrooms</SelectItem>
                <SelectItem value="3">3+ Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceSort} onValueChange={setPriceSort}>
              <SelectTrigger className="h-12" data-testid="select-price-sort">
                <SelectValue placeholder="Sort by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Price: High to Low</SelectItem>
                <SelectItem value="asc">Price: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {(searchTerm ||
            statusFilter !== "all" ||
            bedroomFilter !== "all") && (
            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Found {filteredProperties?.length || 0} properties
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setStatusFilter("all");
                  setBedroomFilter("all");
                }}
                data-testid="button-clear-filters"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Card>

        {/* Properties Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="h-[480px] animate-pulse bg-muted" />
            ))}
          </div>
        ) : filteredProperties && filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <SlidersHorizontal className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or search criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setBedroomFilter("all");
              }}
              data-testid="button-reset"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>

      {/* Google Maps Embed */}
      <MapSection />
    </div>
  );
}
