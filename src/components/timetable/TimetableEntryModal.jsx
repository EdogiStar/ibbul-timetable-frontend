import { useEffect, useState } from "react";

import {
  getAvailableCourseAllocations,
} from "@/services/courseAllocationService";


function TimetableEntryModal({

  open,

  onClose,

  onSubmit,

  selectedSlot,

  availableVenues = [],

}) {


  /**
   * ----------------------------------------------------
   * Form
   * ----------------------------------------------------
   */

  const [form, setForm] = useState({

    courseAllocationId: "",

    venueId: "",

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


  const [
    selectedAllocation,
    setSelectedAllocation
  ] = useState(null);


  const [
    loadingAllocations,
    setLoadingAllocations
  ] = useState(false);



  /**
   * ----------------------------------------------------
   * Load Course Allocations
   * ----------------------------------------------------
   */

  const loadCourseAllocations = async () => {

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

    if (!open) return;

    loadCourseAllocations();

  }, [open]);



  /**
   * ----------------------------------------------------
   * Reset Venue When Slot Changes
   * ----------------------------------------------------
   */

  useEffect(() => {

    setForm({

      courseAllocationId: "",

      venueId: "",

    });

    setSelectedAllocation(
      null
    );

  }, [selectedSlot]);



  /**
   * ----------------------------------------------------
   * Course Allocation Change
   * ----------------------------------------------------
   */

  const handleAllocationChange = (
    e
  ) => {

    const allocationId =
      e.target.value;


    const allocation =
      courseAllocations.find(
        item =>
          item.id ===
          allocationId
      );


    setSelectedAllocation(
      allocation ||
      null
    );


    setForm(
      previous => ({

        ...previous,

        courseAllocationId:
          allocationId,

      })
    );

  };



  /**
   * ----------------------------------------------------
   * Venue Change
   * ----------------------------------------------------
   */

  const handleVenueChange = (
    e
  ) => {

    setForm(
      previous => ({

        ...previous,

        venueId:
          e.target.value,

      })
    );

  };



  /**
   * ----------------------------------------------------
   * Submit
   * ----------------------------------------------------
   */

  const handleSubmit = (
    e
  ) => {

    e.preventDefault();


    onSubmit({

      courseAllocationId:
        form.courseAllocationId,

      dayId:
        selectedSlot?.day?.id,

      timeSlotId:
        selectedSlot?.timeSlot?.id,

      venueId:
        form.venueId,

    });

  };



  if (!open) {

    return null;

  }



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">

      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">


        {/* =========================================
            Header
        ========================================= */}

        <div className="flex items-center justify-between border-b p-5">

          <div>

            <h2 className="text-xl font-semibold">

              Add Timetable Entry

            </h2>

            <p className="mt-1 text-sm text-gray-500">

              Schedule a course in the selected
              day and time slot.

            </p>

          </div>


          <button

            onClick={
              onClose
            }

            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"

          >

            ✕

          </button>

        </div>



        <form

          onSubmit={
            handleSubmit
          }

          className="space-y-5 p-6"

        >


          {/* =====================================
              Selected Day / Time
          ===================================== */}

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


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

          </div>



          {/* =====================================
              Available Venue
          ===================================== */}

          <div>

            <label className="mb-2 block text-sm font-medium">

              Available Venue

            </label>


            <select

              value={
                form.venueId
              }

              onChange={
                handleVenueChange
              }

              className="w-full rounded-lg border px-4 py-3"

              required

            >

              <option value="">

                Select Available Venue

              </option>


              {availableVenues.map(
                venue => (

                  <option

                    key={
                      venue.id
                    }

                    value={
                      venue.id
                    }

                  >

                    {venue.venue_code}

                    {" - "}

                    {venue.venue_name}

                  </option>

                )
              )}

            </select>


            {availableVenues.length === 0 && (

              <p className="mt-2 text-sm text-red-500">

                No venues are currently available
                for this time slot.

              </p>

            )}

          </div>



          {/* =====================================
              Course Allocation
          ===================================== */}

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

                        {course?.course_code ||
                          "No Course"}

                        {" - "}

                        {programme?.code ||
                          "No Programme"}

                        {" - "}

                        {level?.name ||
                          "No Level"}

                      </option>

                    );

                  }
                )
              }

            </select>

          </div>



          {/* =====================================
              Selected Allocation Details
          ===================================== */}

          {selectedAllocation && (

            <div className="rounded-lg border bg-gray-50 p-4">

              <h3 className="mb-3 font-semibold text-gray-800">

                Course Allocation Details

              </h3>


              <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">


                <div>

                  <span className="text-gray-500">

                    Course:

                  </span>{" "}

                  <span className="font-medium">

                    {selectedAllocation
                      .course_offerings
                      ?.courses
                      ?.course_code}

                    {" - "}

                    {selectedAllocation
                      .course_offerings
                      ?.courses
                      ?.course_title}

                  </span>

                </div>



                <div>

                  <span className="text-gray-500">

                    Programme:

                  </span>{" "}

                  <span className="font-medium">

                    {selectedAllocation
                      .course_offerings
                      ?.programmes
                      ?.name ||
                      "N/A"}

                  </span>

                </div>



                <div>

                  <span className="text-gray-500">

                    Level:

                  </span>{" "}

                  <span className="font-medium">

                    {selectedAllocation
                      .course_offerings
                      ?.levels
                      ?.name ||
                      "N/A"}

                  </span>

                </div>



                <div>

                  <span className="text-gray-500">

                    Lecturer:

                  </span>{" "}

                  <span className="font-medium">

                    {selectedAllocation
                      .lecturers
                      ?.full_name ||
                      "No Lecturer"}

                  </span>

                </div>



                <div>

                  <span className="text-gray-500">

                    Session:

                  </span>{" "}

                  <span className="font-medium">

                    {selectedAllocation
                      .course_offerings
                      ?.academic_sessions
                      ?.name ||
                      "N/A"}

                  </span>

                </div>



                <div>

                  <span className="text-gray-500">

                    Semester:

                  </span>{" "}

                  <span className="font-medium">

                    {selectedAllocation
                      .course_offerings
                      ?.semesters
                      ?.name ||
                      "N/A"}

                  </span>

                </div>

              </div>

            </div>

          )}



          {/* =====================================
              Actions
          ===================================== */}

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

                availableVenues.length === 0

              }

              className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"

            >

              Save Timetable Entry

            </button>

          </div>


        </form>

      </div>

    </div>

  );

}


export default TimetableEntryModal;