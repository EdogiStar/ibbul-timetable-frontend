import api from "./api";

/**
 * Get timetable
 * Supports optional filters.
 */
export const getTimetable = async (filters = {}) => {
  const response = await api.get("/timetables", {
    params: filters,
  });

  return response.data;
};

/**
 * Generate Group Timetable
 */
export const generateGroupTimetable = async () => {
  const response = await api.post(
    "/timetables/group/generate"
  );

  return response.data;
};

/**
 * Generate Normal Timetable
 */
export const generateNormalTimetable = async () => {
  const response = await api.post(
    "/timetables/normal/generate"
  );

  return response.data;
};

/**
 * Generate Normal Timetable
 * For a single course allocation
 * in a specific timetable slot.
 */
export const generateNormalTimetableForOne = async (
  data
) => {

  const response = await api.post(
    "/timetables/normal/generate-single",
    data
  );

  return response.data;

};