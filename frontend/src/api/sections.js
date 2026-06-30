import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

export async function createSection(payload) {
  const response = await axiosInstance.post(ENDPOINTS.SECTIONS.CREATE, payload);
  return response.data;
}

export async function updateSection(id, payload) {
  const response = await axiosInstance.put(
    ENDPOINTS.SECTIONS.UPDATE(id),
    payload,
  );

  return response.data;
}

export async function deleteSection(id) {
  const response = await axiosInstance.delete(ENDPOINTS.SECTIONS.DELETE(id));
  return response.data;
}
