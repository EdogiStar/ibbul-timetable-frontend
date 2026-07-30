import api from "./api";


/**
 * Get timetable
 * Supports optional filters.
 */
export const getTimetable = async (filters = {}) => {

  const response =
    await api.get(
      "/timetables",
      {
        params: filters,
      }
    );

  return response.data;

};



/**
 * Clear entire timetable
 *
 * Deletes all timetable entries.
 * Does not delete courses, course offerings,
 * lecturers, venues, or other source data.
 */
export const clearTimetable = async () => {

  const response =
    await api.delete(
      "/timetables/clear"
    );

  return response.data;

};



/**
 * Generate Group Timetable
 */
export const generateGroupTimetable = async () => {

  const response =
    await api.post(
      "/timetables/group/generate"
    );

  return response.data;

};



/**
 * Generate Normal Timetable
 */
export const generateNormalTimetable = async () => {

  const response =
    await api.post(
      "/timetables/normal/generate"
    );

  return response.data;

};



/**
 * Generate Normal Timetable
 * For one course allocation
 */
export const generateNormalTimetableForOne =
async (data) => {

  const response =
    await api.post(
      "/timetables/normal/generate-single",
      data
    );

  return response.data;

};



/**
 * Add one lecture manually
 *
 * Used by timetable + button
 */
export const addSingleNormalTimetable =
async (data) => {

  const response =
    await api.post(
      "/timetables/normal/add-single",
      data
    );

  return response.data;

};



/**
 * Create timetable entry directly
 */
export const createTimetableEntry =
async (data) => {

  const response =
    await api.post(
      "/timetables",
      data
    );

  return response.data;

};



/**
 * Get available venues
 */
export const getAvailableVenues =
async ({
  dayId,
  timeSlotId
}) => {

  const response =
    await api.get(
      "/timetables/available-venues",
      {
        params: {
          dayId,
          timeSlotId
        }
      }
    );

  return response.data.data;

};