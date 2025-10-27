import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingCallButton } from "@/components/FloatingCallButton";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ScrollToTopButton } from "@/components/ScrollToTopButton";
import Home from "@/pages/Home";
import Properties from "@/pages/Properties";
import PropertyDetail from "@/pages/PropertyDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/Login";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminProperties from "@/pages/admin/Properties";
import AdminLeads from "@/pages/admin/Leads";
import AdminSchedulings from "@/pages/admin/Schedulings";
import NotFound from "@/pages/not-found";

function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {children}
      <Footer />
      <FloatingCallButton />
      <ScrollToTopButton />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Switch>
          {/* Public Routes with Layout */}
          <Route path="/">
            <PublicLayout>
              <Home />
            </PublicLayout>
          </Route>
          <Route path="/properties">
            <PublicLayout>
              <Properties />
            </PublicLayout>
          </Route>
          <Route path="/properties/:id">
            <PublicLayout>
              <PropertyDetail />
            </PublicLayout>
          </Route>
          <Route path="/about">
            <PublicLayout>
              <About />
            </PublicLayout>
          </Route>
          <Route path="/contact">
            <PublicLayout>
              <Contact />
            </PublicLayout>
          </Route>

          {/* Admin Routes without Layout */}
          <Route path="/admin/login" component={AdminLogin} />
          <Route path="/admin/dashboard" component={AdminDashboard} />
          <Route path="/admin/properties" component={AdminProperties} />
          <Route path="/admin/leads" component={AdminLeads} />
          <Route path="/admin/schedulings" component={AdminSchedulings} />

          {/* Fallback to 404 */}
          <Route>
            <PublicLayout>
              <NotFound />
            </PublicLayout>
          </Route>
        </Switch>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
