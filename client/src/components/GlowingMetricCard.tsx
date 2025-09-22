"use client";
import { LucideIcon } from 'lucide-react';

interface GlowingMetricCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  chartData?: number[];
  timeLabels?: string[];
}

export function GlowingMetricCard({ 
  title, 
  value, 
  icon: Icon, 
  chartData = [20, 45, 30, 60, 40, 80, 55],
  timeLabels = ['8am', '10am', '12pm', '2pm', '4pm', '6pm']
}: GlowingMetricCardProps) {
  
  // Générer les points pour la courbe SVG
  const generatePath = (data: number[]) => {
    const width = 320;
    const height = 80;
    const points = data.map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - (value / 100) * height;
      return `${x},${y}`;
    });
    
    return `M ${points.join(' L ')}`;
  };

  return (
    <>
      <style jsx>{`
        .glowing-card {
          background: #1b1b1b;
          border-radius: 20px;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow:
            0 0 15px rgba(59, 130, 246, 0.5),
            0 0 30px rgba(96, 165, 250, 0.3),
            0 0 45px rgba(59, 130, 246, 0.3),
            0 0 60px rgba(96, 165, 250, 0.5);
          padding: 20px;
          width: 100%;
          position: relative;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }
        .glowing-card:hover {
          transform: scale(1.02);
          box-shadow:
            0 0 20px rgba(59, 130, 246, 0.7),
            0 0 40px rgba(96, 165, 250, 0.5),
            0 0 60px rgba(59, 130, 246, 0.5),
            0 0 80px rgba(96, 165, 250, 0.7);
        }
        .metric-icon {
          position: absolute;
          top: 15px;
          right: 15px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.3), transparent);
          padding: 10px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #3b82f6;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.8);
        }
        .header {
          display: flex;
          flex-direction: column;
          color: #fff;
        }
        .header p:first-child {
          margin: 0;
          font-size: 14px;
          font-weight: normal;
          opacity: 0.8;
        }
        .header .value {
          margin: 0;
          font-size: 28px;
          font-weight: bold;
          opacity: 0.9;
        }
        .graph {
          margin-top: 20px;
        }
        .graph svg {
          width: 100%;
          height: 100px;
        }
        .line {
          fill: none;
          stroke-width: 4;
          stroke-linecap: round;
        }
        .line1 {
          stroke: #60a5fa;
          filter: drop-shadow(0px 0px 5px rgba(96, 165, 250, 0.8));
        }
        .line2 {
          stroke: #3b82f6;
          filter: drop-shadow(0px 0px 5px rgba(59, 130, 246, 0.8));
        }
        .time-labels {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          color: #ccc;
          font-size: 12px;
        }
      `}</style>
      
      <div className="glowing-card">
        <div className="metric-icon">
          <Icon className="w-6 h-6" />
        </div>
        
        <div className="header">
          <p>{title}</p>
          <p className="value">{value}</p>
        </div>
        
        <div className="graph">
          <svg viewBox="0 0 320 80">
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
            <path
              className="line1"
              d={generatePath(chartData)}
              stroke="url(#gradient1)"
            />
          </svg>
          
          <div className="time-labels">
            {timeLabels.map((label, index) => (
              <span key={index}>{label}</span>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}




