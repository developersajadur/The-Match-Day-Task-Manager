interface Props {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmDeleteModal({
  open,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-5 w-full max-w-sm">
        <h3 className="font-semibold mb-2">Delete Task</h3>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="border px-3 py-1.5 rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-600 text-white px-3 py-1.5 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
