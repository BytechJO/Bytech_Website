import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

export async function getSectionById(id) {
  const response = await axiosInstance.get(ENDPOINTS.SECTIONS.GET_ONE(id));
  return response.data;
}

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

export async function reorderSections(pageId, items) {
  const response = await axiosInstance.patch(
    ENDPOINTS.SECTIONS.REORDER(pageId),
    {
      items,
    },
  );

  return response.data;
}
