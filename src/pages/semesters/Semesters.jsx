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
  getSemesters,
  createSemester,
  updateSemester,
  deleteSemester,
} from "@/services/semesterService";

function Semesters() {
  const [semesters, setSemesters] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    code: "",
    name: "",
  });

  useEffect(() => {
    loadSemesters();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      semesters.filter(
        (semester) =>
          semester.name.toLowerCase().includes(keyword) ||
          semester.code.toLowerCase().includes(keyword)
      )
    );
  }, [search, semesters]);

  const loadSemesters = async () => {
    try {
      setLoading(true);

      const response = await getSemesters();

      setSemesters(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load semesters.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = (semester) => {
    setEditing(true);
    setSelectedId(semester.id);

    setForm({
      code: semester.code,
      name: semester.name,
    });

    setOpenModal(true);
  };

  const handleDelete = (semester) => {
    setSelectedId(semester.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSemester(selectedId);

      toast.success("Semester deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadSemesters();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete semester."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      code: "",
      name: "",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateSemester(selectedId, form);
        toast.success("Semester updated successfully.");
      } else {
        await createSemester(form);
        toast.success("Semester created successfully.");
      }

      resetForm();
      await loadSemesters();
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
      key: "code",
      title: "Code",
    },
    {
      key: "name",
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
        title="Semesters"
        subtitle="Manage academic semesters."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search semester..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                code: "",
                name: "",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Semester
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
        title={editing ? "Edit Semester" : "Add Semester"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Semester" : "Create Semester"}
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Semester Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="First Semester"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Semester Code
          </label>

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="FIRST"
            required
          />
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Semester"
        message="Are you sure you want to delete this semester? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Semesters;
  