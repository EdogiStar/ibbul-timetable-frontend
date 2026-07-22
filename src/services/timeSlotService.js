import api from "./api";

export const getTimeSlots = async () => {
  const response = await api.get("/time-slots");
  return response.data;
};

export const getTimeSlotById = async (id) => {
  const response = await api.get(`/time-slots/${id}`);
  return response.data;
};

export const createTimeSlot = async (data) => {
  const response = await api.post("/time-slots", data);
  return response.data;
};

export const updateTimeSlot = async (id, data) => {
  const response = await api.put(`/time-slots/${id}`, data);
  return response.data;
};

export const deleteTimeSlot = async (id) => {
  const response = await api.delete(`/time-slots/${id}`);
  return response.data;
};