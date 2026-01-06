import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDescription: { type: String },
    description: { type: String },
    image: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: String },
    role: { type: String },
    tools: [{ type: String }],
    overview: { type: String },
    gallery: [{ type: String }],
    liveLink: { type: String },
    figmaLink: { type: String },
    featured: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const projectModel =
  mongoose.models.project || mongoose.model("project", projectSchema);

export default projectModel;
