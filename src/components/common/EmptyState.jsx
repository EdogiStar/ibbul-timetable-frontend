import { Inbox } from "lucide-react";

function EmptyState({
  title = "No data found",
  description = "There is nothing to display at the moment.",
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 px-6 text-center">
      <Inbox
        size={56}
        className="mb-4 text-gray-400"
      />

      <h3 className="text-lg font-semibold text-gray-700">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm text-gray-500">
        {description}
      </p>
    </div>
  );
}

export default EmptyState;