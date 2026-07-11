import PageLoader from "./PageLoader";
import EmptyState from "./EmptyState";

function DataTable({
  columns = [],
  data = [],
  loading = false,
}) {
  if (loading) {
    return <PageLoader />;
  }

  if (!loading && data.length === 0) {
    return (
      <EmptyState
        title="No records found"
        description="There are currently no records to display."
      />
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
      <table className="min-w-full">
        <thead className="bg-green-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className="border-b px-6 py-3 text-left text-sm font-semibold text-gray-700"
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, index) => (
            <tr
              key={row.id || index}
              className="border-b transition hover:bg-gray-50"
            >
              {columns.map((column) => (
                <td
                  key={column.key}
                  className="px-6 py-4 text-sm text-gray-700"
                >
                  {column.render
                    ? column.render(row)
                    : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;