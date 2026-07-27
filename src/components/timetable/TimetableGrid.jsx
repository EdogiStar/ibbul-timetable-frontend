import {
  Plus,
  MoreVertical,
} from "lucide-react";


function TimetableGrid({
  timetable = [],
  days = [],
  timeSlots = [],
  timetableLookup = {},
  onAddSchedule,
}) {

  return (

    <table className="border-collapse min-w-[1800px]">


      {/* =======================================
          Header
      ======================================= */}

      <thead>

        <tr>

          <th className="
            sticky
            left-0
            top-0
            z-30
            min-w-[120px]
            border
            border-gray-200
            bg-green-700
            p-3
            text-left
            text-xs
            font-semibold
            text-white
            sm:min-w-[140px]
            sm:p-4
            sm:text-sm
          ">

            Day

          </th>


          {timeSlots.map((slot) => (

            <th
              key={slot.id}
              className="
                sticky
                top-0
                z-20
                min-w-[180px]
                border
                border-gray-200
                bg-green-700
                p-3
                text-center
                text-xs
                font-semibold
                text-white
                sm:min-w-[220px]
                sm:p-4
                sm:text-sm
              "
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

            <td className="
              sticky
              left-0
              z-10
              min-w-[120px]
              border
              border-gray-200
              bg-gray-50
              p-3
              align-top
              text-xs
              font-semibold
              text-gray-800
              sm:min-w-[140px]
              sm:p-4
              sm:text-sm
            ">

              {day.name}

            </td>


            {/* -----------------------------------
                Time Slots
            ----------------------------------- */}

            {timeSlots.map((slot) => {

              const key =
                `${day.id}-${slot.id}`;


              const venueEntries =
                timetableLookup[key] || {};


              const scheduledEntries =
                Object.values(
                  venueEntries
                );


              return (

                <td
                  key={slot.id}
                  className="
                    min-w-[180px]
                    border
                    border-gray-200
                    bg-white
                    p-2
                    align-top
                    sm:min-w-[220px]
                  "
                >

                  <div className="
                    min-h-[100px]
                    space-y-2
                    sm:min-h-[120px]
                  ">


                    {/* =================================
                        Scheduled Lectures
                    ================================= */}

                    {scheduledEntries.map(
                      (lecture) => (

                        <div
                          key={lecture.id}
                          className="
                            group
                            rounded-lg
                            border
                            border-gray-200
                            bg-white
                            p-2
                            shadow-sm
                            transition
                            hover:border-green-300
                            hover:bg-green-50
                            hover:shadow
                            sm:p-3
                          "
                        >

                          <div className="
                            flex
                            items-start
                            justify-between
                            gap-2
                          ">


                            {/* Lecture Information */}

                            <div className="
                              min-w-0
                              flex-1
                            ">

                              <p className="
                                truncate
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-wide
                                text-gray-400
                                sm:text-[11px]
                              ">

                                {lecture.venues?.venue_code ||
                                  "Venue not assigned"
                                }

                              </p>


                              <p
                                className="
                                  mt-1
                                  text-xs
                                  font-semibold
                                  sm:text-sm
                                "
                                style={{
                                  color:
                                    lecture.faculties?.color ??
                                    "#15803d",
                                }}
                              >

                                {lecture.courses?.course_code ||
                                  "Unknown Course"
                                }

                              </p>


                              <p className="
                                mt-1
                                line-clamp-2
                                text-[10px]
                                leading-4
                                text-gray-600
                                sm:text-xs
                                sm:leading-5
                              ">

                                {lecture.courses?.course_title ||
                                  "Course title unavailable"
                                }

                              </p>

                            </div>


                            {/* Actions */}

                            <button
                              type="button"
                              className="
                                rounded-md
                                p-1
                                text-gray-400
                                transition
                                hover:bg-gray-100
                                hover:text-gray-700
                              "
                              title="Actions"
                            >

                              <MoreVertical
                                size={15}
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
                      type="button"
                      onClick={() =>
                        onAddSchedule({
                          day,
                          timeSlot: slot,
                        })
                      }
                      className="
                        flex
                        w-full
                        items-center
                        justify-center
                        gap-1
                        rounded-lg
                        border
                        border-dashed
                        border-gray-300
                        px-2
                        py-2
                        text-[10px]
                        font-medium
                        text-gray-500
                        transition
                        hover:border-green-400
                        hover:bg-green-50
                        hover:text-green-600
                        sm:gap-2
                        sm:px-3
                        sm:text-xs
                      "
                      title="Add schedule"
                    >

                      <Plus size={14} />

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

  );

}


export default TimetableGrid;