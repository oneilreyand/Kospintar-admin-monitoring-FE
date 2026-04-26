import ComponentShowcaseItem from '../molecules/ComponentShowcaseItem';
import MarketingHero from './MarketingHero';
import RevenueAnalyticsCard from './RevenueAnalyticsCard';
import TrafficChannelsCard from './TrafficChannelsCard';
import CampaignPerformanceCard from './CampaignPerformanceCard';
import GoalProgressCard from './GoalProgressCard';
import TopPagesCard from './TopPagesCard';
import ActivityFeedCard from './ActivityFeedCard';
import StatCard from '../molecules/StatCard';
import mockMonitoringData from '../../mocks/monitoringMock';

const dashboardCode = `import MarketingDashboardTemplate from '../components/templates/MarketingDashboardTemplate';

function DashboardPage() {
  return <MarketingDashboardTemplate dashboard={dashboardData} />;
}`;

function ComponentsDashboardSection() {
  const data = mockMonitoringData;

  return (
    <section className="space-y-6">
      <ComponentShowcaseItem
        title="Dashboard Hero"
        summary="Komponen hero utama dashboard marketing. Sudah reusable sebagai organism dan dipakai langsung di halaman Dashboard."
        code={dashboardCode}
        preview={<MarketingHero hero={data.hero} />}
      />

      <ComponentShowcaseItem
        title="Dashboard Stats"
        summary="Kumpulan `StatCard` untuk ringkasan metrik utama. Pattern ini dipakai sebagai blok KPI di dashboard."
        code={`<StatCard icon={...} label="Total Sessions" value="184.2K" delta="+12.4%" tone="success" />`}
        preview={(
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.stats.map((item) => (
              <StatCard
                key={item.label}
                icon={<span className="text-sm font-bold">{item.label.slice(0, 1)}</span>}
                label={item.label}
                value={item.value}
                delta={item.delta}
                tone={item.tone}
              />
            ))}
          </div>
        )}
      />

      <ComponentShowcaseItem
        title="Analytics Blocks"
        summary="Blok analytics inti dashboard: Revenue + Traffic, Campaign + Goal, Top Pages + Activity Feed."
        code={`<RevenueAnalyticsCard data={dashboard.revenueOverview} />
<TrafficChannelsCard channels={dashboard.trafficChannels} />`}
        preview={(
          <div className="grid gap-6">
            <div className="grid gap-6 xl:grid-cols-[1.5fr_0.9fr]">
              <RevenueAnalyticsCard data={data.revenueOverview} />
              <TrafficChannelsCard channels={data.trafficChannels} />
            </div>
            <div className="grid gap-6 xl:grid-cols-[1.45fr_0.95fr]">
              <CampaignPerformanceCard campaigns={data.campaignPerformance} />
              <GoalProgressCard goals={data.goalProgress} />
            </div>
            <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
              <TopPagesCard pages={data.topPages} />
              <ActivityFeedCard items={data.activityFeed} />
            </div>
          </div>
        )}
      />
    </section>
  );
}

export default ComponentsDashboardSection;
