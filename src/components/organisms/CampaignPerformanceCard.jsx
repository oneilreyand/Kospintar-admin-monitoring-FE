import SurfaceCard from '../atoms/SurfaceCard';
import CampaignRow from '../molecules/CampaignRow';
import SectionHeading from '../molecules/SectionHeading';

function CampaignPerformanceCard({ campaigns }) {
  return (
    <SurfaceCard className="overflow-hidden p-6">
      <SectionHeading
        title="Campaign Performance"
        subtitle="ROI campaign aktif untuk akuisisi tenant dan owner."
        action={(
          <button
            type="button"
            className="rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-navy transition hover:border-primary/30 hover:bg-background"
          >
            Export Report
          </button>
        )}
      />

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-[0.16em] text-text-secondary">
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
