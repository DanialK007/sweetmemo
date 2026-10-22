import { uploadToCloudinary } from "./cloudinary";
import { compressImageToBase64 } from "./imageCompressor";

/**
 * Uploads payment screenshot (KPay / WavePay) to Cloudinary.
 * Falls back to client-side compressed base64 if Cloudinary is not yet configured.
 */
export async function uploadPaymentScreenshot(
  _userId: string,
  _orderId: string,
  file: File
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName && cloudName !== "your_cloud_name") {
    return await uploadToCloudinary(file, "payment-screenshots");
  }
  // Fallback if Cloudinary env is not set yet
  return await compressImageToBase64(file, 900, 900, 0.65);
}

/**
 * Uploads user photo to be embedded inside customized cards/templates.
 * Saved into Cloudinary `sweetmemos/card-photos`.
 */
export async function uploadCardPhoto(
  _userId: string,
  file: File
): Promise<string> {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (cloudName && cloudName !== "your_cloud_name") {
    return await uploadToCloudinary(file, "card-photos");
  }
  // Fallback if Cloudinary env is not set yet
  return await compressImageToBase64(file, 900, 900, 0.7);
}
