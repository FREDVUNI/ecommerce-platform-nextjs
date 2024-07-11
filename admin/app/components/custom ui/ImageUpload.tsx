import { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string[]) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [cloudinarySignature, setCloudinarySignature] = useState<string>("");

  const fetchCloudinarySignature = async () => {
    try {
      const response = await fetch("/api/sign-in/route");
      if (!response.ok) {
        throw new Error("Failed to fetch Cloudinary signature");
      }
      const data = await response.json();
      setCloudinarySignature(data.signature);
    } catch (error) {
      console.error("Error fetching Cloudinary signature:", error);
    }
  };

  const onUploadSuccess = (result: any) => {
    onChange([...value, result.info.secure_url]);
  };

  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

  return (
    <div>
      <div className="mb-4 flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <div key={index} className="relative h-24 w-24">
            <Image
              src={url}
              alt="uploaded image"
              layout="fill"
              objectFit="cover"
            />
            <button
              className="absolute top-2 right-2 bg-gray-800 rounded-full text-white p-1"
              onClick={() => {
                console.log("Remove image:", url);
              }}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <Button
        onClick={fetchCloudinarySignature}
        className="bg-gray-400 text-white rounded-none"
      >
        <Plus className="h-4 w-4 mr-2" />
        Upload Images
      </Button>

      {cloudinarySignature && (
        <CldUploadWidget
          uploadPreset={preset}
          onSuccess={onUploadSuccess}
          {...({ signature: cloudinarySignature } as any)}
        >
          {({ open }) => (
            <Button
              onClick={() => open()}
              className="bg-grey-1 text-white rounded-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          )}
        </CldUploadWidget>
      )}
    </div>
  );
};

export default ImageUpload;
