import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export function getOptimizedImageUrl(publicId: string, options: Record<string, any> = {}) {
  const defaultOptions = {
    transformation: [
      {
        fetch_format: 'auto',
        quality: 'auto',
        ...options.transformation,
      },
    ],
  };

  return cloudinary.url(publicId, defaultOptions);
}

export function getCroppedImageUrl(publicId: string, width: number, height: number) {
  return cloudinary.url(publicId, {
    crop: 'fill',
    gravity: 'auto',
    width,
    height,
    fetch_format: 'auto',
    quality: 'auto',
  });
}
