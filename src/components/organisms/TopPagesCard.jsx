import SurfaceCard from '../atoms/SurfaceCard';
import PagePerformanceRow from '../molecules/PagePerformanceRow';
import SectionHeading from '../molecules/SectionHeading';

function TopPagesCard({ pages }) {
  return (
    <SurfaceCard className="p-6">
      <SectionHeading
        title="Top Landing Pages"
        subtitle="Halaman dengan traffic dan intent tertinggi."
      />

      <div className="mt-6 grid gap-3 rounded-[24px] bg-background p-3">
        {pages.map((page) => (
          <PagePerformanceRow key={page.path} page={page} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default TopPagesCard;
