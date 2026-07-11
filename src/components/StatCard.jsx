function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-green-600">
            {value}
          </h2>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
          <Icon
            size={24}
            className="text-green-600"
          />
        </div>
      </div>
    </div>
  );
}

export default StatCard;