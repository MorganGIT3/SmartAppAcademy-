import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

const benefits = [
  "14-day free trial",
  "No credit card required",
  "Cancel anytime",
  "Full feature access"
];

export function CTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Ready to 
          <span className="text-primary"> Scale Your Business?</span>
        </h2>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of successful infopreneurs who are already using our platform 
          to optimize their content and maximize their revenue.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-chart-2" />
              <span className="text-muted-foreground">{benefit}</span>
            </div>
          ))}
        </div>
        
        <Button 
          size="lg" 
          className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
          data-testid="button-signup-cta"
        >
          Start Your Free Trial
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
        
        <p className="text-sm text-muted-foreground mt-4">
          Start seeing results in less than 24 hours
        </p>
      </div>
    </section>
  );
}