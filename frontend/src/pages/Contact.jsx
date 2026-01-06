import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaInstagram, FaDribbble, FaBehance, FaGithub, FaPaperPlane, FaCheckCircle } from "react-icons/fa";
import Footer from "../components/Footer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        subject: "",
        projectType: "",
        budget: "",
        message: "",
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: FaEnvelope,
      label: "Email",
      value: "tamanna.shar12@gmail.com",
      href: "mailto:tamanna.shar12@gmail.com",
    },
    {
      icon: FaPhone,
      label: "Phone",
      value: "+91 98765 43210",
      href: "tel:+919876543210",
    },
    {
      icon: FaMapMarkerAlt,
      label: "Location",
      value: "Mumbai, India",
      href: "#",
    },
  ];

  const socialLinks = [
    { icon: FaLinkedin, href: "https://www.linkedin.com/in/tamanna2112/", label: "LinkedIn", color: "hover:bg-blue-600" },
    { icon: FaGithub, href: "https://github.com/tamannashar12", label: "GitHub", color: "hover:bg-gray-700" },
    { icon: FaEnvelope, href: "mailto:tamanna.shar12@gmail.com", label: "Email", color: "hover:bg-red-500" },
  ];

  const projectTypes = [
    "UI/UX Design",
    "Web Design",
    "Mobile App Design",
    "Brand Identity",
    "Design System",
    "Other",
  ];

  const budgetRanges = [
    "Less than ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000+",
    "Let's discuss",
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section removed as per design */}

      {/* Main Content */}
      <section className="pt-0 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="hidden lg:block lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl p-8 text-white h-full relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/20 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />

                <div className="relative z-10">
                  <h2 className="text-2xl font-bold mb-2">Contact Information</h2>
                  <p className="text-gray-400 mb-8">
                    Fill up the form and I'll get back to you within 24 hours.
                  </p>

                  {/* Contact Details */}
                  <div className="space-y-6 mb-10">
                    {contactInfo.map((item, index) => (
                      <motion.a
                        key={index}
                        href={item.href}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-4 group"
                      >
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-purple-500 transition-colors duration-300">
                          <item.icon className="text-xl" />
                        </div>
                        <div>
                          <p className="text-gray-400 text-sm">{item.label}</p>
                          <p className="font-medium">{item.value}</p>
                        </div>
                      </motion.a>
                    ))}
                  </div>

                  {/* Social Links */}
                  <div>
                    <p className="text-gray-400 text-sm mb-4">Connect with me</p>
                    <div className="flex gap-3">
                      {socialLinks.map((social, index) => (
                        <motion.a
                          key={index}
                          href={social.href}
                          whileHover={{ scale: 1.1, y: -3 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center transition-colors duration-300 ${social.color}`}
                          aria-label={social.label}
                        >
                          <social.icon className="text-lg" />
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* Availability Status */}
                  <div className="mt-10 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm">
                        Available for freelance projects
                      </span>
                    </div>

                    {/* Compact What to Expect steps */}
                    <div className="space-y-2 text-xs text-gray-300">
                      {[ 
                        {
                          step: "01",
                          title: "Quick Response",
                          description:
                            "I'll get back to you within 24 hours to acknowledge your message.",
                        },
                        {
                          step: "02",
                          title: "Discovery Call",
                          description:
                            "A short call to understand your goals, timeline, and scope.",
                        },
                        {
                          step: "03",
                          title: "Proposal & Timeline",
                          description:
                            "You'll receive a clear proposal with scope, pricing, and next steps.",
                        },
                      ].map((item) => (
                        <div key={item.step} className="flex items-start gap-2">
                          <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-semibold text-purple-200">
                            {item.step}
                          </span>
                          <div>
                            <p className="font-semibold text-[11px] text-white">
                              {item.title}
                            </p>
                            <p className="text-[11px] text-gray-300">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-xl shadow-gray-200/50">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                  Send a Message
                </h3>
                <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-8">
                  I'd love to hear about your project. Fill out the form below and I'll get back to you as soon as possible.
                </p>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-16"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <FaCheckCircle className="text-4xl text-green-500" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                      Message Sent!
                    </h4>
                    <p className="text-gray-500">
                      Thank you for reaching out. I'll get back to you within 24 hours.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-sm sm:text-base"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-sm sm:text-base"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none text-sm sm:text-base"
                        placeholder="Project inquiry"
                      />
                    </div>

                    {/* Project Type & Budget Row */}
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Project Type
                        </label>
                        <select
                          name="projectType"
                          value={formData.projectType}
                          onChange={handleChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none appearance-none cursor-pointer text-sm sm:text-base"
                        >
                          <option value="">Select a type</option>
                          {projectTypes.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                          Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none appearance-none cursor-pointer text-sm sm:text-base"
                        >
                          <option value="">Select budget</option>
                          {budgetRanges.map((range) => (
                            <option key={range} value={range}>
                              {range}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2">
                        Your Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 bg-gray-50 border border-gray-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all outline-none resize-none text-sm sm:text-base"
                        placeholder="Tell me about your project, goals, and timeline..."
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 text-sm sm:text-base"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <FaPaperPlane />
                        </>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ or Additional CTA removed as per design; compact steps are shown under Contact Information */}
      
      <div className="lg:hidden">
        <Footer />
      </div>
    </div>
  );
};

export default Contact;
