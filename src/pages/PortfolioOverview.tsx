import type { ProgramData } from '../types/store';
import StoreCard from '../components/Dashboard/StoreCard';

export default function PortfolioOverview({ data }: { data: ProgramData }) {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
        {data.stores.map((store, i) => (
          <StoreCard
            key={store.id}
            store={store}
            milestones={data.milestoneDefinition}
            index={i}
          />
        ))}
      </div>
    </div>
  );
}
