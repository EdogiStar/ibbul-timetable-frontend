function FormModal({
  open,
  title,
  children,
  onClose,
  onSubmit,
  submitText = "Save",
  cancelText = "Cancel",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-xl bg-white shadow-xl">

        <div className="flex items-center justify-between border-b px-6 py-4">
          <h2 className="text-xl font-semibold">
            {title}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl text-gray-500 hover:text-gray-700"
          >
            &times;
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <div className="space-y-4 p-6">
            {children}
          </div>

          <div className="flex justify-end gap-3 border-t px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100"
            >
              {cancelText}
            </button>

            <button
              type="submit"
              className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
            >
              {submitText}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default FormModal;