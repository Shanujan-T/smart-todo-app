import { TaskFilterType } from "@/types";

interface TaskFilterProps {
  currentFilter: TaskFilterType;
  onFilterChange: (filter: TaskFilterType) => void;
}

const filters: TaskFilterType[] = ["all", "pending", "completed"];

export default function TaskFilter({
  currentFilter,
  onFilterChange,
}: TaskFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          type="button"
          onClick={() => onFilterChange(filter)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            currentFilter === filter
              ? "bg-indigo-600 text-white"
              : "bg-slate-200 text-slate-700 hover:bg-slate-300"
          }`}
        >
          {filter[0].toUpperCase() + filter.slice(1)}
        </button>
      ))}
    </div>
  );
}
