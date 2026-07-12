import { Construction, Clock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function ComingSoon({
  title = "Coming Soon",
  description = "This module is currently under development and will be available in a future update.",
  backTo = "/dashboard",
}) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-green-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
          <Construction className="h-10 w-10 text-green-600" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-900">
          {title}
        </h1>

        <p className="mt-4 leading-7 text-gray-600">
          {description}
        </p>

        <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium text-yellow-700">
          <Clock size={16} />
          Feature in active development
        </div>

        <div className="mt-10">
          <Link
            to={backTo}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 font-medium text-white transition hover:bg-green-700"
          >
            <ArrowLeft size={18} />
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;