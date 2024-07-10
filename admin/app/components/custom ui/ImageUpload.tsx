import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onRemove,
}) => {
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  const preset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
  return (
    <div>
      <div className="mb-4 flex-wrap items-center gap-4">
        {value.map((url, index) => (
          <Image
            src={url}
            key={index}
            alt="collection"
            className="object-cover rounded-none"
            width={200}
            height={200}
          />
        ))}
      </div>
      <CldUploadWidget uploadPreset={preset} onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              onClick={() => open()}
              className="bg-grey-1 text-white rounded-none"
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Images
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
