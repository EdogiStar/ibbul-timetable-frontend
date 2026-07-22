import api from "./api";

export const getDays = async () => {
  const response = await api.get("/days");
  return response.data;
};

export const getDayById = async (id) => {
  const response = await api.get(`/days/${id}`);
  return response.data;
};

export const createDay = async (data) => {
  const response = await api.post("/days", data);
  return response.data;
};

export const updateDay = async (id, data) => {
  const response = await api.put(`/days/${id}`, data);
  return response.data;
};

export const deleteDay = async (id) => {
  const response = await api.delete(`/days/${id}`);
  return response.data;
};