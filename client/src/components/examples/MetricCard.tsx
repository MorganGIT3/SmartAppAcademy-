import { MetricCard } from '../MetricCard';
import { Users, Eye, Target } from 'lucide-react';

export default function MetricCardExample() {
  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
      <MetricCard
        title="Total Leads"
        value="2,847"
        change="+12% from last month"
        changeType="positive"
        icon={Users}
        description="Leads generated this month"
      />
      <MetricCard
        title="Content Views"
        value="1.2M"
        change="+8% from last week"
        changeType="positive"
        icon={Eye}
        badge="Trending"
      />
      <MetricCard
        title="Conversion Rate"
        value="3.2%"
        change="-0.3% from yesterday"
        changeType="negative"
        icon={Target}
        description="Average across all funnels"
      />
    </div>
  );
}