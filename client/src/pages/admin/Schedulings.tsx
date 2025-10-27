import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Viewing } from "@shared/schema";
import { Mail, Phone, Calendar, Filter, Clock, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminSchedulings() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: viewings, isLoading } = useQuery<Viewing[]>({
    queryKey: ["/api/viewings"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/viewings/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/viewings"] });
      toast({ title: "Success", description: "Viewing status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update viewing status", variant: "destructive" });
    },
  });

  const deleteViewingMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/viewings/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/viewings"] });
      toast({ title: "Success", description: "Viewing deleted" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete viewing", variant: "destructive" });
    },
  });

  const filteredViewings = viewings?.filter(viewing => 
    statusFilter === "all" || viewing.status === statusFilter
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'confirmed':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'completed':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'cancelled':
        return 'bg-muted text-muted-foreground border-muted/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 gap-3">
          <div>
            <h1 className="font-serif text-2xl md:text-4xl font-bold mb-2">Viewing Schedulings</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage property viewing appointments</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Viewings</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="confirmed">Confirmed</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <Card className="p-6 md:p-8 text-center">Loading...</Card>
        ) : filteredViewings && filteredViewings.length > 0 ? (
          <div className="space-y-3 md:space-y-4">
            {filteredViewings.map((viewing) => (
              <Card key={viewing.id} className="p-4 md:p-6 border-card-border">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="font-semibold text-base md:text-lg">{viewing.name}</h3>
                        <Badge className={getStatusColor(viewing.status)}>
                          {viewing.status}
                        </Badge>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="md:hidden ml-auto"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this viewing?')) {
                              deleteViewingMutation.mutate(viewing.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <a href={`mailto:${viewing.email}`} className="hover:text-primary break-all">
                            {viewing.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <a href={`tel:${viewing.phone}`} className="hover:text-primary">
                            {viewing.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{new Date(viewing.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {(viewing.preferredDate || viewing.preferredTime) && (
                        <div className="mb-3 flex flex-wrap items-center gap-4">
                          {viewing.preferredDate && (
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-primary" />
                              <span className="font-medium">Preferred Date: </span>
                              <span className="text-muted-foreground">{viewing.preferredDate}</span>
                            </div>
                          )}
                          {viewing.preferredTime && (
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-primary" />
                              <span className="font-medium">Preferred Time: </span>
                              <span className="text-muted-foreground">{viewing.preferredTime}</span>
                            </div>
                          )}
                        </div>
                      )}

                      {viewing.message && (
                        <div className="bg-muted/50 p-4 rounded-md mb-3">
                          <p className="text-sm font-medium mb-1">Additional Message:</p>
                          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                            {viewing.message}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">Status:</span>
                      <Select
                        value={viewing.status}
                        onValueChange={(status) => updateStatusMutation.mutate({ id: viewing.id, status })}
                      >
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 ml-auto w-full sm:w-auto">
                      <a href={`mailto:${viewing.email}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                      </a>
                      <a href={`tel:${viewing.phone}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                      </a>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        className="hidden md:block"
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this viewing?')) {
                            deleteViewingMutation.mutate(viewing.id);
                          }
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No viewings found</h3>
            <p className="text-muted-foreground">
              {statusFilter !== "all" 
                ? "Try changing the filter to see more viewings" 
                : "Viewing requests will appear here"}
            </p>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
