"use client";

import { DataTable } from "@/app/components/custom ui/DataTable";
import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {};
const columns: ColumnDef<any, any>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Description",
    accessorKey: "description",
  },
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
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Button
          variant="outline"
          size="sm"
          // onClick={() => handleEdit(row.original)}
        >
          {/* <Edit className="w-4 h-4" /> */}
        </Button>
        <Button
          variant="outline"
          size="sm"
          // onClick={() => handleDelete(row.original.id)}
        >
          {/* <Trash className="w-4 h-4 text-red-500" /> */}
        </Button>
      </div>
    ),
  },
];

const Collections = (props: Props) => {
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
        <Button className="bg-blue-1 text-white mb-4">
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
