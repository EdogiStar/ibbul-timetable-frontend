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
  getSessions,
  createSession,
  updateSession,
  deleteSession,
} from "@/services/sessionService";

function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    is_current: false,
    status: "ACTIVE",
  });

  useEffect(() => {
    loadSessions();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      sessions.filter((session) =>
        session.name.toLowerCase().includes(keyword)
      )
    );
  }, [search, sessions]);

  const loadSessions = async () => {
    try {
      setLoading(true);

      const response = await getSessions();

      setSessions(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load sessions.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEdit = (session) => {
    setEditing(true);
    setSelectedId(session.id);

    setForm({
      name: session.name,
      is_current: session.is_current,
      status: session.status,
    });

    setOpenModal(true);
  };

  const handleDelete = (session) => {
    setSelectedId(session.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteSession(selectedId);

      toast.success("Session deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadSessions();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete session."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      name: "",
      is_current: false,
      status: "ACTIVE",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateSession(selectedId, form);
        toast.success("Session updated successfully.");
      } else {
        await createSession(form);
        toast.success("Session created successfully.");
      }

      resetForm();
      await loadSessions();
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
      key: "name",
      title: "Academic Session",
    },
    {
      key: "is_current",
      title: "Current",
      render: (row) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            row.is_current
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-600"
          }`}
        >
          {row.is_current ? "Current" : "No"}
        </span>
      ),
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
        title="Academic Sessions"
        subtitle="Manage academic sessions."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search session..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                name: "",
                is_current: false,
                status: "ACTIVE",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Session
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
        title={editing ? "Edit Session" : "Add Session"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Session" : "Create Session"}
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Academic Session
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="2025/2026"
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="is_current"
            type="checkbox"
            name="is_current"
            checked={form.is_current}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
          />

          <label
            htmlFor="is_current"
            className="text-sm font-medium"
          >
            Set as Current Academic Session
          </label>
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
        title="Delete Academic Session"
        message="Are you sure you want to delete this academic session? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Sessions;