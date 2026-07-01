const cloudinary = require("../config/cloudinary");

const deleteCloudinaryImage = async (publicId) => {
  if (!publicId) return;

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
    });

    console.log("Cloudinary delete result:", result);
  } catch (error) {
    console.error("Failed to delete Cloudinary image:", error.message);
  }
};

module.exports = {
  deleteCloudinaryImage,
};
