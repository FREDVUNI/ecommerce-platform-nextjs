import cloudinary from "cloudinary";
import { NextApiRequest, NextApiResponse } from "next";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { directory } = req.body;
    const image = req.files?.file?.path;

    if (!image || !directory) {
      return res
        .status(400)
        .json({ error: "Image and directory are required." });
    }

    try {
      const folderPath = `borcelle/${directory}`;
      const result = await cloudinary.v2.uploader.upload(image, {
        folder: folderPath,
      });

      return res
        .status(200)
        .json({ message: "Image uploaded successfully", result });
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      return res
        .status(500)
        .json({ error: "Error uploading image to Cloudinary" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
