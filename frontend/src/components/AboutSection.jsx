import React from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload } from 'react-icons/fa';

const AboutSection = ({ name = 'Tamanna', role = 'UI/UX Designer', bio }) => {
  return (
    <section className="py-10" id="about">
      <div className="relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-sm">
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-purple-50 to-transparent -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl -z-10" />

        <div className="px-4 py-6 md:px-12 md:py-12">
          <div className="grid md:grid-cols-2 gap-6 md:gap-12 items-center">
              
              {/* Image Column */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="relative flex justify-center"
              >
                <div className="relative">
                  {/* Rings */}
                  <div className="absolute inset-0 rounded-full border border-gray-200 scale-110" />
                  <div className="absolute inset-0 rounded-full border border-gray-100 scale-125" />
                  
                  <img
                    src={assets.profile || assets.about_img}
                    alt={name}
                    className="w-40 h-40 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full shadow-2xl object-cover border-4 border-white relative z-10"
                  />
                  {/* Floating Badge */}
                  <div className="absolute bottom-0 right-0 z-20 bg-white p-2 sm:p-4 rounded-xl shadow-xl border border-gray-100 hidden md:block">
                    <p className="text-xs sm:text-sm text-gray-500">Experience</p>
                    <p className="text-lg sm:text-2xl font-bold text-gray-800">2+ Years</p>
                  </div>
                </div>
              </motion.div>

              {/* Content Column */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center md:text-left"
              >
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-2 sm:mb-4 leading-tight">
                  Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">{name}</span>
                </h2>
                <h3 className="text-lg sm:text-xl text-gray-600 mb-4 sm:mb-6 font-medium">{role}</h3>
                
                <div className="space-y-2 sm:space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  <p>
                    {bio || "I design thoughtful digital experiences with a focus on usability, accessibility and visual storytelling. I work end-to-end — from research and wireframes to high-fidelity prototypes and handoff."}
                  </p>
                  <p>
                    Passionate about creating intuitive interfaces that solve real problems. I believe in the power of design to bridge the gap between complex technology and human needs.
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <a 
                    href="/resume.pdf" 
                    download="Tamanna's resume.pdf"
                    target="_blank"
                    className="px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base bg-white text-gray-800 border border-gray-200 rounded-full font-medium hover:border-gray-400 hover:bg-gray-50 transition-all flex items-center gap-2"
                  >
                    <FaDownload />
                    Resume
                  </a>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-6 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-100">
                  <div>
                    <h4 className="text-xl sm:text-3xl font-bold text-gray-900">20+</h4>
                    <p className="text-xs sm:text-sm text-gray-500">Projects</p>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-3xl font-bold text-gray-900">10+</h4>
                    <p className="text-xs sm:text-sm text-gray-500">Clients</p>
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-3xl font-bold text-gray-900">100%</h4>
                    <p className="text-xs sm:text-sm text-gray-500">Satisfaction</p>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
    </section>
  );
};

export default AboutSection;
