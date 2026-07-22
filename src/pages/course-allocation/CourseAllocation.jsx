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
  getCourseAllocations,
  createCourseAllocation,
  updateCourseAllocation,
  deleteCourseAllocation,
} from "@/services/courseAllocationService";

import { getCourseOfferings } from "@/services/courseOfferingService";
import { getLecturers } from "@/services/lecturerService";

function CourseAllocation() {
  const [allocations, setAllocations] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [courseOfferings, setCourseOfferings] = useState([]);
  const [lecturers, setLecturers] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    course_offering_id: "",
    lecturer_id: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      allocations.filter((item) => {
        const course =
          item.course_offerings?.courses?.course_code || "";

        const lecturer =
          item.lecturers?.full_name || "";

        return (
          course.toLowerCase().includes(keyword) ||
          lecturer.toLowerCase().includes(keyword)
        );
      })
    );
  }, [search, allocations]);

  const loadData = async () => {
  try {
    setLoading(true);

    const [
      allocationsRes,
      offeringsRes,
      lecturersRes,
    ] = await Promise.all([
      getCourseAllocations(),
      getCourseOfferings(),
      getLecturers(),
    ]);

    setAllocations(allocationsRes);
    setFiltered(allocationsRes);

    setCourseOfferings(offeringsRes);
    setLecturers(lecturersRes);

  } catch (error) {
    console.error("Load Data Error:", error);

    toast.error(
      error.response?.data?.message ||
      "Failed to load data."
    );

  } finally {
    setLoading(false);
  }
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleEdit = (row) => {
    setEditing(true);
    setSelectedId(row.id);

    setForm({
      course_offering_id: row.course_offering_id,
      lecturer_id: row.lecturer_id,
    });

    setOpenModal(true);
  };

  const handleDelete = (row) => {
    setSelectedId(row.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCourseAllocation(selectedId);

      toast.success(
        "Course allocation deleted successfully."
      );

      setOpenDelete(false);
      setSelectedId(null);

      await loadData();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete course allocation."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      course_offering_id: "",
      lecturer_id: "",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateCourseAllocation(
          selectedId,
          form
        );

        toast.success(
          "Course allocation updated successfully."
        );
      } else {
        await createCourseAllocation(form);

        toast.success(
          "Course allocation created successfully."
        );
      }

      resetForm();
      await loadData();
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
        `${row.course_offerings?.courses?.course_code} - ${row.course_offerings?.courses?.course_title}`,
    },
    {
      key: "programme",
      title: "Programme",
      render: (row) =>
        row.course_offerings?.programmes?.name,
    },
    {
      key: "level",
      title: "Level",
      render: (row) =>
        row.course_offerings?.levels?.name,
    },
    {
      key: "lecturer",
      title: "Lecturer",
      render: (row) =>
        row.lecturers?.full_name,
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
    }
    ];
    
      return (
    <div className="space-y-6 p-6">
      <PageHeader
        title="Course Allocation"
        subtitle="Assign lecturers to course offerings."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search allocation..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                course_offering_id: "",
                lecturer_id: "",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Allocate Lecturer
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
            ? "Edit Course Allocation"
            : "Allocate Lecturer"
        }
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={
          editing
            ? "Update Allocation"
            : "Create Allocation"
        }
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Course Offering
          </label>

          <select
            name="course_offering_id"
            value={form.course_offering_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">
              Select Course Offering
            </option>

            {courseOfferings.map((offering) => (
              <option
                key={offering.id}
                value={offering.id}
              >
                {offering.courses?.course_code} -{" "}
                {offering.courses?.course_title} (
                {offering.programmes?.code})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Lecturer
          </label>

          <select
            name="lecturer_id"
            value={form.lecturer_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">
              Select Lecturer
            </option>

            {lecturers.map((lecturer) => (
              <option
                key={lecturer.id}
                value={lecturer.id}
              >
                {lecturer.full_name} (
                {lecturer.staff_id})
              </option>
            ))}
          </select>
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Course Allocation"
        message="Are you sure you want to remove this course allocation? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default CourseAllocation;
    
    
    
    