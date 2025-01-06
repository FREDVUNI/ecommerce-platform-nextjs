"use client";

import { DataTable } from "@/app/components/custom ui/DataTable";
import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {};
const columns: ColumnDef<any, any>[] = [
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
    header: "Description",
    accessorKey: "description",
    cell: ({ row }) => (
      <div className="truncate max-w-xs" title={row.original.description}>
        {row.original.description}
      </div>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleEdit(row.original)}
        >
          <Edit className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleDelete(row.original.id)}
        >
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      </div>
    ),
  },
];

const Collections = (props: Props) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [collections, setCollections] = React.useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[collections_GET]", err);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <div className="px-1">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium mb-4 text-gray-500">Collections</h2>
        <Button
          className="bg-blue-1 text-white mb-4"
          onClick={() => router.push("/collections/new")}
        >
          <Plus className="w-4 h-4 mr-2" />
          create collection
        </Button>
      </div>
      <DataTable
        columns={columns}
        data={collections}
        searchKey="title"
        loading={loading}
      />{" "}
    </div>
  );
};

export default Collections;
function handleEdit(original: any): void {
  throw new Error("Function not implemented.");
}

function handleDelete(id: any): void {
  throw new Error("Function not implemented.");
}
