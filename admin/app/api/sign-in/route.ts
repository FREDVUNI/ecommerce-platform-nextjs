import { NextApiRequest, NextApiResponse } from "next";
import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_SECRET,
});

const sign = async (req: NextApiRequest, res: NextApiResponse) => {
  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = cloudinary.v2.utils.api_sign_request(
    {
      timestamp: timestamp,
      folder: "borcelle",
    },
    process.env.NEXT_PUBLIC_CLOUDINARY_SECRET as string
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
};

export default sign;
