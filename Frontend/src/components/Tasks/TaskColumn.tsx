import { Droppable } from "@hello-pangea/dnd";
import { Plus } from "lucide-react";
import { TaskCard } from "./TaskCard";
import type { Task, TaskStatus } from "@/features/tasks/types";

interface Props {
  status: TaskStatus;
  tasks: Task[];
  onCreate?: () => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
}

export function TaskColumn({
  status,
  tasks,
  onCreate,
  onEdit,
  onDelete,
}: Props) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 rounded p-4 min-h-105"
        >
          <h2 className="font-semibold mb-4">{status}</h2>

          {status === "To-Do" && (
            <button
              onClick={onCreate}
              className="w-full mb-4 border-2 border-dashed rounded-lg p-3 text-sm flex items-center justify-center gap-2 text-white hover:border-gray-400"
            >
              <Plus size={16} />
              Add Task
            </button>
          )}

          {tasks.map((task, index) => (
            <TaskCard
              key={task._id}
              task={task}
              index={index}
              onEdit={() => onEdit(task)}
              onDelete={() => onDelete(task)}
            />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
