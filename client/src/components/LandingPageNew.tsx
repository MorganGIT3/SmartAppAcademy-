"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { VerticalCutReveal } from "@/components/ui/vertical-cut-reveal";
import { cn } from "@/lib/utils";
import NumberFlow from "@number-flow/react";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Zap, CheckCircle, Star, Users, BarChart3, Shield, Zap as ZapIcon } from "lucide-react";

const features = [
  {
    title: "Intelligence Artificielle Avancée",
    description: "L'IA la plus puissante pour automatiser vos tâches et optimiser vos processus",
    icon: ZapIcon,
  },
  {
    title: "Analytics en Temps Réel",
    description: "Suivez vos performances avec des métriques précises et des insights actionnables",
    icon: BarChart3,
  },
  {
    title: "Sécurité Enterprise",
    description: "Protection de niveau bancaire pour vos données les plus sensibles",
    icon: Shield,
  },
  {
    title: "Collaboration d'Équipe",
    description: "Travaillez ensemble efficacement avec des outils de collaboration avancés",
    icon: Users,
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "CEO, TechCorp",
    content: "InfoScale a révolutionné notre façon de travailler. L'IA nous fait gagner 10h par semaine !",
    avatar: "SJ",
    rating: 5,
  },
  {
    name: "Marc Dubois",
    role: "Directeur Marketing, InnovateLab",
    content: "Les analytics en temps réel nous ont permis d'augmenter notre ROI de 300%.",
    avatar: "MD",
    rating: 5,
  },
  {
    name: "Emma Chen",
    role: "CTO, StartupXYZ",
    content: "La sécurité et la facilité d'utilisation sont exceptionnelles. Je recommande vivement !",
    avatar: "EC",
    rating: 5,
  },
];

const plans = [
  {
    name: "Starter",
    description: "Parfait pour les petites entreprises qui débutent avec l'IA",
    price: 12,
    yearlyPrice: 99,
    buttonText: "Commencer",
    buttonVariant: "outline" as const,
    includes: [
      "Inclus gratuitement:",
      "Cartes illimitées",
      "Arrière-plans personnalisés",
      "Authentification 2FA",
      "Support par email",
    ],
  },
  {
    name: "Business",
    description: "Meilleure valeur pour les entreprises en croissance",
    price: 48,
    yearlyPrice: 399,
    buttonText: "Commencer",
    buttonVariant: "default" as const,
    popular: true,
    includes: [
      "Tout dans Starter, plus:",
      "Checklists avancées",
      "Champs personnalisés",
      "Fonctions serverless",
      "Support prioritaire",
    ],
  },
  {
    name: "Enterprise",
    description: "Plan avancé avec sécurité renforcée pour les grandes équipes",
    price: 96,
    yearlyPrice: 899,
    buttonText: "Commencer",
    buttonVariant: "outline" as const,
    includes: [
      "Tout dans Business, plus:",
      "Gestion multi-tableaux",
      "Invités multi-tableaux",
      "Permissions d'attachement",
      "Support 24/7",
    ],
  },
];

const PricingSwitch = ({ onSwitch }: { onSwitch: (value: string) => void }) => {
  const [selected, setSelected] = useState("0");

  const handleSwitch = (value: string) => {
    setSelected(value);
    onSwitch(value);
  };

  return (
    <div className="flex justify-center">
      <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
        <button
          onClick={() => handleSwitch("0")}
          className={cn(
            "relative z-10 w-fit h-10 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "0" ? "text-white" : "text-gray-200",
          )}
        >
          {selected === "0" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative">Mensuel</span>
        </button>

        <button
          onClick={() => handleSwitch("1")}
          className={cn(
            "relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-3 sm:py-2 py-1 font-medium transition-colors",
            selected === "1" ? "text-white" : "text-gray-200",
          )}
        >
          {selected === "1" && (
            <motion.span
              layoutId={"switch"}
              className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-2">Annuel</span>
        </button>
      </div>
    </div>
  );
};

export default function LandingPageNew() {
  const [isYearly, setIsYearly] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const pricingRef = useRef<HTMLDivElement>(null);

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.2,
        duration: 0.5,
      },
    }),
    hidden: {
      filter: "blur(10px)",
      y: -20,
      opacity: 0,
    },
  };

  const togglePricingPeriod = (value: string) =>
    setIsYearly(Number.parseInt(value) === 1);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center"
      >
        <TimelineContent
          animationNum={0}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="absolute top-0 h-96 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]"
        >
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]"></div>
        </TimelineContent>

        <TimelineContent
          animationNum={1}
          timelineRef={heroRef}
          customVariants={revealVariants}
          className="absolute left-0 top-[-114px] w-full h-[113.625vh] flex flex-col items-start justify-start content-start flex-none flex-nowrap gap-2.5 overflow-hidden p-0 z-0"
        >
          <div className="framer-1i5axl2">
            <div
              className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
              style={{
                border: "200px solid #3131f5",
                filter: "blur(92px)",
                WebkitFilter: "blur(92px)",
              }}
              data-border="true"
              data-framer-name="Ellipse 1"
            ></div>
            <div
              className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] flex-none rounded-full"
              style={{
                border: "200px solid #3131f5",
                filter: "blur(92px)",
                WebkitFilter: "blur(92px)",
              }}
              data-border="true"
              data-framer-name="Ellipse 2"
            ></div>
          </div>
        </TimelineContent>

        <div className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0"
          style={{
            backgroundImage: `radial-gradient(circle at center, #206ce8 0%, transparent 70%)`,
            opacity: 0.6,
            mixBlendMode: "multiply",
          }}
        />

        <div className="text-center max-w-4xl mx-auto px-6 relative z-50">
          <TimelineContent
            animationNum={2}
            timelineRef={heroRef}
            customVariants={revealVariants}
          >
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.15}
                staggerFrom="first"
                reverse={true}
                containerClassName="justify-center"
                transition={{
                  type: "spring",
                  stiffness: 250,
                  damping: 40,
                  delay: 0,
                }}
              >
                Connecte toi à SmartApp Academy™
              </VerticalCutReveal>
            </h1>
          </TimelineContent>

          <TimelineContent
            animationNum={3}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="text-xl md:text-2xl text-gray-300 mb-8"
          >
            Transformez votre entreprise avec notre plateforme IA de nouvelle génération. 
            Automatisez, analysez et optimisez comme jamais auparavant.
          </TimelineContent>

          <TimelineContent
            animationNum={4}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-800 px-8 py-4 text-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Commencer gratuitement
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Voir la démo
            </Button>
          </TimelineContent>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-32 relative">
        <TimelineContent
          animationNum={0}
          timelineRef={featuresRef}
          customVariants={revealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
            >
              Fonctionnalités puissantes
            </VerticalCutReveal>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Découvrez comment notre IA peut transformer votre façon de travailler
          </p>
        </TimelineContent>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-6">
          {features.map((feature, index) => (
            <TimelineContent
              key={feature.title}
              animationNum={1 + index}
              timelineRef={featuresRef}
              customVariants={revealVariants}
            >
              <Card className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-800 text-white p-6 h-full">
                <CardContent className="p-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-blue-500/20 mb-4">
                    <feature.icon className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} className="py-32 relative">
        <TimelineContent
          animationNum={0}
          timelineRef={testimonialsRef}
          customVariants={revealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
            >
              Ce que disent nos clients
            </VerticalCutReveal>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Rejoignez des milliers d'entreprises qui font confiance à InfoScale
          </p>
        </TimelineContent>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {testimonials.map((testimonial, index) => (
            <TimelineContent
              key={testimonial.name}
              animationNum={1 + index}
              timelineRef={testimonialsRef}
              customVariants={revealVariants}
            >
              <Card className="bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 border-neutral-800 text-white p-6">
                <CardContent className="p-0">
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold mr-3">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingRef} className="py-32 relative">
        <TimelineContent
          animationNum={0}
          timelineRef={pricingRef}
          customVariants={revealVariants}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <VerticalCutReveal
              splitBy="words"
              staggerDuration={0.15}
              staggerFrom="first"
              reverse={true}
              containerClassName="justify-center"
            >
              Plans qui fonctionnent pour vous
            </VerticalCutReveal>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Faites confiance à des millions d'utilisateurs. Nous aidons les équipes du monde entier. 
            Explorez quelle option vous convient le mieux.
          </p>
          <PricingSwitch onSwitch={togglePricingPeriod} />
        </TimelineContent>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {plans.map((plan, index) => (
            <TimelineContent
              key={plan.name}
              animationNum={1 + index}
              timelineRef={pricingRef}
              customVariants={revealVariants}
            >
              <Card
                className={`relative text-white border-neutral-800 ${
                  plan.popular
                    ? "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 shadow-[0px_-13px_300px_0px_#0900ff] z-20"
                    : "bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-900 z-10"
                }`}
              >
                <CardHeader className="text-left">
                  <div className="flex justify-between">
                    <h3 className="text-3xl mb-2">{plan.name}</h3>
                    {plan.popular && (
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Populaire
                      </span>
                    )}
                  </div>
                  <div className="flex items-baseline">
                    <span className="text-4xl font-semibold">
                      €
                      <NumberFlow
                        format={{
                          currency: "EUR",
                        }}
                        value={isYearly ? plan.yearlyPrice : plan.price}
                        className="text-4xl font-semibold"
                      />
                    </span>
                    <span className="text-gray-300 ml-1">
                      /{isYearly ? "an" : "mois"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{plan.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <button
                    className={`w-full mb-6 p-4 text-xl rounded-xl ${
                      plan.popular
                        ? "bg-gradient-to-t from-blue-500 to-blue-600 shadow-lg shadow-blue-800 border border-blue-500 text-white"
                        : plan.buttonVariant === "outline"
                          ? "bg-gradient-to-t from-neutral-950 to-neutral-600 shadow-lg shadow-neutral-900 border border-neutral-800 text-white"
                          : ""
                    }`}
                  >
                    {plan.buttonText}
                  </button>

                  <div className="space-y-3 pt-4 border-t border-neutral-700">
                    <h4 className="font-medium text-base mb-3">
                      {plan.includes[0]}
                    </h4>
                    <ul className="space-y-2">
                      {plan.includes.slice(1).map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-blue-400" />
                          <span className="text-sm text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TimelineContent>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative">
        <div className="text-center max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Prêt à transformer votre entreprise ?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Rejoignez des milliers d'entreprises qui font déjà confiance à InfoScale
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-t from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-blue-500 shadow-lg shadow-blue-800 px-8 py-4 text-lg"
            >
              <Zap className="mr-2 h-5 w-5" />
              Commencer maintenant
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="bg-transparent border-gray-600 text-white hover:bg-white/10 px-8 py-4 text-lg"
            >
              Contacter les ventes
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
