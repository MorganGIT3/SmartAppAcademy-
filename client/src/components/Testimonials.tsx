import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import femalePortrait from "@assets/generated_images/Female_entrepreneur_testimonial_portrait_912ecb5c.png";
import malePortrait from "@assets/generated_images/Male_entrepreneur_testimonial_portrait_3838af23.png";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Digital Marketing Consultant",
    company: "Growth Labs",
    avatar: femalePortrait,
    rating: 5,
    quote: "This platform transformed how I track my content performance. The AI insights helped me increase my conversion rate by 300% in just 3 months."
  },
  {
    name: "Marcus Rodriguez",
    role: "Online Course Creator",
    company: "Skill Mastery",
    avatar: malePortrait,
    rating: 5,
    quote: "The revenue tracking and funnel analysis features are game-changers. I can finally see exactly which content drives the most sales."
  },
  {
    name: "Jessica Thompson",
    role: "Social Media Strategist",
    company: "Viral Studios",
    avatar: femalePortrait,
    rating: 5,
    quote: "The content calendar and performance leaderboard keep me organized and motivated. My clients love the detailed reports I can generate."
  }
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Trusted by 
            <span className="text-primary">10,000+ Entrepreneurs</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our platform is helping infopreneurs worldwide scale their businesses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover-elevate border-card-border bg-card">
              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-chart-3 text-chart-3" />
                  ))}
                </div>
                
                <blockquote className="text-card-foreground mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-card-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}