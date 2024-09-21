import connectDB from "@/app/lib/database/db";
import Collection from "@/app/lib/models/Collection";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("unathorized", { status: 401 });

    const { title, description, image } = await req.json();

    const existingCollection = await Collection.findOne({
      title,
    });

    if (existingCollection)
      return new NextResponse(`collection ${title} already extsts`, {
        status: 400,
      });

    if (!title || !description || !image)
      return new NextResponse("All fields are required.", {
        status: 400,
      });

    const newCollection = await Collection.create({
      title,
      description,
      image,
      userId,
    });

    await newCollection.save();

    return new NextResponse(newCollection.json(), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse("Internal server error", { status: 500 });
  }
};
