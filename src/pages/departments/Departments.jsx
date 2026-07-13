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
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "@/services/departmentService";

import { getFaculties } from "@/services/facultyService";

function Departments() {
  const [departments, setDepartments] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [faculties, setFaculties] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    faculty_id: "",
    code: "",
    name: "",
  });

  useEffect(() => {
    loadDepartments();
    loadFaculties();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      departments.filter(
        (department) =>
          department.name.toLowerCase().includes(keyword) ||
          department.code.toLowerCase().includes(keyword) ||
          department.faculties?.name
            ?.toLowerCase()
            .includes(keyword)
      )
    );
  }, [search, departments]);

  const loadDepartments = async () => {
    try {
      setLoading(true);

      const response = await getDepartments();

      setDepartments(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load departments.");
    } finally {
      setLoading(false);
    }
  };

  const loadFaculties = async () => {
    try {
      const response = await getFaculties();
      setFaculties(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load faculties.");
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (department) => {
    setEditing(true);
    setSelectedId(department.id);

    setForm({
      faculty_id: department.faculty_id,
      code: department.code,
      name: department.name,
    });

    setOpenModal(true);
  };

  const handleDelete = (department) => {
    setSelectedId(department.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDepartment(selectedId);

      toast.success("Department deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadDepartments();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete department."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      faculty_id: "",
      code: "",
      name: "",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateDepartment(selectedId, form);
        toast.success("Department updated successfully.");
      } else {
        await createDepartment(form);
        toast.success("Department created successfully.");
      }

      resetForm();
      await loadDepartments();
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
      key: "faculty",
      title: "Faculty",
      render: (row) => row.faculties?.name || "-",
    },
    {
      key: "code",
      title: "Code",
    },
    {
      key: "name",
      title: "Department",
    },
    {
      render: (row) => (
        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          {row.status}
        </span>
      ),
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
        title="Departments"
        subtitle="Manage academic departments."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search department..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                faculty_id: "",
                code: "",
                name: "",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Department
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
        title={editing ? "Edit Department" : "Add Department"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={
          editing ? "Update Department" : "Create Department"
        }
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Faculty
          </label>

          <select
            name="faculty_id"
            value={form.faculty_id}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="">Select Faculty</option>

            {faculties.map((faculty) => (
              <option
                key={faculty.id}
                value={faculty.id}
              >
                {faculty.code} - {faculty.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Department Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Computer Science"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Department Code
          </label>

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="CSC"
            required
          />
        </div>

      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Department"
        message="Are you sure you want to delete this department? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Departments;