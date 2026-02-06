/* eslint-disable react-hooks/set-state-in-effect */
import {
  DragDropContext,
  type DropResult,
} from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { TaskColumn } from "./TaskColumn";
import { TaskFormModal } from "./TaskFormModal";
import { ConfirmDeleteModal } from "./ConfirmDeleteModal";

import type { Task, TaskStatus } from "@/features/tasks/types";
import { useTasks } from "@/features/tasks/useTasks";
import { useCreateTask } from "@/features/tasks/useCreateTask";
import { useUpdateTaskStatus } from "@/features/tasks/useUpdateTaskStatus";
import { useDeleteTask } from "@/features/tasks/useDeleteTask";
import { useUpdateTask } from "@/features/tasks/useUpdateTask";
import Loader from "../common/Loader";

const columns: TaskStatus[] = ["To-Do", "In-Progress", "Done"];

export function TaskBoard() {
  const { data: fetchedTasks, isLoading } = useTasks();
  const createTask = useCreateTask();
  const updateStatus = useUpdateTaskStatus();
  const deleteTask = useDeleteTask();
  const updateTaskMutation = useUpdateTask();

  const [tasks, setTasks] = useState<Task[]>([]);

  // modal states
  const [createOpen, setCreateOpen] = useState(false);
  const [editTask, setEditTask] = useState<Task | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Task | null>(null);

  useEffect(() => {
    if (Array.isArray(fetchedTasks)) {
      setTasks(fetchedTasks);
    }
  }, [fetchedTasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const from = source.droppableId as TaskStatus;
    const to = destination.droppableId as TaskStatus;
    if (from === to) return;

    const task = tasks.find(t => t._id === draggableId);
    if (!task) return;

    if (
      to === "Done" &&
      (!task.description || task.description.length <= 20)
    ) {
      toast.error("Description must be longer than 20 characters");
      return;
    }

    const prev = [...tasks];

    setTasks(prev =>
      prev.map(t =>
        t._id === draggableId ? { ...t, status: to } : t
      )
    );

    updateStatus.mutate(
      { id: draggableId, status: to },
      {
        onError: () => {
          setTasks(prev);
          toast.error("Update failed, reverted");
        },
      }
    );
  };

  if (isLoading) {
    return <Loader/>;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-3 gap-4">
          {columns.map(col => (
            <TaskColumn
              key={col}
              status={col}
              tasks={tasks.filter(t => t.status === col)}
              onCreate={col === "To-Do" ? () => setCreateOpen(true) : undefined}
              onEdit={setEditTask}
              onDelete={setDeleteTarget}
            />
          ))}
        </div>
      </DragDropContext>

      {/* Create */}
      <TaskFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onSubmit={(data) =>
          createTask.mutate(data, {
            onSuccess: () => setCreateOpen(false),
          })
        }
      />

      {/* Edit */}
<TaskFormModal
  open={!!editTask}
  initialValues={editTask ?? undefined}
  onClose={() => setEditTask(null)}
  onSubmit={(data) => {
    if (!editTask) return;

    updateTaskMutation.mutate(
      {
        id: editTask._id,
        payload: {
          title: data.title,
          description: data.description,
        },
      },
      {
        onSuccess: () => setEditTask(null),
      }
    );
  }}
/>

      {/* Delete */}
      <ConfirmDeleteModal
        open={!!deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (!deleteTarget) return;
          deleteTask.mutate(deleteTarget._id, {
            onSuccess: () => setDeleteTarget(null),
          });
        }}
      />
    </>
  );
}
