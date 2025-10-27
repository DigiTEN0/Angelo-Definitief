import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Hardcoded credentials check
    if (email === "angelo_randazzo@hotmail.com" && password === "Angelo514") {
      localStorage.setItem("admin_authenticated", "true");
      toast({
        title: "Welcome back!",
        description: "Successfully logged in to the admin dashboard.",
      });
      setLocation("/admin/dashboard");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid email or password.",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 py-12 px-6">
      <Card className="w-full max-w-md p-8 border-card-border">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-md bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-2">Admin Login</h1>
          <p className="text-sm text-muted-foreground">
            Access your property management dashboard
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium uppercase tracking-wider">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              className="mt-2 h-12"
              data-testid="input-email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="text-sm font-medium uppercase tracking-wider">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="mt-2 h-12"
              data-testid="input-password"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-12 text-base font-semibold uppercase tracking-wide"
            disabled={isLoading}
            data-testid="button-login"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            ← Back to Website
          </a>
        </div>
      </Card>
    </div>
  );
}
