import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";
import ActionButtons from "@/components/common/ActionButtons";
import FormModal from "@/components/common/FormModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import {
  getCourseOfferings,
  createCourseOffering,
  updateCourseOffering,
  deleteCourseOffering,
} from "@/services/courseOfferingService";

import { getCourses } from "@/services/courseService";
import { getProgrammes } from "@/services/programmeService";
import { getLevels } from "@/services/levelService";
import { getSessions } from "@/services/sessionService";
import { getSemesters } from "@/services/semesterService";

function CourseOfferings() {
  const [offerings, setOfferings] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [courses, setCourses] = useState([]);
  const [programmes, setProgrammes] = useState([]);
  const [levels, setLevels] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [semesters, setSemesters] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    course_id: "",
    programme_id: "",
    level_id: "",
    session_id: "",
    semester_id: "",
    is_compulsory: true,
  });

  useEffect(() => {
    loadOfferings();
    loadCourses();
    loadProgrammes();
    loadLevels();
    loadSessions();
    loadSemesters();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      offerings.filter(
        (item) =>
          item.courses?.course_code
            ?.toLowerCase()
            .includes(keyword) ||
          item.courses?.course_title
            ?.toLowerCase()
            .includes(keyword) ||
          item.programmes?.name
            ?.toLowerCase()
            .includes(keyword)
      )
    );
  }, [search, offerings]);

  const loadOfferings = async () => {
    try {
      setLoading(true);

      const response = await getCourseOfferings();

      setOfferings(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load course offerings.");
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const response = await getCourses();
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadProgrammes = async () => {
    try {
      const response = await getProgrammes();
      setProgrammes(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadLevels = async () => {
    try {
      const response = await getLevels();
      setLevels(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSessions = async () => {
    try {
      const response = await getSessions();
      setSessions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const loadSemesters = async () => {
    try {
      const response = await getSemesters();
      setSemesters(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleEdit = (item) => {
    setEditing(true);
    setSelectedId(item.id);

    setForm({
      course_id: item.course_id,
      programme_id: item.programme_id,
      level_id: item.level_id,
      session_id: item.session_id,
      semester_id: item.semester_id,
      is_compulsory: item.is_compulsory,
    });

    setOpenModal(true);
  };

  const handleDelete = (item) => {
    setSelectedId(item.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCourseOffering(selectedId);

      toast.success(
        "Course offering deleted successfully."
      );

      setOpenDelete(false);
      setSelectedId(null);

      await loadOfferings();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete course offering."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      course_id: "",
      programme_id: "",
      level_id: "",
      session_id: "",
      semester_id: "",
      is_compulsory: true,
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateCourseOffering(
          selectedId,
          form
        );

        toast.success(
          "Course offering updated successfully."
        );
      } else {
        await createCourseOffering(form);

        toast.success(
          "Course offering created successfully."
        );
      }

      resetForm();
      await loadOfferings();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Operation failed."
      );
    }
  };

  const columns = [
    {
      key: "course",
      title: "Course",
      render: (row) =>
        row.courses?.course_code,
    },
    {
      key: "programme",
      title: "Programme",
      render: (row) =>
        row.programmes?.code,
    },
    {
      key: "level",
      title: "Level",
      render: (row) =>
        row.levels?.name,
    },
    {
      key: "session",
      title: "Session",
      render: (row) =>
        row.academic_sessions?.name,
    },
    {
      key: "semester",
      title: "Semester",
      render: (row) =>
        row.semesters?.name,
    },
    {
      key: "actions",
      title: "Actions",
      render: (row) => (
        <ActionButtons
          onEdit={() => handleEdit(row)}
          onDelete={() => handleDelete(row)}
        />
      ),
    },
  ];
  
  
    return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Course Offerings"
        subtitle="Assign courses to programmes, levels, sessions and semesters."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search course offering..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                course_id: "",
                programme_id: "",
                level_id: "",
                session_id: "",
                semester_id: "",
                is_compulsory: true,
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Course Offering
          </button>
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          loading={loading}
        />
      </div>

      <FormModal
        open={openModal}
        title={
          editing
            ? "Edit Course Offering"
            : "Add Course Offering"
        }
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={
          editing
            ? "Update Course Offering"
            : "Create Course Offering"
        }
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Course
          </label>

          <select
            name="course_id"
            value={form.course_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Select Course</option>

            {courses.map((course) => (
              <option
                key={course.id}
                value={course.id}
              >
                {course.course_code} - {course.course_title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Programme
          </label>

          <select
            name="programme_id"
            value={form.programme_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Select Programme</option>

            {programmes.map((programme) => (
              <option
                key={programme.id}
                value={programme.id}
              >
                {programme.code} - {programme.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Level
          </label>

          <select
            name="level_id"
            value={form.level_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Select Level</option>

            {levels.map((level) => (
              <option
                key={level.id}
                value={level.id}
              >
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Academic Session
          </label>

          <select
            name="session_id"
            value={form.session_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">
              Select Academic Session
            </option>

            {sessions.map((session) => (
              <option
                key={session.id}
                value={session.id}
              >
                {session.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Semester
          </label>

          <select
            name="semester_id"
            value={form.semester_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Select Semester</option>

            {semesters.map((semester) => (
              <option
                key={semester.id}
                value={semester.id}
              >
                {semester.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            type="checkbox"
            id="is_compulsory"
            name="is_compulsory"
            checked={form.is_compulsory}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />

          <label
            htmlFor="is_compulsory"
            className="text-sm font-medium"
          >
            Compulsory Course
          </label>
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Course Offering"
        message="Are you sure you want to delete this course offering? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default CourseOfferings;