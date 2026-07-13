import api from "./api";

export const getCourseAllocations = async () => {
  const response = await api.get("/course-allocation");
  return response.data;
};

export const getCourseAllocationById = async (id) => {
  const response = await api.get(`/course-allocation/${id}`);
  return response.data;
};

export const createCourseAllocation = async (data) => {
  const response = await api.post("/course-allocation", data);
  return response.data;
};

export const updateCourseAllocation = async (id, data) => {
  const response = await api.put(`/course-allocation/${id}`, data);
  return response.data;
};

export const deleteCourseAllocation = async (id) => {
  const response = await api.delete(`/course-allocation/${id}`);
  return response.data;
};