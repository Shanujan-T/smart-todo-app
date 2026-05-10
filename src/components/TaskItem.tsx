import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  onToggleComplete: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

export default function TaskItem({ task, onToggleComplete, onDelete }: TaskItemProps) {
  const formattedDate = new Date(task.createdAt).toLocaleString();

  return (
    <article className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
      <input
        type="checkbox"
        checked={task.isCompleted}
        onChange={() => onToggleComplete(task.id)}
        className="size-5 accent-indigo-600"
        aria-label={`Mark ${task.title} as complete`}
      />
      <div className="min-w-0 flex-1">
        <h3
          className={`truncate font-medium ${
            task.isCompleted ? "text-slate-400 line-through" : "text-slate-800"
          }`}
        >
          {task.title}
        </h3>
        <p className="text-xs text-slate-500">{formattedDate}</p>
      </div>
      <button
        type="button"
        onClick={() => onDelete(task.id)}
        className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-100"
      >
        Delete
      </button>
    </article>
  );
}
