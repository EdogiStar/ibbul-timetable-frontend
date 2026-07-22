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
    <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">

        {/* Session */}
        <select
          name="sessionId"
          value={filters.sessionId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Academic Session</option>

          {sessions.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Semester */}
        <select
          name="semesterId"
          value={filters.semesterId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Semester</option>

          {semesters.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Faculty */}
        <select
          name="facultyId"
          value={filters.facultyId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Faculty</option>

          {faculties.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Department */}
        <select
          name="departmentId"
          value={filters.departmentId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Department</option>

          {departments.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Programme */}
        <select
          name="programmeId"
          value={filters.programmeId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Programme</option>

          {programmes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Level */}
        <select
          name="levelId"
          value={filters.levelId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Level</option>

          {levels.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* Lecturer */}
        <select
          name="lecturerId"
          value={filters.lecturerId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Lecturer</option>

          {lecturers.map((item) => (
            <option key={item.id} value={item.id}>
              {item.full_name}
            </option>
          ))}
        </select>

        {/* Course */}
        <select
          name="courseId"
          value={filters.courseId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Course</option>

          {courses.map((item) => (
            <option key={item.id} value={item.id}>
              {item.course_code}
            </option>
          ))}
        </select>

        {/* Venue */}
        <select
          name="venueId"
          value={filters.venueId}
          onChange={onChange}
          className="rounded-lg border px-4 py-3"
        >
          <option value="">Venue</option>

          {venues.map((item) => (
            <option key={item.id} value={item.id}>
              {item.venue_name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 flex gap-3">
        <button
          onClick={onApply}
          className="rounded-lg bg-green-600 px-6 py-2 text-white hover:bg-green-700"
        >
          Apply Filters
        </button>

        <button
          onClick={onReset}
          className="rounded-lg border px-6 py-2 hover:bg-gray-50"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default TimetableFilters;