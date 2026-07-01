import axiosInstance from "./axios";
import ENDPOINTS from "./endpoints";

export async function uploadImageToCloudinary(file) {
  const formData = new FormData();
  formData.append("image", file);

  const response = await axiosInstance.post(ENDPOINTS.UPLOAD.IMAGE, formData);

  return response.data;
}
