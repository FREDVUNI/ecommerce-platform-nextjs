"use client";

import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const CollectionForm = () => {
  const formSchema = z.object({
    title: z.string().min(2).max(20),
    description: z.string().min(2).max(200),
    image: z.string(),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
    },
  });
  return (
    <div className="p-10">
      <p className="text-heading2-bold">Create Collection</p>
    </div>
  );
};

export default CollectionForm;
