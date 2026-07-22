import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { toast } from "sonner";

import PageHeader from "@/components/PageHeader";

import TimetableFilters
  from "@/components/timetable/TimetableFilters";

import TimetableGrid
  from "@/components/timetable/TimetableGrid";

import TimetableEntryModal
  from "@/components/timetable/TimetableEntryModal";


import {
  getTimetable,
  createTimetableEntry,
} from "@/services/timetableService";


import { getDays }
  from "@/services/dayService";

import { getTimeSlots }
  from "@/services/timeSlotService";

import { getSessions }
  from "@/services/sessionService";

import { getSemesters }
  from "@/services/semesterService";

import { getFaculties }
  from "@/services/facultyService";

import { getDepartments }
  from "@/services/departmentService";

import { getProgrammes }
  from "@/services/programmeService";

import { getLevels }
  from "@/services/levelService";

import { getLecturers }
  from "@/services/lecturerService";

import { getCourses }
  from "@/services/courseService";

import { getVenues }
  from "@/services/venueService";


function Timetables() {

  /**
   * ----------------------------------------------------
   * Timetable Data
   * ----------------------------------------------------
   */

  const [timetable, setTimetable] =
    useState([]);

  const [days, setDays] =
    useState([]);

  const [timeSlots, setTimeSlots] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  /**
   * ----------------------------------------------------
   * Timetable Entry Modal
   * ----------------------------------------------------
   */

  const [openModal, setOpenModal] =
    useState(false);

  const [selectedSlot, setSelectedSlot] =
    useState(null);


  /**
   * ----------------------------------------------------
   * Filter Options
   * ----------------------------------------------------
   */

  const [sessions, setSessions] =
    useState([]);

  const [semesters, setSemesters] =
    useState([]);

  const [faculties, setFaculties] =
    useState([]);

  const [departments, setDepartments] =
    useState([]);

  const [programmes, setProgrammes] =
    useState([]);

  const [levels, setLevels] =
    useState([]);

  const [lecturers, setLecturers] =
    useState([]);

  const [courses, setCourses] =
    useState([]);

  const [venues, setVenues] =
    useState([]);


  /**
   * ----------------------------------------------------
   * Filters
   * ----------------------------------------------------
   */

  const [filters, setFilters] = useState({

    sessionId: "",

    semesterId: "",

    facultyId: "",

    departmentId: "",

    programmeId: "",

    levelId: "",

    lecturerId: "",

    courseId: "",

    venueId: "",

  });


  /**
   * ----------------------------------------------------
   * Initial Load
   * ----------------------------------------------------
   */

  useEffect(() => {

    loadTimetable();

    loadFilterData();

  }, []);
  
    /**
   * ----------------------------------------------------
   * Load Timetable
   * ----------------------------------------------------
   */

  const loadTimetable = async (
    appliedFilters = {}
  ) => {

    try {

      setLoading(true);

      const response =
        await getTimetable(
          appliedFilters
        );

      setTimetable(
        response.data
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


  /**
   * ----------------------------------------------------
   * Load Filter Data
   * ----------------------------------------------------
   */

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

        getDays(),

        getTimeSlots(),

      ]);


      setSessions(
        sessionsResponse.data
      );

      setSemesters(
        semestersResponse.data
      );

      setFaculties(
        facultiesResponse.data
      );

      setDepartments(
        departmentsResponse.data
      );

      setProgrammes(
        programmesResponse.data
      );

      setLevels(
        levelsResponse.data
      );

      setLecturers(
        lecturersResponse.data
      );

      setCourses(
        coursesResponse.data
      );

      setVenues(
        venuesResponse.data
      );

      setDays(
        daysResponse.data
      );

      setTimeSlots(
        timeSlotsResponse.data
      );

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load filter data."
      );

    }

  };


  /**
   * ----------------------------------------------------
   * Handle Filter Change
   * ----------------------------------------------------
   */

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;

    setFilters(
      (previous) => ({

        ...previous,

        [name]: value,

      })
    );

  };


  /**
   * ----------------------------------------------------
   * Apply Filters
   * ----------------------------------------------------
   */

  const handleApply = async () => {

    await loadTimetable(
      filters
    );

  };


  /**
   * ----------------------------------------------------
   * Reset Filters
   * ----------------------------------------------------
   */

  const handleReset = async () => {

    const resetFilters = {

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


    setFilters(
      resetFilters
    );


    await loadTimetable();

  };


  /**
   * ----------------------------------------------------
   * Add Timetable Entry
   * ----------------------------------------------------
   *
   * Called when the user clicks (+)
   * on a free venue.
   * ----------------------------------------------------
   */

  const handleAddSchedule = ({
    day,
    timeSlot,
    venue,
  }) => {

    setSelectedSlot({

      day,

      timeSlot,

      venue,

    });


    setOpenModal(true);

  };


  /**
   * ----------------------------------------------------
   * Submit New Timetable Entry
   * ----------------------------------------------------
   */

  const handleSubmitSchedule = async (
    payload
  ) => {

    try {

      await createTimetableEntry(
        payload
      );


      toast.success(
        "Timetable entry added successfully."
      );


      setOpenModal(false);

      setSelectedSlot(null);


      await loadTimetable(
        filters
      );


    } catch (error) {

      console.error(
        "Failed to create timetable entry:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        "Failed to add timetable entry."

      );

    }

  };


  /**
   * ----------------------------------------------------
   * Timetable Lookup
   * ----------------------------------------------------
   *
   * Creates a fast lookup object:
   *
   * {
   *   "dayId-timeSlotId": {
   *      venueId: timetableEntry
   *   }
   * }
   * ----------------------------------------------------
   */

  const timetableLookup = useMemo(() => {

    const lookup = {};


    timetable.forEach(
      (entry) => {

        const key =
          `${entry.day_id}-${entry.time_slot_id}`;


        if (!lookup[key]) {

          lookup[key] = {};

        }


        lookup[key][
          entry.venue_id
        ] = entry;

      }
    );


    return lookup;

  }, [timetable]);
  
    /**
   * ----------------------------------------------------
   * Render
   * ----------------------------------------------------
   */

  return (

    <div className="space-y-6 p-6">

      <PageHeader
        title="Timetables"
        subtitle="View and filter academic timetables."
      />


      {/* ----------------------------------------
          Timetable Filters
      ---------------------------------------- */}

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


      {/* ----------------------------------------
          Timetable Grid
      ---------------------------------------- */}

      {loading ? (

        <div className="rounded-xl border bg-white p-10 text-center text-gray-500 shadow-sm">

          Loading timetable...

        </div>

      ) : (

        <TimetableGrid

          timetable={timetable}

          days={days}

          timeSlots={timeSlots}

          venues={venues}

          timetableLookup={timetableLookup}

          onAddSchedule={
            handleAddSchedule
          }

        />

      )}


      {/* ----------------------------------------
          Add Timetable Entry Modal
      ---------------------------------------- */}

      <TimetableEntryModal

        open={openModal}

        onClose={() => {

          setOpenModal(false);

          setSelectedSlot(null);

        }}

        onSubmit={
          handleSubmitSchedule
        }

        selectedSlot={
          selectedSlot
        }

      />

    </div>

  );

}


export default Timetables;