import { Megaphone, Percent, Users, Wallet } from 'lucide-react';
import MarketingHero from '../organisms/MarketingHero';
import RevenueAnalyticsCard from '../organisms/RevenueAnalyticsCard';
import TrafficChannelsCard from '../organisms/TrafficChannelsCard';
import CampaignPerformanceCard from '../organisms/CampaignPerformanceCard';
import GoalProgressCard from '../organisms/GoalProgressCard';
import TopPagesCard from '../organisms/TopPagesCard';
import ActivityFeedCard from '../organisms/ActivityFeedCard';
import StatCard from '../molecules/StatCard';

function DashboardGlyph({ type }) {
  const icons = {
    visitors: <Users size={20} />,
    revenue: <Wallet size={20} />,
    conversion: <Percent size={20} />,
    campaign: <Megaphone size={20} />,
  };

  return <span>{icons[type]}</span>;
}

function MarketingDashboardTemplate({ dashboard }) {
  const safeDashboard = dashboard ?? {};
  const safeHero = safeDashboard.hero ?? {
    badge: '',
    title: '',
    description: '',
    pills: [],
    highlights: [],
  };
  const safeStats = safeDashboard.stats ?? [];
  const safeRevenueOverview = safeDashboard.revenueOverview ?? {
    title: '',
    subtitle: '',
    badge: '',
    total: '',
    caption: '',
    summary: [],
    series: [],
  };
  const safeTrafficChannels = safeDashboard.trafficChannels ?? [];
  const safeCampaignPerformance = safeDashboard.campaignPerformance ?? [];
  const safeGoalProgress = safeDashboard.goalProgress ?? [];
  const safeTopPages = safeDashboard.topPages ?? [];
  const safeActivityFeed = safeDashboard.activityFeed ?? [];

  return (
    <div className="space-y-6">
      <MarketingHero hero={safeHero} />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {safeStats.map((item) => (
          <StatCard
            key={item.label}
            icon={<DashboardGlyph type={item.icon} />}
            label={item.label}
            value={item.value}
            delta={item.delta}
            tone={item.tone}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
        <RevenueAnalyticsCard data={safeRevenueOverview} />
        <TrafficChannelsCard channels={safeTrafficChannels} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
        <CampaignPerformanceCard campaigns={safeCampaignPerformance} />
        <GoalProgressCard goals={safeGoalProgress} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <TopPagesCard pages={safeTopPages} />
        <ActivityFeedCard items={safeActivityFeed} />
      </section>
    </div>
  );
}

export default MarketingDashboardTemplate;
