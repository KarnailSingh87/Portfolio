import React from 'react';
import { motion } from 'framer-motion';

const skills = [
  'Canva',
  'Photoshop',
  'Adobe',
  'Figma'
];

const Skills = () => {
  return (
    <section className="relative bg-white text-gray-800 overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4 md:px-12 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-6">
          {/* Left: heading + description */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Skills & Tools
            </h3>
            <p className="text-gray-500 text-[10px] sm:text-sm mt-1 whitespace-nowrap">
              Tools and disciplines I use to craft human-centered interfaces.
            </p>
          </motion.div>

          {/* Right: skill pills */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap justify-center md:justify-end gap-3"
          >
            {skills.map((s) => (
              <span
                key={s}
                className="px-4 py-2 rounded-full bg-gray-50 border border-gray-100 text-sm text-gray-600 hover:text-purple-600 hover:border-purple-100 hover:bg-purple-50 transition-all duration-300"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
