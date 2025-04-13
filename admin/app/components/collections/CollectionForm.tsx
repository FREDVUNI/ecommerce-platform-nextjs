"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Delete } from "../custom ui/Delete";

const formSchema = z.object({
  title: z.string().min(2).max(200),
  description: z.string().min(2).max(500),
  images: z.array(z.string().url()).optional(),
});

interface CollectionFormProps {
  initialData?: CollectionType | null;
}

const CollectionForm: React.FC<CollectionFormProps> = ({ initialData }) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          images: Array.isArray(initialData.images)
            ? initialData.images
            : initialData.images
            ? [initialData.images]
            : [],
        }
      : {
          title: "",
          description: "",
          images: [],
        },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const res = await fetch("/api/collections", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setIsLoading(false);
        toast.success("Collection has been created.");
        router.push("/collections");
      }
    } catch (error) {
      toast.error("Something went wrong. please try again!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-10 bg-white shadow-sm">
      <h2 className="text-2xl font-medium mb-4 text-gray-500">
        {initialData ? (
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-medium mb-4 text-gray-500">
              Edit Collection
            </h2>
            <Delete id={initialData._id} />
          </div>
        ) : (
          <h2 className="text-2xl font-medium mb-4 text-gray-500">
            create Collection
          </h2>
        )}
      </h2>
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the item title"
                    {...field}
                    className="border border-gray-300 shadow-sm rounded-none focus:outline-none"
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errors.title && errors.title.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter item description"
                    {...field}
                    rows={5}
                    className="border border-gray-300 shadow-sm rounded-none focus:outline-none"
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errors.description && errors.description.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-500">Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(urls) => field.onChange(urls)}
                    onRemove={(url) =>
                      field.onChange(
                        field.value.filter((u: string) => u !== url)
                      )
                    }
                    directory="borcelle/collection"
                  />
                </FormControl>
                <FormMessage className="text-red-500">
                  {errors.images && errors.images.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="flex gap-8">
            <Button
              type="submit"
              className="bg-[#045EBC] text-white py-2 px-5 focus:outline-none focus:bg-[#045EBC]"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Create Collection"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CollectionForm;
