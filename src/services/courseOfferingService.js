import api from "./api";

export const getCourseOfferings = async () => {
  const response = await api.get("/course-offerings");
  return response.data.data;
};

export const getCourseOfferingById = async (id) => {
  const response = await api.get(`/course-offerings/${id}`);
  return response.data;
};

export const createCourseOffering = async (data) => {
  const response = await api.post("/course-offerings", data);
  return response.data;
};

export const updateCourseOffering = async (id, data) => {
  const response = await api.put(
    `/course-offerings/${id}`,
    data
  );

  return response.data;
};

export const deleteCourseOffering = async (id) => {
  const response = await api.delete(
    `/course-offerings/${id}`
  );

  return response.data;
};