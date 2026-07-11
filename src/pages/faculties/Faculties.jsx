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
  getFaculties,
  createFaculty,
  updateFaculty,
  deleteFaculty,
} from "@/services/facultyService";

function Faculties() {
  const [faculties, setFaculties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    code: "",
  });

  useEffect(() => {
    loadFaculties();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      faculties.filter(
        (faculty) =>
          faculty.name.toLowerCase().includes(keyword) ||
          faculty.code.toLowerCase().includes(keyword)
      )
    );
  }, [search, faculties]);

  const loadFaculties = async () => {
    try {
      setLoading(true);

      const response = await getFaculties();

      setFaculties(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load faculties.");
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

  const handleEdit = (faculty) => {
    setEditing(true);
    setSelectedId(faculty.id);

    setForm({
      name: faculty.name,
      code: faculty.code,
    });

    setOpenModal(true);
  };

  const handleDelete = (faculty) => {
    setSelectedId(faculty.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFaculty(selectedId);

      toast.success("Faculty deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadFaculties();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete faculty."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      name: "",
      code: "",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateFaculty(selectedId, form);
        toast.success("Faculty updated successfully.");
      } else {
        await createFaculty(form);
        toast.success("Faculty created successfully.");
      }

      resetForm();
      await loadFaculties();
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
      title: "Faculty",
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
        title="Faculties"
        subtitle="Manage all university faculties."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search faculty..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                name: "",
                code: "",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Faculty
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
        title={editing ? "Edit Faculty" : "Add Faculty"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Faculty" : "Create Faculty"}
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Faculty Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Faculty of Science"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Faculty Code
          </label>

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="SCI"
            required
          />
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Faculty"
        message="Are you sure you want to delete this faculty? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Faculties;