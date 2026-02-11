import { v2 as cloudinary } from 'cloudinary';

const cloudName = process.env.CLOUDINARY_CLOUD_NAME || 'Mustafa-zahid-website';
const apiKey = process.env.CLOUDINARY_API_KEY || '464448985568564';
const apiSecret = process.env.CLOUDINARY_API_SECRET || 'c60EFkXij0C9PwIjwPihfz888gk';

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function uploadImage(file: File | Blob): Promise<string> {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: 'image',
            folder: 'mustafa-zahid',
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (result?.secure_url) {
              resolve(result.secure_url);
            } else {
              reject(new Error('Upload failed: No URL returned'));
            }
          }
        )
        .end(buffer);
    });
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
}

export async function uploadMultipleImages(files: File[]): Promise<string[]> {
  try {
    const uploadPromises = files.map((file) => uploadImage(file));
    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error('Error uploading multiple images:', error);
    throw error;
  }
}

