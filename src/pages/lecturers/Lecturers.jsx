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
  getLecturers,
  createLecturer,
  updateLecturer,
  deleteLecturer,
} from "@/services/lecturerService";

import { getDepartments } from "@/services/departmentService";

function Lecturers() {
  const [lecturers, setLecturers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    department_id: "",
    full_name: "",
    staff_id: "",
    max_hours_per_day: 8,
  });

  useEffect(() => {
    loadLecturers();
    loadDepartments();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      lecturers.filter(
        (lecturer) =>
          lecturer.full_name.toLowerCase().includes(keyword) ||
          lecturer.staff_id.toLowerCase().includes(keyword) ||
          lecturer.departments?.name.toLowerCase().includes(keyword)
      )
    );
  }, [search, lecturers]);

  const loadLecturers = async () => {
    try {
      setLoading(true);

      const response = await getLecturers();

      setLecturers(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load lecturers.");
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "max_hours_per_day"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleEdit = (lecturer) => {
    setEditing(true);
    setSelectedId(lecturer.id);

    setForm({
      department_id: lecturer.department_id,
      full_name: lecturer.full_name,
      staff_id: lecturer.staff_id,
      max_hours_per_day: lecturer.max_hours_per_day ?? 8,
    });

    setOpenModal(true);
  };

  const handleDelete = (lecturer) => {
    setSelectedId(lecturer.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLecturer(selectedId);

      toast.success("Lecturer deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadLecturers();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete lecturer."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      department_id: "",
      full_name: "",
      staff_id: "",
      max_hours_per_day: 8,
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateLecturer(selectedId, form);
        toast.success("Lecturer updated successfully.");
      } else {
        await createLecturer(form);
        toast.success("Lecturer created successfully.");
      }

      resetForm();
      await loadLecturers();
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
      key: "staff_id",
      title: "Staff ID",
    },
    {
      key: "full_name",
      title: "Full Name",
    },
    {
      key: "department",
      title: "Department",
      render: (row) => row.departments?.name,
    },
    {
      key: "max_hours_per_day",
      title: "Max Hours/Day",
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
        title="Lecturers"
        subtitle="Manage academic lecturers."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search lecturer..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                department_id: "",
                full_name: "",
                staff_id: "",
                max_hours_per_day: 8,
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Lecturer
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
        title={editing ? "Edit Lecturer" : "Add Lecturer"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Lecturer" : "Create Lecturer"}
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
            Full Name
          </label>

          <input
            type="text"
            name="full_name"
            value={form.full_name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Dr. John Doe"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Staff ID
          </label>

          <input
            type="text"
            name="staff_id"
            value={form.staff_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="CSC001"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Maximum Hours Per Day
          </label>

          <input
            type="number"
            name="max_hours_per_day"
            value={form.max_hours_per_day}
            onChange={handleChange}
            min="1"
            max="24"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Lecturer"
        message="Are you sure you want to delete this lecturer? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Lecturers;