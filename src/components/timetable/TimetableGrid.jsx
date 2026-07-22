import { Plus, MoreVertical } from "lucide-react";

function TimetableGrid({
  timetable = [],
  days = [],
  timeSlots = [],
  venues = [],
  timetableLookup,
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

              <td className="sticky left-0 z-10 border bg-gray-50 p-4 font-semibold">

                {day.name}

              </td>

              {timeSlots.map((slot) => {

                /**
                 * ----------------------------------------
                 * Fast Lookup Key
                 * ----------------------------------------
                 */
                const key =
                  `${day.id}-${slot.id}`;

                /**
                 * ----------------------------------------
                 * All scheduled venues for
                 * this Day + Time Slot
                 * ----------------------------------------
                 */
                const venueEntries =
                  timetableLookup[key] || {};

                return (

                  <td
                    key={slot.id}
                    className="min-w-[220px] border p-2 align-top"
                  >

                    <div className="space-y-2">
                                          {venues.map((venue) => {

                        /**
                         * ----------------------------------------
                         * O(1) Lookup
                         * ----------------------------------------
                         * Instead of searching with .find(),
                         * retrieve the lecture directly.
                         * ----------------------------------------
                         */
                        const lecture =
                          venueEntries[venue.id];

                        return (

                          <div
                            key={venue.id}
                            className="rounded-lg border border-gray-200 p-2 transition hover:border-green-300 hover:bg-green-50"
                          >

<div className="flex items-center justify-between">

  <p className="text-sm font-medium">

    <span className="text-gray-600">
      {venue.venue_code}:
    </span>{" "}

    {lecture ? (

      <span
        className="font-semibold"
        style={{
          color:
            lecture.faculties?.color ??
            "#15803d",
        }}
      >
        {lecture.courses?.course_code}
      </span>

    ) : (

      <span className="text-gray-400">
        Free
      </span>

    )}

  </p>

  {lecture ? (

    <button
      className="rounded p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
      title="Actions"
    >
      <MoreVertical size={16} />
    </button>

  ) : (

    <button
  onClick={() =>
    onAddSchedule({
      day,
      timeSlot: slot,
      venue,
    })
  }
  className="rounded p-1 text-green-600 transition hover:bg-green-100"
  title="Add Schedule"
>
  <Plus size={16} />
</button>

  )}

</div>

                          </div>

                        );

                      })}
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