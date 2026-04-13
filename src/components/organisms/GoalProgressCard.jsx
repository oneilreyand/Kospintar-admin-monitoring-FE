import SurfaceCard from '../atoms/SurfaceCard';
import GoalProgressItem from '../molecules/GoalProgressItem';

function GoalProgressCard({ goals }) {
  return (
    <SurfaceCard className="p-6">
      <div>
        <p className="text-sm font-semibold text-slate-900">Goal Completion</p>
        <p className="mt-1 text-sm text-slate-500">Progress target funnel marketing bulan ini.</p>
      </div>

      <div className="mt-6 grid gap-3">
        {goals.map((goal) => (
          <GoalProgressItem key={goal.label} item={goal} />
        ))}
      </div>
    </SurfaceCard>
  );
}

export default GoalProgressCard;
