/* eslint-disable react-hooks/set-state-in-effect */
import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  open: boolean;
  initialValues?: {
    title: string;
    description?: string;
  };
  onClose: () => void;
  onSubmit: (data: { title: string; description?: string }) => void;
}

export function TaskFormModal({
  open,
  initialValues,
  onClose,
  onSubmit,
}: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title ?? "");
      setDescription(initialValues.description ?? "");
    } else {
      setTitle("");
      setDescription("");
    }
  }, [initialValues, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-5 w-full max-w-md">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">
            {initialValues ? "Edit Task" : "Create Task"}
          </h3>
          <button className="text-white" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full border rounded px-3 py-2 text-sm mb-3"
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          className="w-full border rounded px-3 py-2 text-sm"
          rows={3}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onClose} className="border text-white px-3 py-1.5 rounded">
            Cancel
          </button>
          <button
            onClick={() => onSubmit({ title, description })}
            className="bg-black text-white px-3 py-1.5 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
