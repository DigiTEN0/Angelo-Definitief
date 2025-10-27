import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Property, InsertProperty } from "@shared/schema";
import { Plus, Pencil, Trash2, ImagePlus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPropertySchema } from "@shared/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function AdminProperties() {
  const { toast } = useToast();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [newFeature, setNewFeature] = useState("");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const form = useForm<InsertProperty>({
    resolver: zodResolver(insertPropertySchema),
    defaultValues: {
      title: "",
      description: "",
      price: "",
      address: "",
      city: "Montreal",
      province: "Quebec",
      bedrooms: 1,
      bathrooms: 1,
      squareFeet: 1000,
      lotSize: undefined,
      yearBuilt: undefined,
      status: "active",
      features: [],
      images: [],
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertProperty) => {
      return await apiRequest("POST", "/api/properties", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Success", description: "Property created successfully" });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to create property", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: InsertProperty }) => {
      return await apiRequest("PATCH", `/api/properties/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Success", description: "Property updated successfully" });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update property", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/properties/${id}`, {});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/properties"] });
      toast({ title: "Success", description: "Property deleted successfully" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete property", variant: "destructive" });
    },
  });

  const handleOpenDialog = (property?: Property) => {
    if (property) {
      setEditingProperty(property);
      form.reset({
        title: property.title,
        description: property.description,
        price: property.price,
        address: property.address,
        city: property.city,
        province: property.province,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        squareFeet: property.squareFeet,
        lotSize: property.lotSize || undefined,
        yearBuilt: property.yearBuilt || undefined,
        status: property.status as "active" | "pending" | "sold",
        features: property.features,
        images: property.images,
      });
      setImageUrls(property.images);
      setFeatures(property.features);
    } else {
      setEditingProperty(null);
      form.reset();
      setImageUrls([]);
      setFeatures([]);
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProperty(null);
    form.reset();
    setImageUrls([]);
    setFeatures([]);
    setNewFeature("");
  };

  const addImageUrl = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      setImageUrls([...imageUrls, url]);
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()]);
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const onSubmit = (data: InsertProperty) => {
    const propertyData = {
      ...data,
      images: imageUrls,
      features: features,
    };

    if (editingProperty) {
      updateMutation.mutate({ id: editingProperty.id, data: propertyData });
    } else {
      createMutation.mutate(propertyData);
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-4xl font-bold mb-2">Properties</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your property listings</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} data-testid="button-add-property" className="w-full sm:w-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] md:w-full">
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {editingProperty ? "Edit Property" : "Add New Property"}
                </DialogTitle>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} className="min-h-32" data-testid="input-description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="500000" data-testid="input-price" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Status</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger data-testid="select-status">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="sold">Sold</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-address" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-city" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="province"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Province</FormLabel>
                          <FormControl>
                            <Input {...field} data-testid="input-province" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="bedrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bedrooms</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" onChange={e => field.onChange(parseInt(e.target.value))} data-testid="input-bedrooms" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="bathrooms"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bathrooms</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" onChange={e => field.onChange(parseInt(e.target.value))} data-testid="input-bathrooms" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="squareFeet"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Square Feet</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" onChange={e => field.onChange(parseInt(e.target.value))} data-testid="input-sqft" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="lotSize"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Lot Size (optional)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="yearBuilt"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Year Built (optional)</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)} value={field.value || ""} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Images */}
                  <div>
                    <Label>Images</Label>
                    <div className="mt-2 space-y-2">
                      {imageUrls.map((url, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={url} readOnly className="flex-1" />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeImage(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" onClick={addImageUrl} className="w-full">
                        <ImagePlus className="w-4 h-4 mr-2" />
                        Add Image URL
                      </Button>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <Label>Features</Label>
                    <div className="mt-2 space-y-2">
                      {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Input value={feature} readOnly className="flex-1" />
                          <Button type="button" variant="destructive" size="sm" onClick={() => removeFeature(index)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <Input
                          value={newFeature}
                          onChange={(e) => setNewFeature(e.target.value)}
                          placeholder="Enter feature"
                          onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        />
                        <Button type="button" onClick={addFeature}>Add</Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="submit"
                      disabled={createMutation.isPending || updateMutation.isPending}
                      className="flex-1"
                      data-testid="button-save"
                    >
                      {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Property"}
                    </Button>
                    <Button type="button" variant="outline" onClick={handleCloseDialog}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <Card className="p-6 md:p-8 text-center">Loading...</Card>
        ) : properties && properties.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {properties.map((property) => (
              <Card key={property.id} className="p-4 md:p-6 border-card-border" data-testid={`property-card-${property.id}`}>
                <div className="flex flex-col sm:flex-row items-start justify-between gap-3">
                  <div className="flex-1 w-full">
                    <h3 className="font-serif text-lg md:text-xl font-semibold mb-2">{property.title}</h3>
                    <p className="text-sm md:text-base text-muted-foreground mb-2">{property.address}, {property.city}</p>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm">
                      <span className="font-semibold text-primary">
                        ${parseFloat(property.price).toLocaleString()}
                      </span>
                      <span>{property.bedrooms} bed</span>
                      <span>{property.bathrooms} bath</span>
                      <span>{property.squareFeet.toLocaleString()} sqft</span>
                      <span className="capitalize px-2 py-1 bg-muted rounded text-xs">{property.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenDialog(property)}
                      data-testid={`button-edit-${property.id}`}
                      className="flex-1 sm:flex-none"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this property?")) {
                          deleteMutation.mutate(property.id);
                        }
                      }}
                      data-testid={`button-delete-${property.id}`}
                      className="flex-1 sm:flex-none"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-8 md:p-12 text-center">
            <p className="text-sm md:text-base text-muted-foreground mb-4">No properties yet</p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Property
            </Button>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
