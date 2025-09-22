import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  description?: string;
  badge?: string;
  className?: string;
}

export function MetricCard({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  description,
  badge,
  className
}: MetricCardProps) {
  const changeColor = {
    positive: 'text-chart-2',
    negative: 'text-chart-4',
    neutral: 'text-muted-foreground'
  }[changeType];

  return (
    <>
      <style jsx>{`
        .led-card {
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
        .led-card:hover {
          transform: scale(1.02);
          box-shadow:
            0 0 20px rgba(59, 130, 246, 0.6),
            0 0 40px rgba(96, 165, 250, 0.4),
            0 0 60px rgba(59, 130, 246, 0.4);
        }
        .metric-icon {
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
      
      <div className="led-card">
        <div className="metric-icon">
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="space-y-3">
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-1">{title}</h3>
            {badge && (
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-xs mb-2">
                {badge}
              </Badge>
            )}
          </div>
          
          <div className="text-2xl font-bold text-white">{value}</div>
          
          {change && (
            <p className={`text-xs ${changeColor === 'text-chart-2' ? 'text-green-400' : changeColor === 'text-chart-4' ? 'text-red-400' : 'text-gray-400'}`}>
              {change}
            </p>
          )}
          
          {description && (
            <p className="text-xs text-gray-400">
              {description}
            </p>
          )}
        </div>
      </div>
    </>
  );
}