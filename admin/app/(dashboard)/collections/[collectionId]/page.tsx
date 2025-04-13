"use client";

import CollectionForm from "@/app/components/collections/CollectionForm";
import Loader from "@/app/components/custom ui/Loader";
import React, { useState, useEffect } from "react";

const CollectionDetails = ({
  params,
}: {
  params: { collectionId: string };
}) => {
  const [loading, setLoading] = useState(true);
  const [CollectionDetails, setCollectionDetails] =
    useState<CollectionType | null>(null);
  const getCollection = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollectionDetails(data);
      setLoading(false);
      console.log("initial data ", data);
    } catch (err) {
      console.log("[getCollection]", err);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <CollectionForm initialData={CollectionDetails} />
  );
};

export default CollectionDetails;
