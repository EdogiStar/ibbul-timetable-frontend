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
  getProgrammes,
  createProgramme,
  updateProgramme,
  deleteProgramme,
} from "@/services/programmeService";

import { getDepartments } from "@/services/departmentService";

function Programmes() {
  const [programmes, setProgrammes] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    department_id: "",
    code: "",
    name: "",
    duration_years: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    loadProgrammes();
    loadDepartments();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      programmes.filter(
        (programme) =>
          programme.name.toLowerCase().includes(keyword) ||
          programme.code.toLowerCase().includes(keyword) ||
          programme.departments?.name
            ?.toLowerCase()
            .includes(keyword)
      )
    );
  }, [search, programmes]);

  const loadProgrammes = async () => {
    try {
      setLoading(true);

      const response = await getProgrammes();

      setProgrammes(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load programmes.");
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
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (programme) => {
    setEditing(true);
    setSelectedId(programme.id);

    setForm({
      department_id: programme.department_id,
      code: programme.code,
      name: programme.name,
      duration_years: programme.duration_years,
      status: programme.status,
    });

    setOpenModal(true);
  };

  const handleDelete = (programme) => {
    setSelectedId(programme.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProgramme(selectedId);

      toast.success("Programme deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadProgrammes();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete programme."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      department_id: "",
      code: "",
      name: "",
      duration_years: "",
      status: "ACTIVE",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        duration_years: Number(form.duration_years),
      };

      if (editing) {
        await updateProgramme(selectedId, payload);
        toast.success("Programme updated successfully.");
      } else {
        await createProgramme(payload);
        toast.success("Programme created successfully.");
      }

      resetForm();
      await loadProgrammes();
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
      key: "department",
      title: "Department",
      render: (row) => row.departments?.name || "-",
    },
    {
      key: "code",
      title: "Code",
    },
    {
      key: "name",
      title: "Programme",
    },
    {
      key: "duration_years",
      title: "Duration",
      render: (row) => `${row.duration_years} Years`,
    },
    {
      key: "status",
      title: "Status",
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
        title="Programmes"
        subtitle="Manage academic programmes."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search programme..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                department_id: "",
                code: "",
                name: "",
                duration_years: "",
                status: "ACTIVE",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Programme
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
        title={editing ? "Edit Programme" : "Add Programme"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={
          editing ? "Update Programme" : "Create Programme"
        }
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
                {department.code} - {department.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Programme Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="B.Sc Computer Science"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Programme Code
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

        <div>
          <label className="mb-2 block text-sm font-medium">
            Duration (Years)
          </label>

          <input
            type="number"
            name="duration_years"
            value={form.duration_years}
            onChange={handleChange}
            min="1"
            max="10"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="4"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Status
          </label>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Programme"
        message="Are you sure you want to delete this programme? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Programmes;