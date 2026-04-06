import type { ProgramData } from '../types/store';
import StoreCard from '../components/Dashboard/StoreCard';

interface PortfolioOverviewProps {
  data: ProgramData;
  onStoreClick: (storeId: string) => void;
}

export default function PortfolioOverview({ data, onStoreClick }: PortfolioOverviewProps) {
  return (
    <div className="animate-[fadeIn_0.3s_ease-out]">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-7">
        {data.stores.map((store, i) => (
          <StoreCard
            key={store.id}
            store={store}
            milestones={data.milestoneDefinition}
            index={i}
            onClick={() => onStoreClick(store.id)}
          />
        ))}
      </div>
    </div>
  );
}
