import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";

import { uploadImageToCloudinary } from "../../api/uploads";

export default function EditableImage({
  src,
  alt = "",
  editable = false,
  path,
  onChangePath,
  className = "",
  buttonLabel = "Change Image",
}) {
  const fileInputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  function openFilePicker() {
    if (!editable || uploading) return;
    fileInputRef.current?.click();
  }

  async function handleFileChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    try {
      setUploading(true);

      const data = await uploadImageToCloudinary(file);

      const imageUrl =
        data?.imageUrl ||
        data?.url ||
        data?.secure_url ||
        data?.secureUrl ||
        data?.image?.url ||
        data?.image?.secure_url ||
        data?.data?.imageUrl ||
        data?.data?.url ||
        data?.data?.secure_url ||
        data?.result?.secure_url;

      if (!imageUrl) {
        console.log("UPLOAD RESPONSE:", data);
        throw new Error("Upload succeeded but image URL was not returned");
      }

      onChangePath?.(path, imageUrl);
    } catch (error) {
      console.error("Upload image error:", error);
      alert(error.message || "Failed to upload image");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  return (
    <div className="relative h-full w-full">
      <img src={src} alt={alt} className={className} />

      {editable && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <button
            type="button"
            onClick={openFilePicker}
            disabled={uploading}
            className="absolute right-4 top-4 z-[80] inline-flex items-center gap-2 rounded-xl bg-[#F57A24] px-4 py-2 text-xs font-bold text-white shadow-[0_14px_40px_rgba(0,0,0,0.35)] transition hover:bg-[#e06815] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {uploading ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <ImagePlus size={15} />
            )}

            {uploading ? "Uploading..." : buttonLabel}
          </button>
        </>
      )}
    </div>
  );
}
