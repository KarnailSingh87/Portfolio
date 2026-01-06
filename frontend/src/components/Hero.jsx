import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { assets } from "../assets/assets";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const defaultHero = {
  role: "UI/UX Designer",
  titlePrefix: "Hi, I'm",
  highlightName: "Tamanna",
  subtitle:
    "I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff.",
  primaryCtaText: "View Projects",
  primaryCtaLink: "/projects",
  secondaryCtaText: "Get In Touch",
  secondaryCtaLink: "/contact",
  stats: [
    { value: "50+", label: "Projects Completed" },
    { value: "3+", label: "Years Experience" },
    { value: "30+", label: "Happy Clients" },
  ],
};

const Hero = () => {
  const [hero, setHero] = useState(defaultHero);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        if (!backendUrl) return;
        const res = await axios.get(`${backendUrl}/api/content/hero`);
        if (res.data.success && res.data.data) {
          setHero((prev) => ({ ...prev, ...res.data.data }));
        }
      } catch (error) {
        // fail silently, use defaults
        console.error(error);
      }
    };

    fetchHero();
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full min-h-[25vh] lg:h-[80vh] flex items-center justify-center overflow-hidden bg-white rounded-3xl border border-gray-100 shadow-lg py-2 lg:py-0"
    >
      {/* Background Glows */}
      <div className="absolute w-[400px] h-[400px] bg-purple-500/5 blur-[150px] rounded-full -top-20 -left-20 z-0" />
      <div className="absolute w-[300px] h-[300px] bg-pink-500/5 blur-[120px] rounded-full bottom-10 right-10 z-0" />
      <div className="absolute w-[200px] h-[200px] bg-blue-500/5 blur-[100px] rounded-full top-1/2 left-1/2 z-0" />

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] z-0"
        style={{
          backgroundImage: `linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-row items-center justify-between w-full px-2 md:px-12 gap-2 lg:gap-8 max-w-[1400px]">
        {/* Text Section */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          className="w-[55%] lg:w-1/2 text-left"
        >
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-purple-600 text-[8px] sm:text-sm uppercase tracking-[0.15em] sm:tracking-[0.3em] mb-1 sm:mb-4 font-medium"
          >
            {hero.role}
          </motion.p>

          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-2 sm:mb-6 leading-tight"
          >
            <span className="text-gray-900 block">{hero.titlePrefix}</span>
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 text-transparent bg-clip-text block mt-1">
              {hero.highlightName}
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-gray-600 text-[10px] sm:text-xl mb-3 sm:mb-8 max-w-xl mx-0 leading-relaxed line-clamp-3 sm:line-clamp-none"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex flex-wrap justify-start gap-2 sm:gap-4"
          >
            <Link
              to="/projects"
              className="px-3 py-1.5 sm:px-8 sm:py-4 text-[10px] sm:text-base bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              {hero.primaryCtaText}
            </Link>
            <Link
              to="/contact"
              className="px-3 py-1.5 sm:px-8 sm:py-4 text-[10px] sm:text-base border border-purple-200 text-purple-600 rounded-full font-semibold hover:bg-purple-50 transition-all duration-300"
            >
              {hero.secondaryCtaText}
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-wrap justify-start gap-3 sm:gap-8 mt-4 sm:mt-12"
          >
            {(hero.stats || []).map((stat, index) => (
              <div key={index} className="text-left">
                <p className="text-sm sm:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-500 text-[8px] sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Image Side */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="w-[45%] lg:w-1/2 flex justify-end relative"
        >
          <div className="relative w-[130px] h-[130px] sm:w-[400px] sm:h-[400px]">
            {/* Decorative Circles */}
            <div className="absolute inset-0 border-2 border-purple-100 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 border border-pink-100 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Main Image Container */}
            <div className="absolute inset-8 rounded-full overflow-hidden border-4 border-white shadow-2xl">
              <img 
                src={assets.about_img} 
                alt="Tamanna" 
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - Right Bottom Corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
        className="absolute bottom-2 right-2 lg:bottom-8 lg:right-8"
      >
        <div className="w-4 h-7 sm:w-6 sm:h-10 border-2 border-purple-400 rounded-full flex justify-center pt-1 sm:pt-2">
          <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-purple-400 rounded-full" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;