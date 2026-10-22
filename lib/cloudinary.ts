/**
 * Cloudinary image upload & optimization helpers.
 * Handles both user-submitted card photos and payment screenshots.
 */

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Uploads an image directly to Cloudinary using an unsigned upload preset.
 * @param file The image file selected by user
 * @param folder Cloudinary folder e.g. "sweetmemos/card-photos" or "sweetmemos/payment-screenshots"
 */
export async function uploadToCloudinary(
  file: File,
  folder: "card-photos" | "payment-screenshots"
): Promise<string> {
  if (!CLOUD_NAME) {
    throw new Error(
      "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is not set in environment variables."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET || "sweetmemos_uploads");
  formData.append("folder", `sweetmemos/${folder}`);

  const endpoint = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const res = await fetch(endpoint, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(
      errorData.error?.message || `Cloudinary upload failed with status ${res.status}`
    );
  }

  const data: CloudinaryUploadResponse = await res.json();
  return data.secure_url;
}

/**
 * Generates an optimized Cloudinary URL on the fly.
 * Injects f_auto, q_auto, and optional dimensions for fast card rendering.
 */
export function getOptimizedImageUrl(
  url: string,
  options: { width?: number; height?: number; crop?: "fill" | "scale" | "fit" } = {}
): string {
  if (!url || !url.includes("cloudinary.com")) return url;

  const { width, height, crop = "fill" } = options;
  const transforms: string[] = ["f_auto", "q_auto"];

  if (width) transforms.push(`w_${width}`);
  if (height) transforms.push(`h_${height}`);
  if (width || height) transforms.push(`c_${crop}`);

  const transformString = transforms.join(",");

  // Insert transformations right after /upload/
  return url.replace("/upload/", `/upload/${transformString}/`);
}
