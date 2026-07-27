function TimetableGrid({
  timetable = [],
  days = [],
  timeSlots = [],
  timetableLookup = {},
  onAddSchedule,
}) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-max border-collapse">
        {/* Header */}
        <thead>
          <tr>
            <th className="sticky left-0 z-20 min-w-[100px] border bg-green-700 px-3 py-2 text-left text-sm font-semibold text-white">
              Day
            </th>

            {timeSlots.map((slot) => (
              <th
                key={slot.id}
                className="min-w-[150px] border bg-green-700 px-3 py-2 text-center text-sm font-semibold text-white"
              >
                {slot.code}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {days.map((day) => (
            <tr key={day.id}>
              {/* Day */}
              <td className="sticky left-0 z-10 min-w-[100px] border bg-gray-50 px-3 py-2 text-sm font-semibold">
                {day.name}
              </td>

              {/* Time Slots */}
              {timeSlots.map((slot) => {
                const key = `${day.id}-${slot.id}`;

                const venueEntries = timetableLookup[key] || {};

                const scheduledEntries =
                  Object.values(venueEntries);

                return (
                  <td
                    key={slot.id}
                    className="min-w-[150px] border p-1 align-top"
                  >
                    <div className="space-y-1">
                      {/* Scheduled Lectures */}
                      {scheduledEntries.map((lecture) => (
                        <div
                          key={lecture.id}
                          className="rounded border border-gray-200 px-2 py-1 text-xs hover:border-green-300 hover:bg-green-50"
                        >
                          <span className="font-medium text-gray-600">
                            {lecture.venues?.venue_code || "N/A"}
                          </span>

                          <span className="mx-1 text-gray-400">
                            :
                          </span>

                          <span
                            className="font-semibold"
                            style={{
                              color:
                                lecture.faculties?.color ??
                                "#15803d",
                            }}
                          >
                            {lecture.courses?.course_code || "N/A"}
                          </span>
                        </div>
                      ))}

                      {/* Add Schedule */}
                      <button
                        type="button"
                        onClick={() =>
                          onAddSchedule({
                            day,
                            timeSlot: slot,
                          })
                        }
                        className="w-full rounded border border-dashed border-green-300 px-2 py-1 text-xs font-medium text-green-600 transition hover:border-green-500 hover:bg-green-50"
                      >
                        + Add
                      </button>
                    </div>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimetableGrid;