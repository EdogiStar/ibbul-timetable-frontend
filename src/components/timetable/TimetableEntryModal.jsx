import { useEffect, useState } from "react";

import {
  getCourseOfferings,
} from "@/services/courseOfferingService";


function TimetableEntryModal({

  open,

  onClose,

  onSubmit,

  selectedSlot,

  availableVenues = [],

}) {


  const [form, setForm] = useState({

    courseOfferingId: "",

    venueId: "",

  });



  const [
    courseOfferings,
    setCourseOfferings
  ] = useState([]);



  const [
    selectedOffering,
    setSelectedOffering
  ] = useState(null);



  const [
    loadingOfferings,
    setLoadingOfferings
  ] = useState(false);



  /**
   * Load Course Offerings
   */
  const loadCourseOfferings = async () => {

    try {

      setLoadingOfferings(true);


      const data =
        await getCourseOfferings();


      setCourseOfferings(
        data
      );


    } catch(error) {

      console.error(
        "Failed to load course offerings:",
        error
      );

    } finally {

      setLoadingOfferings(false);

    }

  };



  /**
   * Load when modal opens
   */
  useEffect(() => {

    if(!open) return;


    loadCourseOfferings();


  }, [open]);



  /**
   * Reset form when slot changes
   */
  useEffect(() => {

    setForm({

      courseOfferingId: "",

      venueId: "",

    });


    setSelectedOffering(null);


  }, [selectedSlot]);



  /**
   * Course Offering Change
   */
  const handleCourseOfferingChange = (e) => {

    const id =
      e.target.value;


    const offering =
      courseOfferings.find(
        item =>
          item.id === id
      );


    setSelectedOffering(
      offering || null
    );


    setForm(previous => ({

      ...previous,

      courseOfferingId:id,

    }));

  };



  /**
   * Venue Change
   */
  const handleVenueChange = (e)=>{

    setForm(previous => ({

      ...previous,

      venueId:e.target.value,

    }));

  };



  /**
   * Submit
   */
  const handleSubmit = (e)=>{

    e.preventDefault();


    onSubmit({

  courseAllocationId:
    form.courseAllocationId,

  dayId:
    selectedSlot.day.id,

  timeSlotId:
    selectedSlot.timeSlot.id,

  venueId:
    form.venueId

});


  };



  if(!open){

    return null;

  }



  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">


      <div className="w-full max-w-2xl rounded-xl bg-white shadow-xl">


        <div className="flex items-center justify-between border-b p-5">


          <div>

            <h2 className="text-xl font-semibold">

              Add Timetable Entry

            </h2>


            <p className="mt-1 text-sm text-gray-500">

              Schedule a course into the selected
              timetable slot.

            </p>


          </div>



          <button

            onClick={onClose}

            className="rounded-lg px-3 py-2 text-gray-500 hover:bg-gray-100"

          >

            ✕

          </button>


        </div>




        <form

          onSubmit={handleSubmit}

          className="space-y-5 p-6"

        >



          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">


            <div>

              <label className="mb-2 block text-sm font-medium">

                Day

              </label>


              <input

                value={
                  selectedSlot?.day?.name || ""
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
                  selectedSlot?.timeSlot?.code || ""
                }

                readOnly

                className="w-full rounded-lg border bg-gray-50 px-4 py-3"

              />


            </div>


          </div>





          <div>

            <label className="mb-2 block text-sm font-medium">

              Course Offering

            </label>



            <select

              value={
                form.courseOfferingId
              }

              onChange={
                handleCourseOfferingChange
              }

              disabled={loadingOfferings}

              required

              className="w-full rounded-lg border px-4 py-3"

            >


              <option value="">

                {
                  loadingOfferings
                  ? "Loading course offerings..."
                  : "Select Course Offering"
                }

              </option>



              {!loadingOfferings &&

                courseOfferings.map(
                  offering => (

                    <option

                      key={
                        offering.id
                      }

                      value={
                        offering.id
                      }

                    >

                      {
                        offering.courses?.course_code
                      }

                      {" - "}

                      {
                        offering.programmes?.code
                      }

                      {" - "}

                      {
                        offering.levels?.name
                      }

                    </option>

                  )

                )

              }


            </select>


          </div>






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

              required

              className="w-full rounded-lg border px-4 py-3"

            >


              <option value="">

                Select Available Venue

              </option>



              {
                availableVenues.map(
                  venue => (

                    <option

                      key={
                        venue.id
                      }

                      value={
                        venue.id
                      }

                    >

                      {
                        venue.venue_code
                      }

                      {" - "}

                      {
                        venue.venue_name
                      }


                    </option>

                  )
                )
              }


            </select>



            {
              availableVenues.length === 0 && (

                <p className="mt-2 text-sm text-red-500">

                  No venues available for this slot.

                </p>

              )
            }


          </div>





          {
            selectedOffering && (

              <div className="rounded-lg border bg-gray-50 p-4">


                <h3 className="mb-3 font-semibold">

                  Course Details

                </h3>



                <div className="grid grid-cols-1 gap-3 text-sm md:grid-cols-2">


                  <div>

                    <span className="text-gray-500">
                      Course:
                    </span>

                    {" "}

                    <span className="font-medium">

                      {
                        selectedOffering
                        .courses
                        ?.course_code
                      }

                      {" - "}

                      {
                        selectedOffering
                        .courses
                        ?.course_title
                      }

                    </span>

                  </div>




                  <div>

                    <span className="text-gray-500">
                      Programme:
                    </span>

                    {" "}

                    <span className="font-medium">

                      {
                        selectedOffering
                        .programmes
                        ?.name
                      }

                    </span>

                  </div>




                  <div>

                    <span className="text-gray-500">
                      Level:
                    </span>

                    {" "}

                    <span className="font-medium">

                      {
                        selectedOffering
                        .levels
                        ?.name
                      }

                    </span>

                  </div>




                  <div>

                    <span className="text-gray-500">
                      Semester:
                    </span>

                    {" "}

                    <span className="font-medium">

                      {
                        selectedOffering
                        .semesters
                        ?.name
                      }

                    </span>

                  </div>


                </div>


              </div>

            )
          }






          <div className="flex justify-end gap-3 border-t pt-5">


            <button

              type="button"

              onClick={onClose}

              className="rounded-lg border px-5 py-2.5 hover:bg-gray-50"

            >

              Cancel

            </button>




            <button

              type="submit"

              disabled={
                loadingOfferings ||
                availableVenues.length === 0
              }

              className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white hover:bg-green-700 disabled:opacity-50"

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