import CollectionForm from "@/app/components/collections/CollectionForm";
import Loader from "@/app/components/custom ui/Loader";
import React, { useState, useEffect } from "react";

type collectionType = {
  
};

const Collection = ({ params }: { params: { collectionId: string } }) => {
  const [loading, setLoading] = useState(true);
  const [collection, setCollection] = useState<collectionType | null>(null);
  const getCollection = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`, {
        method: "GET",
      });
      const data = await res.json();
      setCollection(data);
      setLoading(false);
      //   console.log(data);
    } catch (err) {
      console.log("[getCollection]", err);
    }
  };

  useEffect(() => {
    getCollection();
  }, []);

  return loading ? <Loader /> : <CollectionForm collection={collection} />;
};

export default Collection;
