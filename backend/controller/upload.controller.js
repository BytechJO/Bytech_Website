const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No image uploaded",
      });
    }

    const folder = process.env.CLOUDINARY_FOLDER || "bytech";

    const base64File = `data:${req.file.mimetype};base64,${req.file.buffer.toString(
      "base64",
    )}`;

    const result = await cloudinary.uploader.upload(base64File, {
      folder,
      resource_type: "image",
    });
    return res.status(201).json({
      message: "Image uploaded successfully",
      imageUrl: result.secure_url,
      publicId: result.public_id,
      image: {
        key: req.body.key || null,
        url: result.secure_url,
        public_id: result.public_id,
        alt: req.body.alt || "",
        width: result.width,
        height: result.height,
        format: result.format,
      },
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);

    return res.status(500).json({
      message: "Failed to upload image",
      error: error.message,
    });
  }
};

module.exports = {
  uploadImage,
};
