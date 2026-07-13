import api from "./api";

export const getSemesters = async () => {
  const response = await api.get("/semesters");
  return response.data;
};

export const getSemesterById = async (id) => {
  const response = await api.get(`/semesters/${id}`);
  return response.data;
};

export const createSemester = async (data) => {
  const response = await api.post("/semesters", data);
  return response.data;
};

export const updateSemester = async (id, data) => {
  const response = await api.put(`/semesters/${id}`, data);
  return response.data;
};

export const deleteSemester = async (id) => {
  const response = await api.delete(`/semesters/${id}`);
  return response.data;
};