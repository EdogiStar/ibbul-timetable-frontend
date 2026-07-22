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

  getDays,

  createDay,

  updateDay,

  deleteDay,

} from "@/services/dayService";

function Days() {

  /**
   * ------------------------------------------
   * State
   * ------------------------------------------
   */

  const [days, setDays] = useState([]);

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

    sort_order: "",

  });

  /**
   * ------------------------------------------
   * Initial Load
   * ------------------------------------------
   */

  useEffect(() => {

    loadDays();

  }, []);

  /**
   * ------------------------------------------
   * Search
   * ------------------------------------------
   */

  useEffect(() => {

    const keyword =
      search.toLowerCase();

    setFiltered(

      days.filter(

        (day) =>

          day.name
            .toLowerCase()
            .includes(keyword) ||

          day.code
            .toLowerCase()
            .includes(keyword) ||

          String(day.sort_order)
            .includes(keyword)

      )

    );

  }, [search, days]);

  /**
   * ------------------------------------------
   * Load Days
   * ------------------------------------------
   */

  const loadDays = async () => {

    try {

      setLoading(true);

      const response =
        await getDays();

      setDays(response.data);

      setFiltered(response.data);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load days."
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

      [e.target.name]:
        e.target.value,

    });

  };
  
    /**
   * ------------------------------------------
   * Edit Day
   * ------------------------------------------
   */

  const handleEdit = (day) => {

    setEditing(true);

    setSelectedId(day.id);

    setForm({

      code: day.code,

      name: day.name,

      sort_order: day.sort_order,

    });

    setOpenModal(true);

  };

  /**
   * ------------------------------------------
   * Delete Day
   * ------------------------------------------
   */

  const handleDelete = (day) => {

    setSelectedId(day.id);

    setOpenDelete(true);

  };

  /**
   * ------------------------------------------
   * Confirm Delete
   * ------------------------------------------
   */

  const confirmDelete = async () => {

    try {

      await deleteDay(selectedId);

      toast.success(
        "Day deleted successfully."
      );

      setOpenDelete(false);

      setSelectedId(null);

      await loadDays();

    } catch (error) {

      console.error(error);

      toast.error(

        error.response?.data?.message ||

        "Failed to delete day."

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

      name: "",

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

        await updateDay(

          selectedId,

          payload

        );

        toast.success(
          "Day updated successfully."
        );

      } else {

        await createDay(payload);

        toast.success(
          "Day created successfully."
        );

      }

      resetForm();

      await loadDays();

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

      key: "name",

      title: "Day",

    },

    {

      key: "sort_order",

      title: "Sort Order",

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

        title="Days"

        subtitle="Manage timetable days."

      />

      <div className="rounded-xl border border-green-100 bg-white p-6 shadow-sm">

        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <SearchBar

            value={search}

            onChange={setSearch}

            placeholder="Search day..."

          />

          <button

            onClick={() => {

              setEditing(false);

              setSelectedId(null);

              setForm({

                code: "",

                name: "",

                sort_order: "",

              });

              setOpenModal(true);

            }}

            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700"

          >

            <Plus size={18} />

            Add Day

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
        title={editing ? "Edit Day" : "Add Day"}
        onClose={resetForm}
        onSubmit={handleSubmit}
        submitText={editing ? "Update Day" : "Create Day"}
      >

        <div>

          <label className="mb-2 block text-sm font-medium">

            Day Name

          </label>

          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="Monday"
            required
          />

        </div>

        <div>

          <label className="mb-2 block text-sm font-medium">

            Day Code

          </label>

          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleChange}
            className="w-full rounded-lg border px-4 py-3 focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200"
            placeholder="MON"
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
        title="Delete Day"
        message="Are you sure you want to delete this day? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => setOpenDelete(false)}
      />

    </div>

  );

}

export default Days;