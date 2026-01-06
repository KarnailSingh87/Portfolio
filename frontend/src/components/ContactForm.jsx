import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPaperPlane, FaCheck, FaUser, FaEnvelope, FaPen } from 'react-icons/fa';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [focused, setFocused] = useState('');

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  const inputClasses = (field) => `
    w-full px-4 py-4 pl-12 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300
    ${focused === field ? 'border-purple-500 bg-white shadow-lg shadow-purple-500/10' : 'border-gray-200 hover:border-gray-300'}
  `;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-lg h-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">Send a Message</h3>
      <p className="text-gray-600 mb-8">I'd love to hear about your project. Fill out the form below.</p>

      <form onSubmit={submit} className="space-y-5">
        {/* Name & Email Row */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="relative">
            <FaUser className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused === 'name' ? 'text-purple-500' : 'text-gray-400'}`} />
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              onFocus={() => setFocused('name')}
              onBlur={() => setFocused('')}
              placeholder="Your name"
              className={inputClasses('name')}
            />
          </div>
          <div className="relative">
            <FaEnvelope className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused === 'email' ? 'text-purple-500' : 'text-gray-400'}`} />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              onFocus={() => setFocused('email')}
              onBlur={() => setFocused('')}
              placeholder="Your email"
              className={inputClasses('email')}
            />
          </div>
        </div>

        {/* Subject */}
        <div className="relative">
          <FaPen className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${focused === 'subject' ? 'text-purple-500' : 'text-gray-400'}`} />
          <input
            required
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            onFocus={() => setFocused('subject')}
            onBlur={() => setFocused('')}
            placeholder="Subject"
            className={inputClasses('subject')}
          />
        </div>

        {/* Message */}
        <div className="relative">
          <textarea
            required
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused('')}
            placeholder="Tell me about your project..."
            rows={5}
            className={`
              w-full px-4 py-4 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-300 resize-none
              ${focused === 'message' ? 'border-purple-500 bg-white shadow-lg shadow-purple-500/10' : 'border-gray-200 hover:border-gray-300'}
            `}
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={sent}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full py-4 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300
            ${sent 
              ? 'bg-green-500' 
              : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg shadow-purple-500/30'
            }
          `}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.span
                key="sent"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <FaCheck /> Message Sent!
              </motion.span>
            ) : (
              <motion.span
                key="send"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                Send Message <FaPaperPlane />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      {/* Trust Indicators */}
      <div className="mt-8 pt-6 border-t border-gray-100">
        <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            Usually responds in 48hrs
          </span>
          <span>•</span>
          <span>100% Response Rate</span>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
