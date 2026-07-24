import { useState } from "react";
import {
  X,
  Loader2,
  CalendarDays,
} from "lucide-react";
import { toast } from "sonner";

import {
  generateGroupTimetable,
  generateNormalTimetable,
} from "@/services/timetableService";

function TimetableGenerateModal({
  open,
  onClose,
  onGenerated,
}) {

  const [generating, setGenerating] =
    useState(false);

  const [selectedType, setSelectedType] =
    useState("normal");


  /**
   * ----------------------------------------------------
   * Generate Timetable
   * ----------------------------------------------------
   */
  const handleGenerate = async () => {

    try {

      setGenerating(true);


      /**
       * ------------------------------------------------
       * NORMAL TIMETABLE
       * ------------------------------------------------
       */
      if (
        selectedType === "normal"
      ) {

        const response =
          await generateNormalTimetable();

        toast.success(
          response?.message ||
          "Normal timetable generated successfully."
        );

      }


      /**
       * ------------------------------------------------
       * GROUP TIMETABLE
       * ------------------------------------------------
       */
      if (
        selectedType === "group"
      ) {

        const response =
          await generateGroupTimetable();

        toast.success(
          response?.message ||
          "Group timetable generated successfully."
        );

      }


      /**
       * ------------------------------------------------
       * BOTH TIMETABLES
       * ------------------------------------------------
       *
       * Group scheduling runs first.
       *
       * Normal scheduling then runs after it.
       *
       * This is important because the normal scheduler
       * already knows how to ignore courses handled by
       * the group scheduler.
       *
       * ------------------------------------------------
       */
      if (
        selectedType === "both"
      ) {

        await generateGroupTimetable();

        await generateNormalTimetable();

        toast.success(
          "Group and normal timetables generated successfully."
        );

      }


      /**
       * ------------------------------------------------
       * Close Modal
       * ------------------------------------------------
       */
      onClose();


      /**
       * ------------------------------------------------
       * Reload Timetable
       * ------------------------------------------------
       */
      if (onGenerated) {

        await onGenerated();

      }


    } catch (error) {

      console.error(
        "Timetable generation error:",
        error
      );


      toast.error(

        error.response?.data?.message ||

        "Failed to generate timetable."

      );

    } finally {

      setGenerating(false);

    }

  };


  /**
   * ----------------------------------------------------
   * Don't Render
   * ----------------------------------------------------
   */
  if (!open) {

    return null;

  }


  return (

    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        bg-black/50
        p-4
      "
    >

      {/* ==================================================
          Modal
      ================================================== */}

      <div
        className="
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
        "
      >

        {/* ==================================================
            Header
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            px-6
            py-5
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-green-100
                text-green-700
              "
            >

              <CalendarDays size={20} />

            </div>


            <div>

              <h2
                className="
                  text-lg
                  font-semibold
                  text-gray-900
                "
              >

                Generate Timetable

              </h2>


              <p
                className="
                  mt-0.5
                  text-sm
                  text-gray-500
                "
              >

                Choose what you want to generate.

              </p>

            </div>

          </div>


          <button
            type="button"
            onClick={onClose}
            disabled={generating}
            className="
              rounded-lg
              p-2
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            <X size={20} />

          </button>

        </div>


        {/* ==================================================
            Body
        ================================================== */}

        <div className="space-y-3 p-6">


          {/* ==================================================
              Normal
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setSelectedType("normal")
            }
            disabled={generating}
            className={`
              w-full
              rounded-xl
              border
              p-4
              text-left
              transition

              ${
                selectedType === "normal"

                  ? "border-green-500 bg-green-50 ring-2 ring-green-100"

                  : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
              }

              disabled:cursor-not-allowed
              disabled:opacity-60
            `}
          >

            <div className="flex items-start gap-3">

              <div
                className={`
                  mt-1
                  h-4
                  w-4
                  shrink-0
                  rounded-full
                  border-2

                  ${
                    selectedType === "normal"

                      ? "border-green-600 bg-green-600"

                      : "border-gray-300"
                  }
                `}
              />

              <div>

                <p className="font-semibold text-gray-900">

                  Normal Lectures

                </p>

                <p className="mt-1 text-sm text-gray-500">

                  Generate schedules for normal
                  course offerings.

                </p>

              </div>

            </div>

          </button>


          {/* ==================================================
              Group
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setSelectedType("group")
            }
            disabled={generating}
            className={`
              w-full
              rounded-xl
              border
              p-4
              text-left
              transition

              ${
                selectedType === "group"

                  ? "border-green-500 bg-green-50 ring-2 ring-green-100"

                  : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
              }

              disabled:cursor-not-allowed
              disabled:opacity-60
            `}
          >

            <div className="flex items-start gap-3">

              <div
                className={`
                  mt-1
                  h-4
                  w-4
                  shrink-0
                  rounded-full
                  border-2

                  ${
                    selectedType === "group"

                      ? "border-green-600 bg-green-600"

                      : "border-gray-300"
                  }
                `}
              />

              <div>

                <p className="font-semibold text-gray-900">

                  Group Lectures

                </p>

                <p className="mt-1 text-sm text-gray-500">

                  Generate schedules for group lectures.

                </p>

              </div>

            </div>

          </button>


          {/* ==================================================
              Both
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              setSelectedType("both")
            }
            disabled={generating}
            className={`
              w-full
              rounded-xl
              border
              p-4
              text-left
              transition

              ${
                selectedType === "both"

                  ? "border-green-500 bg-green-50 ring-2 ring-green-100"

                  : "border-gray-200 hover:border-green-300 hover:bg-gray-50"
              }

              disabled:cursor-not-allowed
              disabled:opacity-60
            `}
          >

            <div className="flex items-start gap-3">

              <div
                className={`
                  mt-1
                  h-4
                  w-4
                  shrink-0
                  rounded-full
                  border-2

                  ${
                    selectedType === "both"

                      ? "border-green-600 bg-green-600"

                      : "border-gray-300"
                  }
                `}
              />

              <div>

                <p className="font-semibold text-gray-900">

                  Complete Timetable

                </p>

                <p className="mt-1 text-sm text-gray-500">

                  Generate both group and normal
                  lectures.

                </p>

              </div>

            </div>

          </button>

        </div>


        {/* ==================================================
            Footer
        ================================================== */}

        <div
          className="
            flex
            items-center
            justify-end
            gap-3
            border-t
            bg-gray-50
            px-6
            py-4
          "
        >

          <button
            type="button"
            onClick={onClose}
            disabled={generating}
            className="
              rounded-lg
              border
              border-gray-300
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-50
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >

            Cancel

          </button>


          <button
            type="button"
            onClick={handleGenerate}
            disabled={generating}
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              rounded-lg
              bg-green-600
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-green-700
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >

            {generating ? (

              <>
                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Generating...

              </>

            ) : (

              "Generate"

            )}

          </button>

        </div>

      </div>

    </div>

  );

}

export default TimetableGenerateModal;