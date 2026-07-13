import api from "./api";

export const getLevels = async () => {
  const response = await api.get("/levels");
  return response.data;
};

export const getLevelById = async (id) => {
  const response = await api.get(`/levels/${id}`);
  return response.data;
};

export const createLevel = async (data) => {
  const response = await api.post("/levels", data);
  return response.data;
};

export const updateLevel = async (id, data) => {
  const response = await api.put(`/levels/${id}`, data);
  return response.data;
};

export const deleteLevel = async (id) => {
  const response = await api.delete(`/levels/${id}`);
  return response.data;
};