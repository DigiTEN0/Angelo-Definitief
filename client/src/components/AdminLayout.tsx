import { useEffect } from "react";
import { useLocation, Link } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Home as HomeIcon, Users, LogOut, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Properties",
    url: "/admin/properties",
    icon: HomeIcon,
  },
  {
    title: "Leads",
    url: "/admin/leads",
    icon: Users,
  },
  {
    title: "Schedulings",
    url: "/admin/schedulings",
    icon: Calendar,
  },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("admin_authenticated") === "true";
    if (!isAuthenticated && !location.includes("/admin/login")) {
      setLocation("/admin/login");
    }
  }, [location, setLocation]);

  const handleLogout = () => {
    localStorage.removeItem("admin_authenticated");
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    setLocation("/admin/login");
  };

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-4 py-4">
                <div className="flex flex-col mb-[10px] mt-[10px]">
                  <span className="font-serif text-lg font-bold text-primary">Angelo Randazzo Inc</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wider">Admin Dashboard</span>
                </div>
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild isActive={location === item.url}>
                        <Link href={item.url}>
                          <span className="flex items-center gap-3" data-testid={`link-${item.title.toLowerCase()}`}>
                            <item.icon className="w-4 h-4" />
                            <span>{item.title}</span>
                          </span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={handleLogout}
                data-testid="button-logout"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <a href="/" target="_blank" rel="noopener noreferrer">
              <Button variant="ghost" size="sm">
                View Website →
              </Button>
            </a>
          </header>
          <main className="flex-1 overflow-auto bg-background">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
