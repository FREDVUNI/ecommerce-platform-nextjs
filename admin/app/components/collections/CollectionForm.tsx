"use client";

import React from "react";
import { useState } from 'react';
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

const formSchema = z.object({
  title: z.string().min(2).max(20),
  description: z.string().min(2).max(200),
  images: z.array(z.string().url()).optional(),
});

const CollectionForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      images: [],
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
            >
              Create Collection
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default CollectionForm;
