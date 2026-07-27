function TimetableFilters({
  filters,
  onChange,
  onApply,
  onReset,

  sessions = [],
  semesters = [],
  faculties = [],
  departments = [],
  programmes = [],
  levels = [],
  lecturers = [],
  courses = [],
  venues = [],
}) {

  return (

    <div className="space-y-6">

      {/* ==================================================
          Filter Fields
      ================================================== */}

      <div className="
        grid
        grid-cols-1
        gap-5
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      ">


        {/* ==================================================
            Academic Session
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="sessionId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Academic Session
          </label>

          <select
            id="sessionId"
            name="sessionId"
            value={filters.sessionId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Sessions
            </option>

            {sessions.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Semester
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="semesterId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Semester
          </label>

          <select
            id="semesterId"
            name="semesterId"
            value={filters.semesterId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Semesters
            </option>

            {semesters.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Faculty
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="facultyId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Faculty
          </label>

          <select
            id="facultyId"
            name="facultyId"
            value={filters.facultyId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Faculties
            </option>

            {faculties.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Department
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="departmentId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Department
          </label>

          <select
            id="departmentId"
            name="departmentId"
            value={filters.departmentId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Departments
            </option>

            {departments.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Programme
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="programmeId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Programme
          </label>

          <select
            id="programmeId"
            name="programmeId"
            value={filters.programmeId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Programmes
            </option>

            {programmes.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Level
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="levelId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Level
          </label>

          <select
            id="levelId"
            name="levelId"
            value={filters.levelId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Levels
            </option>

            {levels.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.name}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Lecturer
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="lecturerId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Lecturer
          </label>

          <select
            id="lecturerId"
            name="lecturerId"
            value={filters.lecturerId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Lecturers
            </option>

            {lecturers.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.full_name}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Course
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="courseId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Course
          </label>

          <select
            id="courseId"
            name="courseId"
            value={filters.courseId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Courses
            </option>

            {courses.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.course_code}
              </option>

            ))}

          </select>

        </div>


        {/* ==================================================
            Venue
        ================================================== */}

        <div className="space-y-2">

          <label
            htmlFor="venueId"
            className="
              block
              text-sm
              font-medium
              text-gray-700
            "
          >
            Venue
          </label>

          <select
            id="venueId"
            name="venueId"
            value={filters.venueId}
            onChange={onChange}
            className="
              w-full
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-green-500
              focus:ring-2
              focus:ring-green-100
            "
          >

            <option value="">
              All Venues
            </option>

            {venues.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                {item.venue_name}
              </option>

            ))}

          </select>

        </div>

      </div>


      {/* ==================================================
          Filter Actions
      ================================================== */}

      <div className="
        flex
        flex-col
        gap-3
        border-t
        border-gray-100
        pt-5
        sm:flex-row
        sm:items-center
      ">

        <button
          type="button"
          onClick={onApply}
          className="
            inline-flex
            items-center
            justify-center
            rounded-lg
            bg-green-600
            px-6
            py-2.5
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-green-700
            focus:outline-none
            focus:ring-2
            focus:ring-green-500
            focus:ring-offset-2
          "
        >
          Apply Filters
        </button>


        <button
          type="button"
          onClick={onReset}
          className="
            inline-flex
            items-center
            justify-center
            rounded-lg
            border
            border-gray-200
            bg-white
            px-6
            py-2.5
            text-sm
            font-medium
            text-gray-700
            transition
            hover:bg-gray-50
            focus:outline-none
            focus:ring-2
            focus:ring-gray-200
            focus:ring-offset-2
          "
        >
          Reset
        </button>

      </div>

    </div>

  );

}

export default TimetableFilters;