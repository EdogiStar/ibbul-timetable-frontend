import api from "./api";

export const getLecturers = async () => {
  const response = await api.get("/lecturers");
  return response.data.data;
};

export const getLecturerById = async (id) => {
  const response = await api.get(`/lecturers/${id}`);
  return response.data;
};

export const createLecturer = async (data) => {
  const response = await api.post("/lecturers", data);
  return response.data;
};

export const updateLecturer = async (id, data) => {
  const response = await api.put(`/lecturers/${id}`, data);
  return response.data;
};

export const deleteLecturer = async (id) => {
  const response = await api.delete(`/lecturers/${id}`);
  return response.data;
};