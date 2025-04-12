import connectDB from "@/app/lib/database/db";
import { auth } from "@clerk/nextjs/server";
import Collection from "@/app/lib/models/Collection";
import { NextRequest, NextResponse } from "next/server";

export const GET = async () => {
  try {
    const userId = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    const collections = await Collection.find({ userId });

    return new NextResponse(JSON.stringify(collections), { status: 200 });
  } catch (err) {
    console.log("[collectionId_GET]", err);
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const userId = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    let collection = await Collection.findById(params.collectionId);

    if (!collection) {
      return new NextResponse("collection not found", { status: 404 });
    }

    const { title, description, image } = await req.json();

    if (!title || !image) {
      return new NextResponse("All fields are required. ", { status: 400 });
    }

    collection = await Collection.findByIdAndUpdate(
      params.collectionId,
      { title, description, image },
      { new: true }
    );

    await collection.save();

    return NextResponse.json(collection, { status: 200 });
  } catch (err) {
    console.log("[collectionId_POST]", err);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { collectionId: string } }
) => {
  try {
    const userId = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();

    await Collection.findByIdAndDelete(params.collectionId);

    return new NextResponse("collection has been deleted.", { status: 200 });
  } catch (err) {
    console.log("[collectionId_DELETE]", err);
  }
};
