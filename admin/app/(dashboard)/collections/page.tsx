"use client";

import { columns, DataTable } from "@/app/components/custom ui/DataTable";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

type Props = {};

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
        <Button className="bg-blue-1 text-white">
          <Plus className="w-4 h-4 mr-2" />
          create collection
        </Button>
      </div>
      <DataTable columns={columns} data={collections} />
    </div>
  );
};

export default Collections;
