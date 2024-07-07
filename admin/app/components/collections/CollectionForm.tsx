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

const formSchema = z.object({
  title: z.string().min(2).max(20).nonempty(),
  description: z.string().min(2).max(200).nonempty(),
  image: z.string().url().optional(),
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
      <h2 className="text-2xl font-medium mb-4 text-gray-800">
        Create Collection
      </h2>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the title"
                    {...field}
                    className="border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>
                <FormMessage>
                  {errors.title && errors.title.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description"
                    {...field}
                    rows={5}
                    className="border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>
                <FormMessage>
                  {errors.description && errors.description.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the image URL"
                    {...field}
                    className="border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </FormControl>
                <FormMessage>
                  {errors.image && errors.image.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="flex gap-10">
            <Button
              type="submit"
              className="bg-indigo-500 text-white py-2 px-4 hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
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
