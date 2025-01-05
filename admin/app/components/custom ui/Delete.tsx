import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {};

const Delete = (props: Props) => {
  return (
    <Button className="bg-red-1 text-white">
      <Trash className="h-4 w-4" />
    </Button>
  );
};

export default Delete;
