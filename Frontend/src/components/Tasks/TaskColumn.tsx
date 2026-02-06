import { Droppable } from "@hello-pangea/dnd";
import { TaskCard } from "./TaskCard";
import type { Task, TaskStatus } from "@/features/tasks/types";

interface Props {
  status: TaskStatus;
  tasks: Task[];
}

export function TaskColumn({ status, tasks }: Props) {
  return (
    <Droppable droppableId={status}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className="bg-gray-100 rounded p-4 min-h-100"
        >
          <h2 className="font-semibold mb-4">{status}</h2>

          {tasks.map((task, index) => (
            <TaskCard key={task._id} task={task} index={index} />
          ))}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
