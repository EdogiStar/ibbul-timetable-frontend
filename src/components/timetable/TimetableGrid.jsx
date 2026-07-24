import { Plus, MoreVertical } from "lucide-react";

function TimetableGrid({
  timetable = [],
  days = [],
  timeSlots = [],
  timetableLookup = {},
  onAddSchedule,
}) {
  return (
    <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
      <table className="min-w-full border-collapse">

        {/* =======================================
            Header
        ======================================= */}

        <thead>
          <tr>
            <th className="sticky left-0 z-20 min-w-[140px] border bg-green-700 p-4 text-left font-semibold text-white">
              Day
            </th>

            {timeSlots.map((slot) => (
              <th
                key={slot.id}
                className="min-w-[220px] border bg-green-700 p-4 text-center font-semibold text-white"
              >
                {slot.code}
              </th>
            ))}
          </tr>
        </thead>


        {/* =======================================
            Body
        ======================================= */}

        <tbody>
          {days.map((day) => (
            <tr key={day.id}>

              {/* -----------------------------------
                  Day
              ----------------------------------- */}

              <td className="sticky left-0 z-10 border bg-gray-50 p-4 font-semibold">
                {day.name}
              </td>


              {/* -----------------------------------
                  Time Slots
              ----------------------------------- */}

              {timeSlots.map((slot) => {

                const key =
                  `${day.id}-${slot.id}`;


                /**
                 * All scheduled lectures
                 * for this Day + Time Slot.
                 */
                const venueEntries =
                  timetableLookup[key] || {};


                const scheduledEntries =
                  Object.values(
                    venueEntries
                  );


                return (
                  <td
                    key={slot.id}
                    className="min-w-[220px] border p-2 align-top"
                  >

                    <div className="space-y-2">

                      {/* =================================
                          Scheduled Lectures
                      ================================= */}

                      {scheduledEntries.map(
                        (lecture) => (

                          <div
                            key={lecture.id}
                            className="rounded-lg border border-gray-200 p-3 transition hover:border-green-300 hover:bg-green-50"
                          >

                            <div className="flex items-start justify-between gap-2">

                              <div>

                                <p className="text-xs text-gray-500">
                                  {lecture.venues?.venue_code}
                                </p>

                                <p
                                  className="font-semibold"
                                  style={{
                                    color:
                                      lecture.faculties?.color ??
                                      "#15803d",
                                  }}
                                >
                                  {lecture.courses?.course_code}
                                </p>

                                <p className="mt-1 text-xs text-gray-600">
                                  {lecture.courses?.course_title}
                                </p>

                              </div>


                              {/* Actions */}

                              <button
                                className="rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
                                title="Actions"
                              >
                                <MoreVertical
                                  size={16}
                                />
                              </button>

                            </div>

                          </div>

                        )
                      )}


                      {/* =================================
                          Add Schedule
                      ================================= */}

                      <button
                        onClick={() =>
                          onAddSchedule({
                            day,
                            timeSlot: slot,
                          })
                        }
                        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-green-300 px-3 py-2 text-sm font-medium text-green-600 transition hover:border-green-500 hover:bg-green-50"
                        title="Add schedule"
                      >

                        <Plus size={16} />

                        Add Schedule

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