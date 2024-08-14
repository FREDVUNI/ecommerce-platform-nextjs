import mongoose from "mongoose";

const collectionSchema = new mongoose.Schema({
  title: {
    type: "string",
    required: true,
    unique: true,
  },
  description: {
    type: "string",
    required: true,
  },
  image: {
    type: "string",
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const collection =
  mongoose.models.Collection || mongoose.model("Collection", collectionSchema);

export default collection;
