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
import type { Lead } from "@shared/schema";
import { Mail, Phone, MessageSquare, Calendar, Filter, Trash2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function AdminLeads() {
  const { toast } = useToast();
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const { data: leads, isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await apiRequest("PATCH", `/api/leads/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({ title: "Success", description: "Lead status updated" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to update lead status", variant: "destructive" });
    },
  });

  const deleteLeadMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/leads/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      toast({ title: "Success", description: "Lead deleted" });
    },
    onError: () => {
      toast({ title: "Error", description: "Failed to delete lead", variant: "destructive" });
    },
  });

  const filteredLeads = leads?.filter(lead => 
    statusFilter === "all" || lead.status === statusFilter
  ).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'contacted':
        return 'bg-accent/10 text-accent-foreground border-accent/20';
      case 'qualified':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'closed':
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
            <h1 className="font-serif text-2xl md:text-4xl font-bold mb-2">Leads</h1>
            <p className="text-sm md:text-base text-muted-foreground">Manage your contact form submissions</p>
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48" data-testid="select-filter">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Leads</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="contacted">Contacted</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {isLoading ? (
          <Card className="p-6 md:p-8 text-center">Loading...</Card>
        ) : filteredLeads && filteredLeads.length > 0 ? (
          <div className="space-y-3 md:space-y-4">
            {filteredLeads.map((lead) => (
              <Card key={lead.id} className="p-4 md:p-6 border-card-border" data-testid={`lead-card-${lead.id}`}>
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <h3 className="font-semibold text-lg" data-testid={`text-name-${lead.id}`}>{lead.name}</h3>
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                        <Button 
                          variant="destructive" 
                          size="sm"
                          className="md:hidden ml-auto"
                          onClick={() => {
                            if (confirm('Are you sure you want to delete this lead?')) {
                              deleteLeadMutation.mutate(lead.id);
                            }
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4 flex-shrink-0" />
                          <a href={`mailto:${lead.email}`} className="hover:text-primary">
                            {lead.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4 flex-shrink-0" />
                          <a href={`tel:${lead.phone}`} className="hover:text-primary">
                            {lead.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4 flex-shrink-0" />
                          <span>{new Date(lead.createdAt).toLocaleString()}</span>
                        </div>
                      </div>

                      {lead.propertyInterest && (
                        <div className="mb-3">
                          <span className="text-sm font-medium">Interest: </span>
                          <span className="text-sm text-muted-foreground">{lead.propertyInterest}</span>
                        </div>
                      )}

                      <div className="bg-muted/50 p-4 rounded-md">
                        <div className="flex items-start gap-2 mb-2">
                          <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span className="text-sm font-medium">Message:</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line" data-testid={`text-message-${lead.id}`}>
                          {lead.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-4 border-t">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium">Status:</span>
                      <Select
                        value={lead.status}
                        onValueChange={(status) => updateStatusMutation.mutate({ id: lead.id, status })}
                      >
                        <SelectTrigger className="w-full sm:w-40" data-testid={`select-status-${lead.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="contacted">Contacted</SelectItem>
                          <SelectItem value="qualified">Qualified</SelectItem>
                          <SelectItem value="closed">Closed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-2 ml-auto w-full sm:w-auto">
                      <a href={`mailto:${lead.email}`} className="flex-1">
                        <Button variant="outline" size="sm" className="w-full">
                          <Mail className="w-4 h-4 mr-2" />
                          Email
                        </Button>
                      </a>
                      <a href={`tel:${lead.phone}`} className="flex-1">
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
                          if (confirm('Are you sure you want to delete this lead?')) {
                            deleteLeadMutation.mutate(lead.id);
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
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h3 className="text-xl font-semibold mb-2">No leads found</h3>
            <p className="text-muted-foreground">
              {statusFilter !== "all" 
                ? "Try changing the filter to see more leads" 
                : "Leads from your contact forms will appear here"}
            </p>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}
