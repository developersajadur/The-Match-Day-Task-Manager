import {
  DragDropContext,
  type DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { TaskColumn } from "./TaskColumn";
import type { Task, TaskStatus } from "@/features/tasks/types";
import { toast } from "sonner";
import { useUpdateTaskStatus } from "@/features/tasks/useUpdateTaskStatus";
import { useTasks } from "@/features/tasks/useTasks";

const columns: TaskStatus[] = ["To-Do", "In-Progress", "Done"];

export function TaskBoard() {
  const { data: fetchedTasks = [], isLoading } = useTasks();
  const updateTaskMutation = useUpdateTaskStatus();

  const [tasks, setTasks] = useState<Task[]>([]);

  /** Sync React Query data → local state */
  useEffect(() => {
    setTasks(fetchedTasks);
  }, [fetchedTasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const from = source.droppableId as TaskStatus;
    const to = destination.droppableId as TaskStatus;
    if (from === to) return;

    const task = tasks.find(t => t._id === draggableId);
    if (!task) return;

    /** Dependency rule */
    if (
      to === "Done" &&
      (!task.description || task.description.length <= 20)
    ) {
      toast.error(
        "Task description must be longer than 20 characters to move to Done"
      );
      return;
    }

    const previousState = [...tasks];

    /** Optimistic update */
    setTasks(prev =>
      prev.map(t =>
        t._id === draggableId ? { ...t, status: to } : t
      )
    );

    updateTaskMutation.mutate(
      { id: draggableId, status: to },
      {
        onError: () => {
          /** Rollback on failure */
          setTasks(previousState);
          toast.error("Failed to update task. Changes reverted.");
        },
      }
    );
  };

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading tasks…</p>;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4">
        {columns.map(col => (
          <TaskColumn
            key={col}
            status={col}
            tasks={tasks.filter(t => t.status === col)}
          />
        ))}
      </div>
    </DragDropContext>
  );
}
