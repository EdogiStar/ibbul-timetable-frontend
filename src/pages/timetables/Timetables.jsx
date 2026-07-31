import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import api from "@/services/api";

import PageHeader from "@/components/PageHeader";

import TimetableFilters from "@/components/timetable/TimetableFilters";
import TimetableGrid from "@/components/timetable/TimetableGrid";
import TimetableGenerateModal from "@/components/timetable/TimetableGenerateModal";
import TimetableEntryModal from "@/components/timetable/TimetableEntryModal";

import {
  getTimetable,
  addSingleNormalTimetable,
  clearTimetable,
} from "@/services/timetableService";

import { getDays } from "@/services/dayService";
import { getTimeSlots } from "@/services/timeSlotService";

import { getSessions } from "@/services/sessionService";
import { getSemesters } from "@/services/semesterService";
import { getFaculties } from "@/services/facultyService";
import { getDepartments } from "@/services/departmentService";
import { getProgrammes } from "@/services/programmeService";
import { getLevels } from "@/services/levelService";
import { getLecturers } from "@/services/lecturerService";
import { getCourses } from "@/services/courseService";
import { getVenues } from "@/services/venueService";
import { getCourseOfferings } from "@/services/courseOfferingService";


function Timetables() {

  // ----------------------------------------------------
  // Timetable Data
  // ----------------------------------------------------

  const [timetable, setTimetable] = useState([]);
  const [days, setDays] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseOfferings, setCourseOfferings] = useState([]);


  // ----------------------------------------------------
  // Timetable Entry Modal
  // ----------------------------------------------------

  const [openModal, setOpenModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [availableVenues, setAvailableVenues] = useState([]);


  // ----------------------------------------------------
  // Generate Timetable Modal
  // ----------------------------------------------------

  const [openGenerateModal, setOpenGenerateModal] = useState(false);


  // ----------------------------------------------------
  // Filter Options
  // ----------------------------------------------------

  const [sessions, setSessions] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [lecturers, setLecturers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [venues, setVenues] = useState([]);


  // ----------------------------------------------------
  // Filters
  // ----------------------------------------------------

  const emptyFilters = {
    sessionId: "",
    semesterId: "",
    facultyId: "",
    departmentId: "",
    programmeId: "",
    levelId: "",
    lecturerId: "",
    courseId: "",
    venueId: "",
  };

  const [filters, setFilters] = useState(emptyFilters);


  // ----------------------------------------------------
  // UI State
  // ----------------------------------------------------

  const [filtersOpen, setFiltersOpen] = useState(false);


  // ----------------------------------------------------
  // Initial Load
  // ----------------------------------------------------

  useEffect(() => {

    loadTimetable();
    loadFilterData();

  }, []);


  // ----------------------------------------------------
  // Load Timetable
  // ----------------------------------------------------

  const loadTimetable = async (appliedFilters = {}) => {

    try {

      setLoading(true);

      const response =
        await getTimetable(appliedFilters);

      setTimetable(
        response.data || []
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to load timetable."
      );

    } finally {

      setLoading(false);

    }

  };


  // ----------------------------------------------------
  // Load Filter Data
  // ----------------------------------------------------

  const loadFilterData = async () => {

    try {

      const [
        sessionsResponse,
        semestersResponse,
        facultiesResponse,
        departmentsResponse,
        programmesResponse,
        levelsResponse,
        lecturersResponse,
        coursesResponse,
        venuesResponse,
        courseOfferingsResponse,
        daysResponse,
        timeSlotsResponse,
      ] = await Promise.all([

        getSessions(),
        getSemesters(),
        getFaculties(),
        getDepartments(),
        getProgrammes(),
        getLevels(),
        getLecturers(),
        getCourses(),
        getVenues(),
        getCourseOfferings(),
        getDays(),
        getTimeSlots(),

      ]);


      setSessions(
        sessionsResponse.data || []
      );

      setSemesters(
        semestersResponse.data || []
      );

      setFaculties(
        facultiesResponse.data || []
      );

      setDepartments(
        departmentsResponse.data || []
      );

      setProgrammes(
        programmesResponse.data || []
      );

      setLevels(
        levelsResponse.data || []
      );

      setLecturers(
        lecturersResponse.data || []
      );

      setCourses(
        coursesResponse.data || []
      );

      setVenues(
        venuesResponse.data || []
      );

      setCourseOfferings(
        courseOfferingsResponse || []
      );

      setDays(
        daysResponse.data || []
      );

      setTimeSlots(
        timeSlotsResponse.data || []
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load filter data."
      );

    }

  };


  // ----------------------------------------------------
  // Handle Filter Change
  // ----------------------------------------------------

  const handleChange = (e) => {

    const {
      name,
      value
    } = e.target;

    setFilters((previous) => ({

      ...previous,

      [name]: value,

    }));

  };


  // ----------------------------------------------------
  // Apply Filters
  // ----------------------------------------------------

  const handleApply = async () => {

    await loadTimetable(
      filters
    );

    setFiltersOpen(false);

  };


  // ----------------------------------------------------
  // Reset Filters
  // ----------------------------------------------------

  const handleReset = async () => {

    setFilters(
      emptyFilters
    );

    await loadTimetable();

  };


  // ----------------------------------------------------
  // Refresh Timetable
  // ----------------------------------------------------

  const handleRefresh = async () => {

    await loadTimetable(
      filters
    );

  };


  // ----------------------------------------------------
  // Clear Entire Timetable
  // ----------------------------------------------------

  const handleClearTimetable = async () => {

    if (timetable.length === 0) {

      toast.info(
        "There is no timetable to clear."
      );

      return;

    }


    const confirmed =
      window.confirm(
        "Are you sure you want to clear the entire timetable? This action cannot be undone."
      );


    if (!confirmed) {

      return;

    }


    try {

      setLoading(true);


      await clearTimetable();


      setTimetable([]);


      toast.success(
        "Timetable cleared successfully."
      );


      await loadTimetable(
        filters
      );

    } catch (error) {

      console.error(
        "Clear timetable error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to clear timetable."
      );

    } finally {

      setLoading(false);

    }

  };
  
    // ----------------------------------------------------
  // Fetch Available Venues
  // ----------------------------------------------------

  const fetchAvailableVenues = async (
    dayId,
    timeSlotId
  ) => {

    const response =
      await api.get(
        "/timetables/available-venues",
        {
          params: {
            dayId,
            timeSlotId,
          },
        }
      );

    return response.data.data;

  };


  // ----------------------------------------------------
  // Add Timetable Entry
  // ----------------------------------------------------

  const handleAddSchedule = async ({
    day,
    timeSlot,
  }) => {

    try {

      const response =
        await fetchAvailableVenues(
          day.id,
          timeSlot.id
        );


      setAvailableVenues(
        response
      );


      setSelectedSlot({

        day,

        timeSlot,

      });


      setOpenModal(true);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load available venues"
      );

    }

  };


  // ----------------------------------------------------
  // Create Timetable Entry
  // ----------------------------------------------------

  const handleCreateSchedule = async (
    payload
  ) => {

    try {

      await addSingleNormalTimetable(
        payload
      );


      toast.success(
        "Lecture scheduled successfully"
      );


      setOpenModal(false);


      await loadTimetable(
        filters
      );

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to schedule lecture"
      );

    }

  };


  // ----------------------------------------------------
  // Generate Timetable Modal
  // ----------------------------------------------------

  const handleOpenGenerateModal = () => {

    setOpenGenerateModal(
      true
    );

  };


  const handleCloseGenerateModal = () => {

    setOpenGenerateModal(
      false
    );

  };


  // ----------------------------------------------------
  // Generated Timetable Callback
  // ----------------------------------------------------

  const handleGenerated = async () => {

    await loadTimetable(
      filters
    );

  };


  // ----------------------------------------------------
  // Timetable Lookup
  // ----------------------------------------------------

  const timetableLookup = useMemo(() => {

    const lookup = {};


    timetable.forEach((entry) => {

      const key =
        `${entry.day_id}-${entry.time_slot_id}`;


      if (!lookup[key]) {

        lookup[key] = {};

      }


      lookup[key][entry.venue_id] =
        entry;

    });


    return lookup;

  }, [timetable]);


  // ----------------------------------------------------
  // Active Filter Count
  // ----------------------------------------------------

  const activeFilterCount =
    Object
      .values(filters)
      .filter(Boolean)
      .length;


  // ----------------------------------------------------
  // Current View Summary
  // ----------------------------------------------------

  const selectedSession =
    sessions.find(
      (item) =>
        item.id === filters.sessionId
    );


  const selectedSemester =
    semesters.find(
      (item) =>
        item.id === filters.semesterId
    );


  const selectedFaculty =
    faculties.find(
      (item) =>
        item.id === filters.facultyId
    );


  const selectedDepartment =
    departments.find(
      (item) =>
        item.id === filters.departmentId
    );


  const selectedProgramme =
    programmes.find(
      (item) =>
        item.id === filters.programmeId
    );


  const selectedLevel =
    levels.find(
      (item) =>
        item.id === filters.levelId
    );


  const currentViewItems = [

    selectedSession?.name,

    selectedSemester?.name,

    selectedFaculty?.name,

    selectedDepartment?.name,

    selectedProgramme?.name,

    selectedLevel?.name,

  ].filter(Boolean);


  // ----------------------------------------------------
  // Render
  // ----------------------------------------------------

  return (

    <div className="space-y-6 p-4 sm:p-6">

      <PageHeader
        title="Timetables"
        subtitle="View and manage academic timetables."
      />


      {/* Main Header */}

      <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">

        <div>

          <h2 className="text-xl font-semibold text-gray-900">
            Academic Timetable
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Generate, view, and manage scheduled lectures.
          </p>

        </div>


        <button
          type="button"
          onClick={handleOpenGenerateModal}
          className="inline-flex w-full items-center justify-center rounded-lg bg-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:w-auto"
        >

          <span className="mr-2 text-base">
            +
          </span>

          Generate Timetable

        </button>

      </div>


      {/* Current View */}

      <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Current View
            </p>


            <div className="mt-2 flex flex-wrap items-center gap-2">

              {currentViewItems.length > 0 ? (

                currentViewItems.map(
                  (item, index) => (

                    <span
                      key={`${item}-${index}`}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {item}
                    </span>

                  )
                )

              ) : (

                <span className="text-sm text-gray-500">
                  All timetable records
                </span>

              )}

            </div>

          </div>


          <div className="text-sm">

            <span className="font-semibold text-gray-900">
              {timetable.length}
            </span>

            <span className="ml-1 text-gray-500">
              scheduled entries
            </span>

          </div>

        </div>

      </div>


      {/* Filters */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <button
          type="button"
          onClick={() =>
            setFiltersOpen(
              (previous) =>
                !previous
            )
          }
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition hover:bg-gray-50"
        >

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
              ⚙
            </div>


            <div>

              <h3 className="text-sm font-semibold text-gray-900">
                Timetable Filters
              </h3>


              <p className="text-xs text-gray-500">

                {activeFilterCount > 0

                  ? `${activeFilterCount} filter${activeFilterCount > 1 ? "s" : ""} applied`

                  : "Filter timetable by session, department, level, and more"

                }

              </p>

            </div>

          </div>


          <span className="text-lg text-gray-400">

            {filtersOpen
              ? "−"
              : "+"
            }

          </span>

        </button>


        {filtersOpen && (

          <div className="border-t border-gray-100 p-5">

            <TimetableFilters

              filters={filters}

              onChange={handleChange}

              onApply={handleApply}

              onReset={handleReset}

              sessions={sessions}

              semesters={semesters}

              faculties={faculties}

              departments={departments}

              programmes={programmes}

              levels={levels}

              lecturers={lecturers}

              courses={courses}

              venues={venues}

            />

          </div>

        )}

      </div>


      {/* Timetable */}

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-col gap-3 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <h3 className="text-lg font-semibold text-gray-900">
              Timetable
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              View scheduled lectures by day, time, and venue.
            </p>

          </div>


          <div className="flex flex-col gap-2 sm:flex-row">

            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >

              ↻

              <span className="ml-2">
                Refresh
              </span>

            </button>


            <button
              type="button"
              onClick={handleClearTimetable}
              disabled={
                loading ||
                timetable.length === 0
              }
              className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            >

              🗑

              <span className="ml-2">
                Clear Timetable
              </span>

            </button>

          </div>

        </div>


        <div className="p-4 sm:p-5">

          {loading ? (

            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">

              <div className="mb-4 h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

              <p className="text-sm font-medium text-gray-700">
                Loading timetable...
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Please wait while we load the schedule.
              </p>

            </div>

          ) : timetable.length === 0 ? (

            <div className="flex min-h-[350px] flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50 p-10 text-center">

              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-2xl shadow-sm">
                📅
              </div>

              <h3 className="text-base font-semibold text-gray-900">
                No timetable available
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                There are no scheduled lectures matching your current filters.
              </p>


              {activeFilterCount > 0 && (

                <button
                  type="button"
                  onClick={handleReset}
                  className="mt-5 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Clear Filters
                </button>

              )}

            </div>

          ) : (

            <div className="w-full overflow-x-auto overflow-y-hidden rounded-xl border border-gray-200">

              <div className="min-w-max h-[600px] overflow-y-auto">

                <TimetableGrid
                  timetable={timetable}
                  days={days}
                  timeSlots={timeSlots}
                  venues={venues}
                  timetableLookup={timetableLookup}
                  onAddSchedule={handleAddSchedule}
                />

              </div>

            </div>

          )}

        </div>

      </div>


      {/* Generate Timetable Modal */}

      <TimetableGenerateModal
        open={openGenerateModal}
        onClose={handleCloseGenerateModal}
        onGenerated={handleGenerated}
      />


      {/* Timetable Entry Modal */}

      <TimetableEntryModal
        open={openModal}
        onClose={() =>
          setOpenModal(false)
        }
        selectedSlot={selectedSlot}
        availableVenues={availableVenues}
        onSubmit={handleCreateSchedule}
      />

    </div>

  );

}


export default Timetables;