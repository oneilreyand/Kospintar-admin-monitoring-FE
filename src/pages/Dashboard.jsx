import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/atoms/Spinner';
import MarketingDashboardTemplate from '../components/templates/MarketingDashboardTemplate';
import { loadMonitoringSnapshot } from '../store/action/monitoringActions';

function Dashboard() {
  const dispatch = useDispatch();
  const { loading, error, hero, stats, revenueOverview, trafficChannels, campaignPerformance, goalProgress, topPages, activityFeed } = useSelector((state) => state.monitoring);

  useEffect(() => {
    dispatch(loadMonitoringSnapshot());
  }, [dispatch]);

  if (loading) {
    return <Spinner label="Memuat ringkasan monitoring..." />;
  }

  if (error) {
    return (
      <div className="rounded-[28px] border border-rose-200 bg-rose-50 p-6 text-rose-700">
        Gagal memuat dashboard: {error}
      </div>
    );
  }

  return (
    <MarketingDashboardTemplate
      dashboard={{
        hero,
        stats,
        revenueOverview,
        trafficChannels,
        campaignPerformance,
        goalProgress,
        topPages,
        activityFeed,
      }}
    />
  );
}

export default Dashboard;
