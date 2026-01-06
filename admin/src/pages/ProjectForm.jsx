import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { FaCloudUploadAlt, FaTimes, FaLink, FaFigma, FaSave, FaArrowLeft } from "react-icons/fa";

const emptyProject = {
  title: "",
  shortDescription: "",
  description: "",
  image: "",
  category: "",
  duration: "",
  role: "",
  tools: "", // comma separated
  overview: "",
  gallery: [], // array of strings (URLs)
  liveLink: "",
  figmaLink: "",
  featured: true,
};

const ProjectForm = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(emptyProject);
  const [imageFile, setImageFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]); // New files to upload
  const [loading, setLoading] = useState(false);

  const isEdit = Boolean(id);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/project/${id}`);
        if (res.data.success && res.data.project) {
          const p = res.data.project;
          setForm({
            title: p.title || "",
            shortDescription: p.shortDescription || "",
            description: p.description || "",
            image: p.image || "",
            category: p.category || "",
            duration: p.duration || "",
            role: p.role || "",
            tools: (p.tools || []).join(", "),
            overview: p.overview || "",
            gallery: p.gallery || [],
            liveLink: p.liveLink || "",
            figmaLink: p.figmaLink || "",
            featured: Boolean(p.featured),
          });
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to load project");
      }
    };

    if (isEdit) {
      fetchProject();
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleRemoveGalleryImage = (indexToRemove) => {
    setForm((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("shortDescription", form.shortDescription);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("duration", form.duration);
      formData.append("role", form.role);
      formData.append("overview", form.overview);
      formData.append("liveLink", form.liveLink);
      formData.append("figmaLink", form.figmaLink);
      formData.append("featured", form.featured);

      // Handle arrays
      const toolsArray = form.tools.split(",").map(t => t.trim()).filter(Boolean);
      if (toolsArray.length > 0) {
        toolsArray.forEach(t => formData.append("tools", t));
      } else {
        formData.append("tools", ""); 
      }

      // Existing gallery URLs
      if (form.gallery && form.gallery.length > 0) {
        form.gallery.forEach(url => formData.append("existingGallery", url));
      }

      // New gallery files
      if (galleryFiles && galleryFiles.length > 0) {
        Array.from(galleryFiles).forEach(file => formData.append("gallery", file));
      }

      if (imageFile) {
        formData.append("image", imageFile);
      } else if (form.image) {
         formData.append("image", form.image);
      }

      if (isEdit) {
        await axios.put(`${backendUrl}/api/project/${id}`, formData, {
          headers: { token },
        });
        toast.success("Project updated");
      } else {
        await axios.post(`${backendUrl}/api/project/add`, formData, {
          headers: { token },
        });
        toast.success("Project created");
      }
      navigate("/projects");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <button 
            type="button"
            onClick={() => navigate("/projects")}
            className="p-2 hover:bg-gray-50 rounded-full transition-colors text-gray-400 hover:text-gray-900"
          >
            <FaArrowLeft size={18} />
          </button>
          <h2 className="text-xl font-bold text-gray-900">
            {isEdit ? "Edit Project" : "New Project"}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="px-4 py-2 rounded-full border border-gray-200 text-gray-600 font-medium hover:bg-gray-50 transition-colors text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 text-sm"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="p-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Media */}
            <div className="lg:col-span-1 space-y-6">
                {/* Cover Image */}
                <div className="space-y-3">
                    <label className="block font-semibold text-gray-900 text-sm">Project Cover</label>
                    <label htmlFor="image" className="cursor-pointer block w-full aspect-video relative group rounded-2xl overflow-hidden border-2 border-dashed border-gray-200 hover:border-gray-400 transition-all bg-gray-50">
                        <img
                            className="w-full h-full object-cover"
                            src={imageFile ? URL.createObjectURL(imageFile) : form.image ? form.image : assets.upload_area}
                            alt="Cover"
                            onError={(e) => { e.target.onerror = null; e.target.src = assets.upload_area; }}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors flex items-center justify-center">
                            <div className="bg-white px-4 py-2 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-2">
                                <FaCloudUploadAlt className="text-gray-900" />
                                <span className="font-medium text-gray-900 text-xs">Change</span>
                            </div>
                        </div>
                        <input onChange={(e) => setImageFile(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                </div>

                {/* Gallery */}
                <div className="space-y-3">
                    <label className="block font-semibold text-gray-900 text-sm">Gallery</label>
                    <div className="grid grid-cols-3 gap-2">
                        {/* Existing Images */}
                        {form.gallery && form.gallery.map((url, index) => (
                            <div key={index} className="relative group aspect-square rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                                <img src={url} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveGalleryImage(index)}
                                    className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-all hover:bg-red-50 transform scale-90 group-hover:scale-100"
                                >
                                    <FaTimes size={10} />
                                </button>
                            </div>
                        ))}
                        
                        {/* Upload Button */}
                        <label className="cursor-pointer aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-black hover:bg-gray-50 transition-all flex flex-col items-center justify-center text-gray-400 hover:text-black group">
                            <FaCloudUploadAlt size={16} className="mb-1" />
                            <span className="text-[10px] font-medium">Add</span>
                            <input type="file" multiple onChange={(e) => setGalleryFiles(e.target.files)} hidden />
                        </label>
                    </div>
                    {galleryFiles && galleryFiles.length > 0 && (
                        <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            {galleryFiles.length} selected
                        </p>
                    )}
                </div>
            </div>

            {/* Right Column: Details */}
            <div className="lg:col-span-2 space-y-5">
                {/* Basic Info */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title</label>
                        <input 
                            type="text" name="title" value={form.title} onChange={handleChange} required 
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                            placeholder="Project Name"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Category</label>
                        <input 
                            type="text" name="category" value={form.category} onChange={handleChange} required 
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                            placeholder="Design, Development..."
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Overview</label>
                    <textarea 
                        name="overview" value={form.overview} onChange={handleChange} rows={3}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-y text-sm"
                        placeholder="Project description..."
                    />
                </div>

                {/* Specs Grid */}
                <div className="grid md:grid-cols-3 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Duration</label>
                        <input 
                            type="text" name="duration" value={form.duration} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Role</label>
                        <input 
                            type="text" name="role" value={form.role} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Tools</label>
                        <input 
                            type="text" name="tools" value={form.tools} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                        />
                    </div>
                </div>

                {/* Links */}
                <div className="grid md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-2">
                            <FaLink /> Live Link
                        </label>
                        <input 
                            type="text" name="liveLink" value={form.liveLink} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                            placeholder="https://..."
                        />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide flex items-center gap-2">
                            <FaFigma /> Figma Link
                        </label>
                        <input 
                            type="text" name="figmaLink" value={form.figmaLink} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                            placeholder="https://figma.com/..."
                        />
                    </div>
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <input 
                        id="featured" type="checkbox" name="featured" checked={form.featured} onChange={handleChange}
                        className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
                    />
                    <label htmlFor="featured" className="text-gray-700 font-medium text-sm cursor-pointer select-none">Feature this project on the homepage</label>
                </div>
            </div>
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
