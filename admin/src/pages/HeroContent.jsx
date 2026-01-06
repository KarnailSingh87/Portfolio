import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
import { FaSave, FaPlus, FaTrash, FaLink } from "react-icons/fa";

const defaultHero = {
  role: "UI/UX Designer & Developer",
  highlightName: "Tamanna",
  titlePrefix: "Hi, I'm ",
  subtitle:
    "I craft beautiful, user-centered digital experiences. Specializing in creating intuitive interfaces that bridge the gap between users and technology.",
  primaryCtaText: "View My Work",
  primaryCtaLink: "#projects",
  secondaryCtaText: "Get In Touch",
  secondaryCtaLink: "#contact",
  stats: [
    { label: "Projects Completed", value: "50+" },
    { label: "Years Experience", value: "3+" },
    { label: "Happy Clients", value: "30+" },
  ],
};

const HeroContent = ({ token }) => {
  const [hero, setHero] = useState(defaultHero);
  const [loading, setLoading] = useState(false);

  const fetchHero = async () => {
    try {
      const res = await axios.get(`${backendUrl}/api/content/hero`);
      if (res.data.success && res.data.data) {
        setHero({ ...defaultHero, ...res.data.data });
      }
    } catch (error) {
      // non-fatal, keep defaults
      console.error(error);
    }
  };

  useEffect(() => {
    fetchHero();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (index, field, value) => {
    setHero((prev) => {
      const stats = [...(prev.stats || [])];
      stats[index] = { ...stats[index], [field]: value };
      return { ...prev, stats };
    });
  };

  const addStat = () => {
    setHero((prev) => ({
      ...prev,
      stats: [...(prev.stats || []), { label: "", value: "" }],
    }));
  };

  const removeStat = (index) => {
    setHero((prev) => ({
      ...prev,
      stats: (prev.stats || []).filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(
        `${backendUrl}/api/content/hero`,
        { data: hero },
        { headers: { token } }
      );
      toast.success("Hero content updated");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update hero");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      
      {/* Header */}
      <div className="px-8 py-5 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-20">
        <h2 className="text-xl font-bold text-gray-900">
          Hero Section Content
        </h2>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition-all shadow-md hover:shadow-lg disabled:opacity-50 flex items-center gap-2 text-sm"
        >
          {loading ? "Saving..." : <><FaSave /> Save Changes</>}
        </button>
      </div>

      <div className="p-8 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Left Column: Main Content */}
            <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Main Text</h3>
                
                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Role / Tagline</label>
                        <input 
                            type="text" name="role" value={hero.role} onChange={handleChange}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                            placeholder="e.g. UI/UX Designer"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Title Prefix</label>
                            <input 
                                type="text" name="titlePrefix" value={hero.titlePrefix} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                                placeholder="e.g. Hi, I'm"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Highlight Name</label>
                            <input 
                                type="text" name="highlightName" value={hero.highlightName} onChange={handleChange}
                                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all text-sm"
                                placeholder="e.g. John Doe"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">Subtitle / Bio</label>
                        <textarea 
                            name="subtitle" value={hero.subtitle} onChange={handleChange} rows={4}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-black focus:ring-1 focus:ring-black outline-none transition-all resize-y text-sm"
                            placeholder="Short bio..."
                        />
                    </div>
                </div>
            </div>

            {/* Right Column: CTAs & Stats */}
            <div className="space-y-8">
                
                {/* CTAs */}
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Call to Actions</h3>
                    
                    <div className="grid gap-4">
                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                            <p className="text-xs font-bold text-gray-400 uppercase">Primary Button</p>
                            <div className="grid grid-cols-2 gap-3">
                                <input 
                                    type="text" name="primaryCtaText" value={hero.primaryCtaText} onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm bg-white"
                                    placeholder="Text"
                                />
                                <input 
                                    type="text" name="primaryCtaLink" value={hero.primaryCtaLink} onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm bg-white"
                                    placeholder="Link (#projects)"
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                            <p className="text-xs font-bold text-gray-400 uppercase">Secondary Button</p>
                            <div className="grid grid-cols-2 gap-3">
                                <input 
                                    type="text" name="secondaryCtaText" value={hero.secondaryCtaText} onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm bg-white"
                                    placeholder="Text"
                                />
                                <input 
                                    type="text" name="secondaryCtaLink" value={hero.secondaryCtaLink} onChange={handleChange}
                                    className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm bg-white"
                                    placeholder="Link (#contact)"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                        <h3 className="text-lg font-semibold text-gray-900">Statistics</h3>
                        <button
                            type="button"
                            onClick={addStat}
                            className="text-xs flex items-center gap-1 bg-black text-white px-3 py-1.5 rounded-full hover:bg-gray-800 transition-colors"
                        >
                            <FaPlus size={10} /> Add Stat
                        </button>
                    </div>
                    
                    <div className="space-y-3">
                        {(hero.stats || []).map((stat, index) => (
                            <div key={index} className="flex gap-3 items-center group">
                                <div className="flex-1 grid grid-cols-3 gap-3">
                                    <input
                                        type="text"
                                        placeholder="Value (50+)"
                                        value={stat.value}
                                        onChange={(e) => handleStatChange(index, "value", e.target.value)}
                                        className="col-span-1 px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Label (Projects)"
                                        value={stat.label}
                                        onChange={(e) => handleStatChange(index, "label", e.target.value)}
                                        className="col-span-2 px-3 py-2 rounded-lg border border-gray-200 focus:border-black outline-none text-sm"
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => removeStat(index)}
                                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                >
                                    <FaTrash size={14} />
                                </button>
                            </div>
                        ))}
                        {(!hero.stats || hero.stats.length === 0) && (
                            <p className="text-sm text-gray-400 italic text-center py-4">No stats added yet.</p>
                        )}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </form>
  );
};

export default HeroContent;
