import { Delete } from "@/app/components/custom ui/Delete";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
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
      <div
        title={row.original.title}
        className="truncate max-w-xs hover:text-red-600"
      >
        <Link href={`/collections/${row.original._id}`}>
          {row.original.title}
        </Link>
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
        <Delete id={row.original._id} />
      </div>
    ),
  },
];
