"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
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

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const formSchema = z.object({
  title: z.string().min(2).max(20).nonempty(),
  description: z.string().min(2).max(200).nonempty(),
  image: z
    .any()
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported."
    ),
});

const CollectionForm = () => {
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="p-10 bg-white shadow-sm">
      <h2 className="text-2xl font-medium mb-4 text-gray-500">
        Create Collection
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                <FormMessage
                  className={`text-red-500 text-sm mb-2 ${
                    errors.image ? "" : "hidden"
                  }`}
                >
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
                <FormMessage
                  className={`text-red-500 text-sm mb-2 ${
                    errors.image ? "" : "hidden"
                  }`}
                >
                  {errors.description && errors.description.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? field.value : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage
                  className={`text-red-500 text-sm mb-2 ${
                    errors.image ? "" : "hidden"
                  }`}
                >
                  {errors.image && errors.image.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button
              type="submit"
              className="bg-[#045EBC] text-white py-2 px-12 rounded-none focus:outline-none focus:bg-[#045EBC]"
            >
              Create
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CollectionForm;
