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
  getLevels,
  createLevel,
  updateLevel,
  deleteLevel,
} from "@/services/levelService";

function Levels() {
  const [levels, setLevels] = useState([]);
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
    level_number: "",
  });

  useEffect(() => {
    loadLevels();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      levels.filter(
        (level) =>
          level.name.toLowerCase().includes(keyword) ||
          level.code.toLowerCase().includes(keyword) ||
          String(level.level_number).includes(keyword)
      )
    );
  }, [search, levels]);

  const loadLevels = async () => {
    try {
      setLoading(true);

      const response = await getLevels();

      setLevels(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load levels.");
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

  const handleEdit = (level) => {
    setEditing(true);
    setSelectedId(level.id);

    setForm({
      code: level.code,
      name: level.name,
      level_number: level.level_number,
    });

    setOpenModal(true);
  };

  const handleDelete = (level) => {
    setSelectedId(level.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLevel(selectedId);

      toast.success("Level deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadLevels();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete level."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      code: "",
      name: "",
      level_number: "",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        level_number: Number(form.level_number),
      };

      if (editing) {
        await updateLevel(selectedId, payload);
        toast.success("Level updated successfully.");
      } else {
        await createLevel(payload);
        toast.success("Level created successfully.");
      }

      resetForm();
      await loadLevels();
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
      title: "Level",
    },
    {
      key: "level_number",
      title: "Level Number",
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
        title="Levels"
        subtitle="Manage academic levels."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search level..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                code: "",
                name: "",
                level_number: "",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Level
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
        title={editing ? "Edit Level" : "Add Level"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Level" : "Create Level"}
      >
        <div>
          <label className="mb-2 block text-sm font-medium">
            Level Name
          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="100 Level"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Level Code
          </label>

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="100"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Level Number
          </label>

          <input
            type="number"
            name="level_number"
            value={form.level_number}
            onChange={handleChange}
            min="100"
            max="1000"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="100"
            required
          />
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Level"
        message="Are you sure you want to delete this level? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Levels;