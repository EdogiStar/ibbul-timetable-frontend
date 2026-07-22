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
 * Create timetable entry
 */
export const createTimetableEntry = async (data) => {

  const response = await api.post(
    "/timetables",
    data
  );

  return response.data;

};