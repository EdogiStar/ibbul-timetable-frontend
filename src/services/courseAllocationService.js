import api from "./api";

export const getCourseAllocations = async () => {
  const response = await api.get("/course-allocations");
  return response.data.data;
};

export const getAvailableCourseAllocations = async () => {
  const response = await api.get(
    "/course-allocations/available"
  );

  return response.data.data;
};

export const createCourseAllocation = async (data) => {
  const response = await api.post("/course-allocations", data);
  return response.data.data;
};

export const updateCourseAllocation = async (id, data) => {
  const response = await api.put(
    `/course-allocations/${id}`,
    data
  );

  return response.data.data;
};

export const deleteCourseAllocation = async (id) => {
  const response = await api.delete(
    `/course-allocations/${id}`
  );

  return response.data;
};