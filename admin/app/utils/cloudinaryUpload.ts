import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (directory: string, imagePath: string) => {
  try {
    const folderPath = `borcelle/${directory}`;
    const result = await cloudinary.v2.uploader.upload(imagePath, {
      folder: folderPath,
    });

    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
};
