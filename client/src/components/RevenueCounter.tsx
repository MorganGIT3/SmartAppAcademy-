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
    <>
      <style jsx>{`
        .revenue-led-card {
          background: #1b1b1b;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow:
            0 0 15px rgba(59, 130, 246, 0.4),
            0 0 30px rgba(96, 165, 250, 0.2),
            0 0 45px rgba(59, 130, 246, 0.2);
          padding: 20px;
          width: 100%;
          position: relative;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .revenue-led-card:hover {
          transform: scale(1.02);
          box-shadow:
            0 0 20px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(96, 165, 250, 0.4),
            0 0 60px rgba(59, 130, 246, 0.4);
        }
        .revenue-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          padding: 8px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #3b82f6;
          box-shadow: 0 0 10px rgba(59, 130, 246, 0.6);
        }
      `}</style>
      
      <div className="revenue-led-card">
        <div className="revenue-icon">
          <DollarSign className="w-4 h-4" />
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-1">Revenus du mois</h3>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs">
              En temps réel
            </Badge>
          </div>
          
          <div className="text-3xl font-bold text-blue-400">
            ${revenue.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          
          <div className="flex items-center gap-2">
            {isIncreasing ? (
              <TrendingUp className="h-4 w-4 text-green-400" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-400" />
            )}
            <span className="text-sm font-medium text-green-400">
              +{monthlyGrowth}% ce mois
            </span>
          </div>
          
          <p className="text-xs text-gray-400">
            Objectif mensuel: $65,000
          </p>
          
          <div className="w-full bg-neutral-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-400 h-2 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((revenue / 65000) * 100, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </>
  );
}