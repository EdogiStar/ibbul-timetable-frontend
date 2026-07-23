import { useEffect, useState } from "react";

import {
  getAvailableCourseAllocations,
} from "@/services/courseAllocationService";


function TimetableEntryModal({

  open,

  onClose,

  onSubmit,

  selectedSlot,

}) {


  /**
   * ----------------------------------------------------
   * Form
   * ----------------------------------------------------
   */
  const [form, setForm] = useState({

    courseAllocationId: "",

  });


  /**
   * ----------------------------------------------------
   * Available Course Allocations
   * ----------------------------------------------------
   */
  const [
    courseAllocations,
    setCourseAllocations
  ] = useState([]);


  /**
   * ----------------------------------------------------
   * Selected Allocation
   * ----------------------------------------------------
   */
  const [
    selectedAllocation,
    setSelectedAllocation
  ] = useState(null);


  /**
   * ----------------------------------------------------
   * Loading
   * ----------------------------------------------------
   */
  const [
    loadingAllocations,
    setLoadingAllocations
  ] = useState(false);


  /**
   * ----------------------------------------------------
   * Load Available Course Allocations
   * ----------------------------------------------------
   */
  const loadCourseAllocations =
    async () => {

      try {

        setLoadingAllocations(
          true
        );


        const data =
          await getAvailableCourseAllocations();


        setCourseAllocations(
          data
        );


      } catch (error) {

        console.error(
          "Failed to load course allocations:",
          error
        );

      } finally {

        setLoadingAllocations(
          false
        );

      }

    };


  /**
   * ----------------------------------------------------
   * Load Allocations When Modal Opens
   * ----------------------------------------------------
   */
  useEffect(() => {

    if (!open) {

      return;

    }


    loadCourseAllocations();

  }, [open]);


  /**
   * ----------------------------------------------------
   * Handle Allocation Selection
   * ----------------------------------------------------
   */
  const handleAllocationChange =
    (e) => {

      const allocationId =
        e.target.value;


      const allocation =
        courseAllocations.find(

          item =>

            item.id ===
            allocationId

        );


      setSelectedAllocation(
        allocation || null
      );


      setForm({

        courseAllocationId:
          allocationId,

      });

    };


  /**
   * ----------------------------------------------------
   * Submit
   * ----------------------------------------------------
   */
  const handleSubmit =
    (e) => {

      e.preventDefault();


      if (
        !form.courseAllocationId
      ) {

        return;

      }


      /**
       * ------------------------------------------------
       * Send Scheduling Request
       * ------------------------------------------------
       *
       * IMPORTANT:
       *
       * The modal does NOT insert into
       * timetable_entries.
       *
       * It sends a scheduling request.
       *
       * The scheduler decides whether
       * the selected slot is valid.
       *
       * ------------------------------------------------
       */
      onSubmit({

        courseAllocationId:
          form.courseAllocationId,


        targetSlot: {

          dayId:
            selectedSlot.day.id,

          timeSlotId:
            selectedSlot.timeSlot.id,

          venueId:
            selectedSlot.venue.id,

        },

      });

    };


  if (!open) {

    return null;

  }


  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">


        {/* ----------------------------------------
            Header
        ---------------------------------------- */}

        <div className="flex items-center justify-between border-b p-5">

          <div>

            <h2 className="text-xl font-semibold">

              Schedule Course

            </h2>

            <p className="mt-1 text-sm text-gray-500">

              Select a course allocation for this timetable slot.

            </p>

          </div>


          <button

            onClick={onClose}

            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"

          >

            ✕

          </button>

        </div>


        {/* ----------------------------------------
            Form
        ---------------------------------------- */}

        <form

          onSubmit={
            handleSubmit
          }

          className="space-y-5 p-6"

        >


          {/* ----------------------------------------
              Selected Slot
          ---------------------------------------- */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">


            <div>

              <label className="mb-2 block text-sm font-medium">

                Day

              </label>


              <input

                value={
                  selectedSlot
                    ?.day
                    ?.name ||
                  ""
                }

                readOnly

                className="w-full rounded-lg border bg-gray-50 px-4 py-3"

              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium">

                Time Slot

              </label>


              <input

                value={
                  selectedSlot
                    ?.timeSlot
                    ?.code ||
                  ""
                }

                readOnly

                className="w-full rounded-lg border bg-gray-50 px-4 py-3"

              />

            </div>


            <div>

              <label className="mb-2 block text-sm font-medium">

                Venue

              </label>


              <input

                value={
                  selectedSlot
                    ?.venue
                    ?.venue_code ||
                  ""
                }

                readOnly

                className="w-full rounded-lg border bg-gray-50 px-4 py-3"

              />

            </div>

          </div>


          {/* ----------------------------------------
              Course Allocation
          ---------------------------------------- */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Course Allocation

            </label>


            <select

              value={
                form.courseAllocationId
              }

              onChange={
                handleAllocationChange
              }

              className="w-full rounded-lg border px-4 py-3"

              required

              disabled={
                loadingAllocations
              }

            >

              <option value="">

                {loadingAllocations

                  ? "Loading course allocations..."

                  : "Select Course Allocation"

                }

              </option>


              {!loadingAllocations &&

                courseAllocations.map(

                  allocation => {


                    const course =
                      allocation
                        .course_offerings
                        ?.courses;


                    const programme =
                      allocation
                        .course_offerings
                        ?.programmes;


                    const level =
                      allocation
                        .course_offerings
                        ?.levels;


                    return (

                      <option

                        key={
                          allocation.id
                        }

                        value={
                          allocation.id
                        }

                      >

                        {course
                          ?.course_code ||
                          "No Course"
                        }

                        {" - "}

                        {programme
                          ?.code ||
                          "No Programme"
                        }

                        {" - "}

                        {level
                          ?.name ||
                          "No Level"
                        }

                      </option>

                    );

                  }

                )

              }

            </select>

          </div>


          {/* ----------------------------------------
              Selected Allocation Details
          ---------------------------------------- */}

          {selectedAllocation && (

            <div className="rounded-lg border bg-gray-50 p-4">

              <h3 className="mb-3 font-semibold">

                Course Allocation Details

              </h3>


              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">


                <div>

                  <span className="text-gray-500">

                    Course:

                  </span>{" "}


                  <span className="font-medium">

                    {
                      selectedAllocation
                        .course_offerings
                        ?.courses
                        ?.course_code
                    }

                    {" - "}

                    {
                      selectedAllocation
                        .course_offerings
                        ?.courses
                        ?.course_title
                    }

                  </span>

                </div>


                <div>

                  <span className="text-gray-500">

                    Programme:

                  </span>{" "}


                  <span className="font-medium">

                    {
                      selectedAllocation
                        .course_offerings
                        ?.programmes
                        ?.name ||
                      "N/A"
                    }

                  </span>

                </div>


                <div>

                  <span className="text-gray-500">

                    Level:

                  </span>{" "}


                  <span className="font-medium">

                    {
                      selectedAllocation
                        .course_offerings
                        ?.levels
                        ?.name ||
                      "N/A"
                    }

                  </span>

                </div>


                <div>

                  <span className="text-gray-500">

                    Lecturer:

                  </span>{" "}


                  <span className="font-medium">

                    {
                      selectedAllocation
                        .lecturers
                        ?.full_name ||
                      "No Lecturer"
                    }

                  </span>

                </div>

              </div>

            </div>

          )}


          {/* ----------------------------------------
              Actions
          ---------------------------------------- */}

          <div className="flex justify-end gap-3 border-t pt-5">


            <button

              type="button"

              onClick={
                onClose
              }

              className="rounded-lg border px-5 py-2.5 transition hover:bg-gray-50"

            >

              Cancel

            </button>


            <button

              type="submit"

              disabled={

                loadingAllocations ||

                !form.courseAllocationId

              }

              className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"

            >

              Schedule Course

            </button>


          </div>


        </form>

      </div>

    </div>

  );

}


export default TimetableEntryModal;