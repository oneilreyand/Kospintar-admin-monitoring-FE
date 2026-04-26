import SurfaceCard from '../atoms/SurfaceCard';
import GoalProgressItem from '../molecules/GoalProgressItem';
import SectionHeading from '../molecules/SectionHeading';

function GoalProgressCard({ goals }) {
  return (
    <SurfaceCard className="p-6">
      <SectionHeading
        title="Goal Completion"
        subtitle="Progress target funnel marketing bulan ini."
      />

      <div className="mt-6 grid gap-3">
        {goals.map((goal) => (
          <GoalProgressItem key={goal.label} item={goal} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default GoalProgressCard;
