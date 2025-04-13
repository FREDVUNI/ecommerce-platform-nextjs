import React from "react";
import { CldUploadWidget } from "next-cloudinary";
import { Trash } from "lucide-react";
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
        {(value ?? []).map((url) => (
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
              className="bg-gray-500 text-white rounded-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                />
              </svg>
              Upload Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
