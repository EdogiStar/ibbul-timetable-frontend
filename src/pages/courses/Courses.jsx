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
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/services/courseService";

import { getDepartments } from "@/services/departmentService";
import { getLevels } from "@/services/levelService";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [levels, setLevels] = useState([]);

  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    department_id: "",
    course_code: "",
    course_title: "",
    level: "",
    semester: "First",
    student_count: 0,
    sessions_per_week: 1,
    hours_per_session: 1,
    preferred_venue_type: "Lecture Hall",
  });

  useEffect(() => {
    loadCourses();
    loadDepartments();
    loadLevels();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      courses.filter(
        (course) =>
          course.course_code
            .toLowerCase()
            .includes(keyword) ||
          course.course_title
            .toLowerCase()
            .includes(keyword) ||
          course.departments?.name
            ?.toLowerCase()
            .includes(keyword)
      )
    );
  }, [search, courses]);

  const loadCourses = async () => {
    try {
      setLoading(true);

      const response = await getCourses();

      setCourses(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await getDepartments();

      setDepartments(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments.");
    }
  };

  const loadLevels = async () => {
    try {
      const response = await getLevels();

      setLevels(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load levels.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]:
        [
          "student_count",
          "sessions_per_week",
          "hours_per_session",
        ].includes(name)
          ? Number(value)
          : value,
    });
  };

  const handleEdit = (course) => {
    setEditing(true);
    setSelectedId(course.id);

    setForm({
      department_id: course.department_id,
      course_code: course.course_code,
      course_title: course.course_title,
      level: course.level,
      semester: course.semester,
      student_count: course.student_count,
      sessions_per_week: course.sessions_per_week,
      hours_per_session: course.hours_per_session,
      preferred_venue_type:
        course.preferred_venue_type,
    });

    setOpenModal(true);
  };

  const handleDelete = (course) => {
    setSelectedId(course.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCourse(selectedId);

      toast.success("Course deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadCourses();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete course."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      department_id: "",
      course_code: "",
      course_title: "",
      level: "",
      semester: "First",
      student_count: 0,
      sessions_per_week: 1,
      hours_per_session: 1,
      preferred_venue_type: "Lecture Hall",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateCourse(selectedId, form);
        toast.success("Course updated successfully.");
      } else {
        await createCourse(form);
        toast.success("Course created successfully.");
      }

      resetForm();
      await loadCourses();
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
      key: "course_code",
      title: "Code",
    },
    {
      key: "course_title",
      title: "Course Title",
    },
    {
      key: "department",
      title: "Department",
      render: (row) =>
        row.departments?.name,
    },
    {
      key: "level",
      title: "Level",
    },
    {
      key: "semester",
      title: "Semester",
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
        title="Courses"
        subtitle="Manage university courses and scheduling requirements."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search course..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                department_id: "",
                course_code: "",
                course_title: "",
                level: "",
                semester: "First",
                student_count: 0,
                sessions_per_week: 1,
                hours_per_session: 1,
                preferred_venue_type: "Lecture Hall",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Course
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
        title={editing ? "Edit Course" : "Add Course"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Course" : "Create Course"}
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Department
          </label>

          <select
            name="department_id"
            value={form.department_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option
                key={department.id}
                value={department.id}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Course Code
          </label>

          <input
            type="text"
            name="course_code"
            value={form.course_code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="CSC401"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Course Title
          </label>

          <input
            type="text"
            name="course_title"
            value={form.course_title}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Software Engineering"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Level
          </label>

          <select
            name="level"
            value={form.level}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Select Level</option>

            {levels.map((level) => (
              <option
                key={level.id}
                value={level.level_number}
              >
                {level.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Semester
          </label>

          <select
            name="semester"
            value={form.semester}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="First">
              First
            </option>

            <option value="Second">
              Second
            </option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Number of Students
          </label>

          <input
            type="number"
            name="student_count"
            value={form.student_count}
            onChange={handleChange}
            min="0"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Sessions Per Week
          </label>

          <input
            type="number"
            name="sessions_per_week"
            value={form.sessions_per_week}
            onChange={handleChange}
            min="1"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Hours Per Session
          </label>

          <input
            type="number"
            name="hours_per_session"
            value={form.hours_per_session}
            onChange={handleChange}
            min="1"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Preferred Venue Type
          </label>

          <select
            name="preferred_venue_type"
            value={form.preferred_venue_type}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="Lecture Hall">
              Lecture Hall
            </option>

            <option value="Classroom">
              Classroom
            </option>

            <option value="Laboratory">
              Laboratory
            </option>
          </select>
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Course"
        message="Are you sure you want to delete this course? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Courses;