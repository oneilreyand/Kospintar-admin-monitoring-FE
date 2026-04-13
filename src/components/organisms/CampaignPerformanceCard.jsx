import SurfaceCard from '../atoms/SurfaceCard';
import CampaignRow from '../molecules/CampaignRow';

function CampaignPerformanceCard({ campaigns }) {
  return (
    <SurfaceCard className="overflow-hidden p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-slate-900">Campaign Performance</p>
          <p className="mt-1 text-sm text-slate-500">ROI campaign aktif untuk akuisisi tenant dan owner.</p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Export Report
        </button>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-[0.16em] text-slate-400">
              <th className="px-4 py-3 font-semibold">Campaign</th>
              <th className="px-4 py-3 font-semibold">Spend</th>
              <th className="px-4 py-3 font-semibold">Leads</th>
              <th className="px-4 py-3 font-semibold">ROI</th>
              <th className="px-4 py-3 font-semibold">CVR</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <CampaignRow key={campaign.name} campaign={campaign} />
            ))}
          </tbody>
        </table>
      </div>
    </SurfaceCard>
  );
}

export default CampaignPerformanceCard;
