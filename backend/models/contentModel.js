import mongoose from "mongoose";

const contentSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true },
    data: { type: Object, default: {} },
  },
  { timestamps: true }
);

const contentModel =
  mongoose.models.content || mongoose.model("content", contentSchema);

export default contentModel;
