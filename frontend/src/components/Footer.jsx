import React from "react";
import { FaInstagram, FaGithub, FaFacebookF, FaHeart, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    { icon: FaLinkedinIn, href: "https://www.linkedin.com/in/tamanna2112/", color: "hover:bg-blue-600", label: "LinkedIn" },
    { icon: FaGithub, href: "https://github.com/tamannashar12", color: "hover:bg-gray-900", label: "GitHub" },
    { icon: FaEnvelope, href: "mailto:tamanna.shar12@gmail.com", color: "hover:bg-gradient-to-br hover:from-purple-500 hover:via-pink-500 hover:to-orange-400", label: "Email" },
  ];

  return (
    <footer className="relative bg-white text-gray-800 overflow-hidden rounded-3xl border border-gray-100 shadow-lg mt-2 md:mt-10">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-4 md:px-12 md:py-8">
        {/* Compact Footer Content */}
        <div className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center gap-4 md:gap-6">
          {/* Brand */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="text-left"
          >
            <h2 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
              Tamanna
            </h2>
            <p className="text-gray-500 text-[10px] sm:text-sm">UI/UX Designer</p>
          </motion.div>

          {/* Navigation Links */}
          <motion.nav 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex gap-3 sm:gap-6 text-[10px] sm:text-sm"
          >
            {['Home', 'Projects', 'About', 'Contact'].map((link) => (
              <a
                key={link}
                href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                className="text-gray-600 hover:text-purple-600 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </motion.nav>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex gap-2 sm:gap-4"
          >
            {socialLinks.map(({ icon: Icon, href, color, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                className={`w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-white hover:border-transparent ${color} transition-all duration-300`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="text-xs sm:text-base" />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-2 sm:mt-6 pt-2 sm:pt-4 border-t border-gray-200 flex flex-row justify-between items-center gap-2 text-[10px] sm:text-xs text-gray-500">
          <p>© 2026 Tamanna. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-red-500 animate-pulse text-[10px]" /> in India
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
