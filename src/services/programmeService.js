import api from "./api";

export const getProgrammes = async () => {
  const response = await api.get("/programmes");
  return response.data;
};

export const getProgrammeById = async (id) => {
  const response = await api.get(`/programmes/${id}`);
  return response.data;
};

export const createProgramme = async (data) => {
  const response = await api.post("/programmes", data);
  return response.data;
};

export const updateProgramme = async (id, data) => {
  const response = await api.put(`/programmes/${id}`, data);
  return response.data;
};

export const deleteProgramme = async (id) => {
  const response = await api.delete(`/programmes/${id}`);
  return response.data;
};