import { Eye, Pencil, Trash2 } from "lucide-react";

function ActionButtons({
  onView,
  onEdit,
  onDelete,
  showView = false,
}) {
  return (
    <div className="flex items-center gap-2">
      {showView && (
        <button
          onClick={onView}
          className="rounded-lg bg-sky-100 p-2 text-sky-600 transition hover:bg-sky-200"
          title="View"
        >
          <Eye size={18} />
        </button>
      )}

      <button
        onClick={onEdit}
        className="rounded-lg bg-amber-100 p-2 text-amber-600 transition hover:bg-amber-200"
        title="Edit"
      >
        <Pencil size={18} />
      </button>

      <button
        onClick={onDelete}
        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-200"
        title="Delete"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default ActionButtons;