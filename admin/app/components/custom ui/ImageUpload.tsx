import { CldUploadWidget } from "next-cloudinary";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
  return (
    <div>
      <div></div>
      <CldUploadWidget uploadPreset="rjr5bovv" onUpload={onUpload}>
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
