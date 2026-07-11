import api from "./api";

export const getFaculties = async () => {
  const response = await api.get("/faculties");
  return response.data;
};

export const getFacultyById = async (id) => {
  const response = await api.get(`/faculties/${id}`);
  return response.data;
};

export const createFaculty = async (data) => {
  const response = await api.post("/faculties", data);
  return response.data;
};

export const updateFaculty = async (id, data) => {
  const response = await api.put(`/faculties/${id}`, data);
  return response.data;
};

export const deleteFaculty = async (id) => {
  const response = await api.delete(`/faculties/${id}`);
  return response.data;
};