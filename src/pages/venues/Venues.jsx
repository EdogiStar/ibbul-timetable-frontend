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
  getVenues,
  createVenue,
  updateVenue,
  deleteVenue,
} from "@/services/venueService";

import { getFaculties } from "@/services/facultyService";

function Venues() {
  const [venues, setVenues] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({
    faculty_id: "",
    venue_code: "",
    venue_name: "",
    capacity: "",
    venue_type: "Lecture Hall",
  });

  useEffect(() => {
    loadVenues();
    loadFaculties();
  }, []);

  useEffect(() => {
    const keyword = search.toLowerCase();

    setFiltered(
      venues.filter(
        (venue) =>
          venue.venue_name.toLowerCase().includes(keyword) ||
          venue.venue_code.toLowerCase().includes(keyword) ||
          venue.faculties?.name.toLowerCase().includes(keyword)
      )
    );
  }, [search, venues]);

  const loadVenues = async () => {
    try {
      setLoading(true);

      const response = await getVenues();

      setVenues(response.data);
      setFiltered(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load venues.");
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
      [e.target.name]:
        e.target.name === "capacity"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleEdit = (venue) => {
    setEditing(true);
    setSelectedId(venue.id);

    setForm({
      faculty_id: venue.faculty_id,
      venue_code: venue.venue_code,
      venue_name: venue.venue_name,
      capacity: venue.capacity,
      venue_type: venue.venue_type,
    });

    setOpenModal(true);
  };

  const handleDelete = (venue) => {
    setSelectedId(venue.id);
    setOpenDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteVenue(selectedId);

      toast.success("Venue deleted successfully.");

      setOpenDelete(false);
      setSelectedId(null);

      await loadVenues();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete venue."
      );
    }
  };

  const resetForm = () => {
    setEditing(false);
    setSelectedId(null);

    setForm({
      faculty_id: "",
      venue_code: "",
      venue_name: "",
      capacity: "",
      venue_type: "Lecture Hall",
    });

    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editing) {
        await updateVenue(selectedId, form);
        toast.success("Venue updated successfully.");
      } else {
        await createVenue(form);
        toast.success("Venue created successfully.");
      }

      resetForm();
      await loadVenues();
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
      key: "venue_code",
      title: "Code",
    },
    {
      key: "venue_name",
      title: "Venue",
    },
    {
      key: "faculty",
      title: "Faculty",
      render: (row) => row.faculties?.name,
    },
    {
      key: "venue_type",
      title: "Type",
    },
    {
      key: "capacity",
      title: "Capacity",
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
        title="Venues"
        subtitle="Manage lecture venues and classrooms."
      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search venue..."
          />

          <button
            onClick={() => {
              setEditing(false);
              setSelectedId(null);

              setForm({
                faculty_id: "",
                venue_code: "",
                venue_name: "",
                capacity: "",
                venue_type: "Lecture Hall",
              });

              setOpenModal(true);
            }}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"
          >
            <Plus size={18} />
            Add Venue
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
        title={editing ? "Edit Venue" : "Add Venue"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Venue" : "Create Venue"}
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
                {faculty.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Venue Name
          </label>

          <input
            type="text"
            name="venue_name"
            value={form.venue_name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Computer Science Lecture Hall"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Venue Code
          </label>

          <input
            type="text"
            name="venue_code"
            value={form.venue_code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="CSLH01"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Capacity
          </label>

          <input
            type="number"
            name="capacity"
            value={form.capacity}
            onChange={handleChange}
            min="1"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="120"
            required
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            Venue Type
          </label>

          <select
            name="venue_type"
            value={form.venue_type}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          >
            <option value="Lecture Hall">Lecture Hall</option>
            <option value="Classroom">Classroom</option>
            <option value="Laboratory">Laboratory</option>
          </select>
        </div>
      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Venue"
        message="Are you sure you want to delete this venue? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />
    </div>
  );
}

export default Venues;
  
  