import projectModel from "../models/projectModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createProject = async (req, res) => {
  try {
    const body = req.body || {};
    const imageFile = req.files?.image?.[0];
    const galleryFiles = req.files?.gallery || [];

    if (!body.title || !body.category) {
      return res.status(400).json({
        success: false,
        message: "title and category are required",
      });
    }

    let imageUrl = body.image || "";
    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = uploadResult.secure_url;
    }

    if (!imageUrl) {
       return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    // Upload gallery images
    let galleryUrls = [];
    if (galleryFiles && galleryFiles.length > 0) {
      const uploadPromises = galleryFiles.map((file) =>
        cloudinary.uploader.upload(file.path, { resource_type: "image" })
      );
      const results = await Promise.all(uploadPromises);
      galleryUrls = results.map((r) => r.secure_url);
    }

    const projectData = {
      ...body,
      image: imageUrl,
      gallery: galleryUrls,
    };

    // Normalize arrays for create as well
    if (projectData.tools) {
        projectData.tools = Array.isArray(projectData.tools) ? projectData.tools : [projectData.tools];
        projectData.tools = projectData.tools.filter(t => t.trim() !== "");
    }

    const project = await projectModel.create(projectData);
    return res.status(201).json({ success: true, project });
  } catch (error) {
    console.error("Create Project Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to create project" });
  }
};

export const listProjects = async (req, res) => {
  try {
    const projects = await projectModel.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, projects });
  } catch (error) {
    console.error("List Projects Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch projects" });
  }
};

export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectModel.findById(id);
    if (!project) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    return res.json({ success: true, project });
  } catch (error) {
    console.error("Get Project Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch project" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const imageFile = req.files?.image?.[0];
    const galleryFiles = req.files?.gallery || [];

    let updateData = { ...body };

    // Normalize arrays (multer might return string for single item, or array for multiple)
    if (updateData.tools) {
        updateData.tools = Array.isArray(updateData.tools) ? updateData.tools : [updateData.tools];
        // Filter out empty strings if any
        updateData.tools = updateData.tools.filter(t => t.trim() !== "");
    }
    
    // Handle existing gallery (passed as strings) + new files
    let currentGallery = [];
    if (updateData.existingGallery) {
        currentGallery = Array.isArray(updateData.existingGallery) 
            ? updateData.existingGallery 
            : [updateData.existingGallery];
    }

    // Upload new gallery files
    if (galleryFiles && galleryFiles.length > 0) {
      const uploadPromises = galleryFiles.map((file) =>
        cloudinary.uploader.upload(file.path, { resource_type: "image" })
      );
      const results = await Promise.all(uploadPromises);
      const newUrls = results.map((r) => r.secure_url);
      currentGallery = [...currentGallery, ...newUrls];
    }
    
    updateData.gallery = currentGallery;
    delete updateData.existingGallery; // cleanup

    if (imageFile) {
      const uploadResult = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      updateData.image = uploadResult.secure_url;
    }

    const updated = await projectModel.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updated) {
      return res
        .status(404)
        .json({ success: false, message: "Project not found" });
    }
    return res.json({ success: true, project: updated });
  } catch (error) {
    console.error("Update Project Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to update project" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await projectModel.findByIdAndDelete(id);
    return res.json({ success: true, message: "Project deleted" });
  } catch (error) {
    console.error("Delete Project Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to delete project" });
  }
};
