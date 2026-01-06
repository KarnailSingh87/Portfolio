import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const fallbackProjects = [
  {
    _id: 'p1',
    title: 'E-commerce UX Redesign',
    shortDescription: 'Improved checkout flow and product discovery for a mid-size retailer.',
    image: 'https://placehold.co/600x400?text=Project+1',
    category: 'UX Design'
  },
  {
    _id: 'p2',
    title: 'Mobile App Onboarding',
    shortDescription: 'Crafted onboarding flows that increased activation rate by 24%.',
    image: 'https://placehold.co/600x400?text=Project+2',
    category: 'Mobile Design'
  },
  {
    _id: 'p3',
    title: 'Design System',
    shortDescription: 'Built a scalable design system for consistent cross-product UI.',
    image: 'https://placehold.co/600x400?text=Project+3',
    category: 'Design Systems'
  }
];

const ProjectsGrid = () => {
  const [projects, setProjects] = useState(fallbackProjects);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (!backendUrl) return;
        const res = await axios.get(`${backendUrl}/api/project/list`);
        if (res.data.success && Array.isArray(res.data.projects) && res.data.projects.length > 0) {
          setProjects(res.data.projects.filter((p) => p.featured !== false));
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProjects();
  }, []);
  return (
    <section id="projects" className="py-2 md:py-10">
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10" />

        <div className="px-4 py-4 md:px-12 md:py-12">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, index) => (
              <motion.article 
                key={p._id || p.id} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-white group cursor-pointer border border-gray-100"
              >
                <Link to={`/project/${p._id || p.id}`}>
                  <div className="relative overflow-hidden h-[300px] sm:h-[400px]">
                    <img 
                      src={p.image || "https://placehold.co/600x400?text=No+Image"} 
                      alt={p.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=No+Image"; }}
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                    
                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white">
                      {p.category}
                    </span>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
                      <h3 className="font-bold text-2xl text-white mb-2">{p.title}</h3>
                      {/* <p className="text-gray-300 text-sm line-clamp-2 mb-4 opacity-90">{p.shortDescription || p.description}</p> */}
                      <div className="flex items-center text-white/90 text-sm font-medium group-hover:text-purple-400 transition-colors">
                        View Case Study 
                        <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsGrid;
