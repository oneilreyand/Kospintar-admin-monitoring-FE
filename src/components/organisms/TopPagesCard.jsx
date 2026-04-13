import SurfaceCard from '../atoms/SurfaceCard';
import PagePerformanceRow from '../molecules/PagePerformanceRow';

function TopPagesCard({ pages }) {
  return (
    <SurfaceCard className="p-6">
      <div>
        <p className="text-sm font-semibold text-slate-900">Top Landing Pages</p>
        <p className="mt-1 text-sm text-slate-500">Halaman dengan traffic dan intent tertinggi.</p>
      </div>

      <div className="mt-6 grid gap-3 bg-slate-50/80 p-3 rounded-[24px]">
        {pages.map((page) => (
          <PagePerformanceRow key={page.path} page={page} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default TopPagesCard;
