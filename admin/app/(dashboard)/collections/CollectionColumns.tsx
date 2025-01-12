import { Delete } from "@/app/components/custom ui/Delete";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";

export const columns: ColumnDef<any, any>[] = [
  {
    header: "Image",
    accessorKey: "image",
    cell: ({ row }) => (
      <img
        src={row.original.image}
        alt={row.original.title}
        className="w-16 h-16 object-cover rounded-md"
      />
    ),
  },
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => (
      <div className="truncate max-w-xs" title={row.original.title}>
        {row.original.title}
      </div>
    ),
  },
  {
    header: "Products",
    accessorKey: "product",
    cell: ({ row }) => (
      <div className="max-w-xs" title={row.original.products}>
        {row.original.products.length}
      </div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        {/* <Button variant="outline" size="sm">
          <Edit className="w-4 h-4" />
        </Button> */}
        <Delete id={row.original._id} />
      </div>
    ),
  },
];
