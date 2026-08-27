const ClearTimetableModal = ({
  open,
  onCancel,
  onConfirm,
  loading,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        {/* Warning Icon */}
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
          <span className="text-xl">⚠️</span>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900">
          Clear Timetable?
        </h2>

        {/* Message */}
        <p className="mt-2 text-sm leading-6 text-gray-600">
          Are you sure you want to clear this timetable?
          All scheduled entries will be removed.
          <span className="font-medium text-red-600">
            {" "}This action cannot be undone.
          </span>
        </p>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">

          {/* Cancel */}
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          {/* Confirm */}
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Clearing..." : "Clear Timetable"}
          </button>

        </div>
      </div>
    </div>
  );
};

export default ClearTimetableModal;