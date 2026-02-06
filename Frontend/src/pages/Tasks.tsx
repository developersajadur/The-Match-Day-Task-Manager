import { TaskBoard } from "@/components/Tasks/TaskBoard";


export default function TasksPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">
        Match-Day Task Manager
      </h1>

      <TaskBoard />
    </div>
  );
}
