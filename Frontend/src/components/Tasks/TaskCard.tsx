import { Draggable } from "@hello-pangea/dnd";
import { Pencil, Trash2 } from "lucide-react";
import type { Task } from "@/features/tasks/types";

interface Props {
  task: Task;
  index: number;
  onEdit: () => void;
  onDelete: () => void;
}

export function TaskCard({ task, index, onEdit, onDelete }: Props) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded shadow p-3 mb-3 group"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium">{task.title}</h3>

            <div className="flex gap-1 text-white opacity-0 group-hover:opacity-100">
              <button onClick={onEdit}>
                <Pencil size={14} />
              </button>
              <button onClick={onDelete} className="text-red-500">
                <Trash2 size={14} />
              </button>
            </div>
          </div>

          {task.description && (
            <p className="text-xs text-gray-600 mt-1">
              {task.description}
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
}
