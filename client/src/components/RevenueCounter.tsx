import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, TrendingDown } from "lucide-react";

interface RevenueCounterProps {
  className?: string;
}

export function RevenueCounter({ className }: RevenueCounterProps) {
  const [revenue, setRevenue] = useState(47580.60);
  const [monthlyGrowth] = useState(23.4);
  const [isIncreasing, setIsIncreasing] = useState(true);

  useEffect(() => {
    // Simulate real-time revenue updates
    const interval = setInterval(() => {
      const change = (Math.random() - 0.3) * 50; // Bias towards positive
      setRevenue(prev => Math.max(0, prev + change));
      setIsIncreasing(change > 0);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className={`hover-elevate ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Revenus du mois</CardTitle>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs">
            En temps réel
          </Badge>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="text-3xl font-bold text-primary">
            ${revenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          
          <div className="flex items-center gap-2">
            {isIncreasing ? (
              <TrendingUp className="h-4 w-4 text-chart-2" />
            ) : (
              <TrendingDown className="h-4 w-4 text-chart-4" />
            )}
            <span className={`text-sm font-medium ${
              monthlyGrowth >= 0 ? 'text-chart-2' : 'text-chart-4'
            }`}>
              +{monthlyGrowth}% ce mois
            </span>
          </div>
          
          <p className="text-xs text-muted-foreground">
            Objectif mensuel: $65,000
          </p>
          
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary to-chart-2 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((revenue / 65000) * 100, 100)}%` }}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}