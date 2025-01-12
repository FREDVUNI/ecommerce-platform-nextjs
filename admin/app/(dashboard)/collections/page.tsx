"use client";

import { DataTable } from "@/app/components/custom ui/DataTable";
import React, { useEffect } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Delete } from "@/app/components/custom ui/Delete";
import { columns } from "./CollectionColumns";

type Props = {};

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
