import type { Task } from "@/features/tasks/types";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  task: Task;
  index: number;
}

export function TaskCard({ task, index }: Props) {
  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-white rounded shadow p-3 mb-3"
        >
          <h3 className="font-medium">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-600 mt-1">
              {task.description}
            </p>
          )}
        </div>
      )}
    </Draggable>
  );
}
