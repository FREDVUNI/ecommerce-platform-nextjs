import connectDB from "@/app/lib/database/db";
import Collection from "@/app/lib/models/Collection";
import { auth } from "@clerk/nextjs/server";
import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const { userId } = auth();
    if (!userId) return new NextResponse("unathorized", { status: 401 });

    const { title, description, images } = await req.json();

    const existingCollection = await Collection.findOne({
      title,
    });

    if (existingCollection)
      return new NextResponse(`The collection "${title}" already extsts`, {
        status: 400,
      });

    if (
      !title ||
      !description ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0
    )
      return new NextResponse("All fields are required.", {
        status: 400,
      });

    const newCollection = await Collection.create({
      title,
      description,
      image: images[0],
      userId,
    });

    await newCollection.save();

    return new NextResponse(JSON.stringify(newCollection.toObject()), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error " + error, { status: 500 });
  }
};
