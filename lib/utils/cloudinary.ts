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

/**
 * Extract public_id from Cloudinary URL
 * Example: https://res.cloudinary.com/cloud_name/image/upload/v1234567890/mustafa-zahid/image.jpg
 * Returns: mustafa-zahid/image
 */
function extractPublicId(url: string): string | null {
  try {
    // Extract the path after /upload/
    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)$/);
    if (match && match[1]) {
      // Remove file extension
      return match[1].replace(/\.[^/.]+$/, '');
    }
    return null;
  } catch (error) {
    console.error('Error extracting public_id:', error);
    return null;
  }
}

/**
 * Delete a single image from Cloudinary
 */
export async function deleteImage(imageUrl: string): Promise<boolean> {
  try {
    if (!imageUrl || typeof imageUrl !== 'string') {
      console.warn('Invalid image URL provided:', imageUrl);
      return false;
    }

    const publicId = extractPublicId(imageUrl);
    if (!publicId) {
      console.warn('Could not extract public_id from URL:', imageUrl);
      return false;
    }

    return new Promise((resolve) => {
      cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
          console.error('Error deleting image from Cloudinary:', error);
          resolve(false);
        } else {
          console.log('Image deleted from Cloudinary:', publicId);
          resolve(result?.result === 'ok');
        }
      });
    });
  } catch (error) {
    console.error('Error in deleteImage:', error);
    return false;
  }
}

/**
 * Delete multiple images from Cloudinary
 */
export async function deleteMultipleImages(imageUrls: string[]): Promise<boolean> {
  try {
    if (!Array.isArray(imageUrls) || imageUrls.length === 0) {
      return true; // Nothing to delete
    }

    const deletePromises = imageUrls
      .filter(url => url && typeof url === 'string') // Filter out invalid URLs
      .map(url => deleteImage(url));
    
    const results = await Promise.all(deletePromises);
    // Return true if at least some deletions succeeded (don't fail if some fail)
    return results.some(result => result === true);
  } catch (error) {
    console.error('Error deleting multiple images:', error);
    return false;
  }
}

