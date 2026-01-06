import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import { FaUserCircle, FaBoxOpen, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-lg px-4 sm:px-6 py-5 flex items-center justify-center transition-all duration-300 border-b border-gray-100">

        {/* Desktop Links */}
        <nav className="flex items-center gap-4 sm:gap-10 text-gray-700 text-xs sm:text-base font-medium">
          {[
            { to: '/', label: 'HOME' },
            { to: '/projects', label: 'PROJECTS' },
            { to: '/about', label: 'ABOUT' },
            { to: '/contact', label: 'CONTACT' },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `hover:text-black transition duration-300 ${
                  isActive ? 'text-black font-semibold underline underline-offset-4' : ''
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Mobile Menu Button - Hidden */}
        <button
          onClick={() => setMobileOpen(true)}
          className="hidden p-2 hover:bg-gray-100 rounded-full transition"
        >
          <img src={assets.menu_icon} alt="menu" className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 animate-fadeIn"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}

      {/* Mobile Fullscreen Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-500 ease-in-out ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b">
            <h2 className="text-lg font-semibold tracking-wide">Menu</h2>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <img
                src={assets.dropdown_icon}
                alt="close"
                className="rotate-180 w-4 h-4"
              />
            </button>
          </div>

          {/* Links */}
          <div className="flex flex-col text-gray-800 text-base font-medium">
            {[
              { to: "/", label: "Home" },
              { to: "/projects", label: "Projects" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" },
            ].map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className="py-4 px-6 border-b hover:bg-gray-50 transition"
              >
                {label}
              </NavLink>
            ))}

            {token && (
              <>
                <div className="px-6 text-center pt-5 pb-2 text-s text-gray-900 uppercase tracking-widest font-semibold">
                  Your Account
                </div>

                <NavLink
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 px-6 border-b hover:bg-gray-50 transition"
                >
                  <FaUserCircle className="text-gray-600 w-5 h-5" />
                  <span>My Profile</span>
                </NavLink>

                <NavLink
                  to="/orders"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 px-6 border-b hover:bg-gray-50 transition"
                >
                  <FaBoxOpen className="text-gray-600 w-5 h-5" />
                  <span>Orders</span>
                </NavLink>

                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="flex items-center gap-3 py-4 px-6 text-left border-b text-red-500 hover:bg-red-50 transition"
                >
                  <FaSignOutAlt className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Spacer */}
      <div className="h-20 sm:h-24"></div>
    </>
  );
};

export default Navbar;
