import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Plus, Trash } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface ImageUploadProps {
  value: string[];
  onChange: (urls: string[]) => void;
  onRemove: (url: string) => void;
  directory: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
  directory,
}) => {
  const onUpload = (result: any) => {
    const uploadedUrl = result.info.secure_url;
    onChange([...value, uploadedUrl]);
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => (
          <div key={url} className="relative w-[200px] h-[200px]">
            <div className="absolute top-0 right-0 z-10">
              <Button
                type="button"
                onClick={() => onRemove(url)}
                size="sm"
                className="bg-red-500 text-white"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image
              src={url}
              alt="collection"
              className="object-cover rounded-lg"
              fill
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset={
          process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
        }
        options={{ folder: directory }}
        onSuccess={onUpload}
      >
        {({ open }) => {
          return (
            <Button
              type="button"
              onClick={() => open()}
              className="bg-gray-500 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
