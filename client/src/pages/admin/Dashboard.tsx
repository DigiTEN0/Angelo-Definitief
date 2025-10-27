import { AdminLayout } from "@/components/AdminLayout";
import { Card } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import type { Property, Lead, Viewing } from "@shared/schema";
import { Home, Users, TrendingUp, Calendar } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
  const { data: properties } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const { data: leads } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
  });

  const { data: viewings } = useQuery<Viewing[]>({
    queryKey: ["/api/viewings"],
  });

  const activeProperties = properties?.filter(p => p.status === 'active').length || 0;
  const totalLeads = leads?.length || 0;
  const clients = leads?.filter(l => l.status === 'qualified').length || 0;
  const schedulings = viewings?.length || 0;

  const recentLeads = leads?.slice(0, 5) || [];

  return (
    <AdminLayout>
      <div className="p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="font-serif text-2xl md:text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-sm md:text-base text-muted-foreground">Welcome back, Angelo. Here's your overview.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-6 md:mb-8">
          <Link href="/admin/properties">
            <Card className="p-3 md:p-6 border-card-border hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-md bg-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 md:w-6 md:h-6 text-accent-foreground" />
                </div>
              </div>
              <p className="text-xl md:text-3xl font-bold mb-1">{activeProperties}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Active Listings</p>
            </Card>
          </Link>

          <Link href="/admin/leads">
            <Card className="p-3 md:p-6 border-card-border hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <p className="text-xl md:text-3xl font-bold mb-1">{totalLeads}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Leads</p>
            </Card>
          </Link>

          <Link href="/admin/schedulings">
            <Card className="p-3 md:p-6 border-card-border hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Calendar className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <p className="text-xl md:text-3xl font-bold mb-1">{schedulings}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Schedulings</p>
            </Card>
          </Link>

          <Link href="/admin/leads">
            <Card className="p-3 md:p-6 border-card-border hover:shadow-lg transition-shadow cursor-pointer bg-primary/5">
              <div className="flex items-center justify-between mb-2 md:mb-4">
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-md bg-primary/10 flex items-center justify-center">
                  <Users className="w-4 h-4 md:w-6 md:h-6 text-primary" />
                </div>
              </div>
              <p className="text-xl md:text-3xl font-bold mb-1">{clients}</p>
              <p className="text-xs md:text-sm text-muted-foreground">Clients</p>
            </Card>
          </Link>
        </div>

        {/* Recent Leads */}
        <Card className="p-4 md:p-6 border-card-border">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 md:mb-6 gap-3">
            <h2 className="font-serif text-xl md:text-2xl font-semibold">Recent Leads</h2>
            <Link href="/admin/leads">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </div>

          {recentLeads.length > 0 ? (
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="flex flex-col sm:flex-row items-start justify-between p-3 md:p-4 rounded-md bg-muted/50 hover-elevate gap-3">
                  <div className="flex-1 w-full">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2">
                      <p className="font-semibold text-sm md:text-base">{lead.name}</p>
                      {lead.status === 'new' && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-destructive/10 text-destructive rounded-full">
                          New
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1">
                      <a href={`mailto:${lead.email}`} className="text-xs md:text-sm text-muted-foreground hover:text-primary break-all">
                        {lead.email}
                      </a>
                      <a href={`tel:${lead.phone}`} className="text-xs md:text-sm text-muted-foreground hover:text-primary">
                        {lead.phone}
                      </a>
                    </div>
                    <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">{lead.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground whitespace-nowrap sm:ml-4">
                    {new Date(lead.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No leads yet</p>
            </div>
          )}
        </Card>
      </div>
    </AdminLayout>
  );
}
