import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLeadSchema, type InsertLead } from "@shared/schema";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Send } from "lucide-react";

interface ContactFormProps {
  propertyId?: string;
  propertyTitle?: string;
  className?: string;
}

export function ContactForm({ propertyId, propertyTitle, className = "" }: ContactFormProps) {
  const { toast } = useToast();

  const form = useForm<InsertLead>({
    resolver: zodResolver(insertLeadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      propertyId: propertyId || undefined,
      propertyInterest: propertyTitle || "General Inquiry",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: InsertLead) => {
      return await apiRequest("POST", "/api/leads", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thank you for your inquiry. Angelo will get back to you shortly.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: InsertLead) => {
    mutation.mutate(data);
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium uppercase tracking-wider">Full Name</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Your name" 
                    {...field} 
                    data-testid="input-name"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium uppercase tracking-wider">Email</FormLabel>
                <FormControl>
                  <Input 
                    type="email" 
                    placeholder="your@email.com" 
                    {...field}
                    data-testid="input-email"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium uppercase tracking-wider">Phone</FormLabel>
                <FormControl>
                  <Input 
                    type="tel" 
                    placeholder="(514) 123-4567" 
                    {...field}
                    data-testid="input-phone"
                    className="h-12"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!propertyId && (
            <FormField
              control={form.control}
              name="propertyInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium uppercase tracking-wider">I'm Interested In</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value || undefined}>
                    <FormControl>
                      <SelectTrigger data-testid="select-interest" className="h-12">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="General Inquiry">General Inquiry</SelectItem>
                      <SelectItem value="Buying a Property">Buying a Property</SelectItem>
                      <SelectItem value="Selling a Property">Selling a Property</SelectItem>
                      <SelectItem value="Property Valuation">Property Valuation</SelectItem>
                      <SelectItem value="Investment Opportunities">Investment Opportunities</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium uppercase tracking-wider">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell me about your real estate needs..."
                    className="min-h-32 resize-none"
                    {...field}
                    data-testid="input-message"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button 
            type="submit" 
            className="w-full h-12 text-base font-semibold uppercase tracking-wide"
            disabled={mutation.isPending}
            data-testid="button-submit"
          >
            {mutation.isPending ? (
              "Sending..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </>
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
