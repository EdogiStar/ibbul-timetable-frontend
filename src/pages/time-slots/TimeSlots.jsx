import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/common/SearchBar";
import DataTable from "@/components/common/DataTable";
import ActionButtons from "@/components/common/ActionButtons";
import FormModal from "@/components/common/FormModal";
import ConfirmDialog from "@/components/common/ConfirmDialog";

import { getTimeSlots, createTimeSlot,  updateTimeSlot, deleteTimeSlot } from "@/services/timeSlotService";

function TimeSlots() {

  /**
   * ------------------------------------------
   * State
   * ------------------------------------------
   */

  const [timeSlots, setTimeSlots] = useState([]);

  const [filtered, setFiltered] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);

  const [openDelete, setOpenDelete] = useState(false);

  const [editing, setEditing] = useState(false);

  const [selectedId, setSelectedId] = useState(null);

  const [form, setForm] = useState({

    code: "",

    start_time: "",

    end_time: "",

    sort_order: "",

  });

  /**
   * ------------------------------------------
   * Initial Load
   * ------------------------------------------
   */

  useEffect(() => {

    loadTimeSlots();

  }, []);

  /**
   * ------------------------------------------
   * Search
   * ------------------------------------------
   */

  useEffect(() => {

    const keyword = search.toLowerCase();

    setFiltered(

      timeSlots.filter(

        (slot) =>

          slot.code.toLowerCase().includes(keyword) ||

          slot.start_time.includes(keyword) ||

          slot.end_time.includes(keyword) ||

          String(slot.sort_order).includes(keyword)

      )

    );

  }, [search, timeSlots]);

  /**
   * ------------------------------------------
   * Load Time Slots
   * ------------------------------------------
   */

  const loadTimeSlots = async () => {

    try {

      setLoading(true);

      const response =
        await getTimeSlots();

      setTimeSlots(response.data);

      setFiltered(response.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load time slots."
      );

    } finally {

      setLoading(false);

    }

  };

  /**
   * ------------------------------------------
   * Handle Form Change
   * ------------------------------------------
   */

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };
  
    /**
   * ------------------------------------------
   * Edit Time Slot
   * ------------------------------------------
   */

  const handleEdit = (slot) => {

    setEditing(true);

    setSelectedId(slot.id);

    setForm({

      code: slot.code,

      start_time: slot.start_time,

      end_time: slot.end_time,

      sort_order: slot.sort_order,

    });

    setOpenModal(true);

  };

  /**
   * ------------------------------------------
   * Delete Time Slot
   * ------------------------------------------
   */

  const handleDelete = (slot) => {

    setSelectedId(slot.id);

    setOpenDelete(true);

  };

  /**
   * ------------------------------------------
   * Confirm Delete
   * ------------------------------------------
   */

  const confirmDelete = async () => {

    try {

      await deleteTimeSlot(selectedId);

      toast.success(
        "Time slot deleted successfully."
      );

      setOpenDelete(false);

      setSelectedId(null);

      await loadTimeSlots();

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to delete time slot."

      );

    }

  };

  /**
   * ------------------------------------------
   * Reset Form
   * ------------------------------------------
   */

  const resetForm = () => {

    setEditing(false);

    setSelectedId(null);

    setForm({

      code: "",

      start_time: "",

      end_time: "",

      sort_order: "",

    });

    setOpenModal(false);

  };

  /**
   * ------------------------------------------
   * Submit Form
   * ------------------------------------------
   */

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const payload = {

        ...form,

        sort_order: Number(form.sort_order),

      };

      if (editing) {

        await updateTimeSlot(

          selectedId,

          payload

        );

        toast.success(
          "Time slot updated successfully."
        );

      } else {

        await createTimeSlot(payload);

        toast.success(
          "Time slot created successfully."
        );

      }

      resetForm();

      await loadTimeSlots();

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Operation failed."

      );

    }

  };
  
    /**
   * ------------------------------------------
   * Table Columns
   * ------------------------------------------
   */

  const columns = [

    {

      key: "code",

      title: "Code",

    },

    {

      key: "start_time",

      title: "Start Time",

    },

    {

      key: "end_time",

      title: "End Time",

    },

    {

      key: "sort_order",

      title: "Order",

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

        title="Time Slots"

        subtitle="Manage timetable time slots."

      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <SearchBar

            value={search}

            onChange={setSearch}

            placeholder="Search time slot..."

          />

          <button

            onClick={() => {

              setEditing(false);

              setSelectedId(null);

              setForm({

                code: "",

                start_time: "",

                end_time: "",

                sort_order: "",

              });

              setOpenModal(true);

            }}

            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"

          >

            <Plus size={18} />

            Add Time Slot

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
            ? "Edit Time Slot"
            : "Add Time Slot"
        }
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={
          editing
            ? "Update Time Slot"
            : "Create Time Slot"
        }
      >

        <div>

          <label className="mb-2 block text-sm font-medium">

            Time Slot Code

          </label>

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="08-09"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Start Time

          </label>

          <input
            type="time"
            name="start_time"
            value={form.start_time}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            End Time

          </label>

          <input
            type="time"
            name="end_time"
            value={form.end_time}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Sort Order

          </label>

          <input
            type="number"
            name="sort_order"
            value={form.sort_order}
            onChange={handleChange}
            min="1"
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="1"
            required
          />

        </div>

      </FormModal>

      <ConfirmDialog
        open={openDelete}
        title="Delete Time Slot"
        message="Are you sure you want to delete this time slot? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />

    </div>

  );

}

export default TimeSlots;