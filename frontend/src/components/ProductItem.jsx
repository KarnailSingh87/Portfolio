import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({
  id,
  image,
  name,
  price,
  rating = 0,
  subCategory = "",
}) => {
  const { currency } = useContext(ShopContext);
  const [hovered, setHovered] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(generateRandomTime());

  const originalPrice = Math.round(price / 0.8);

  function generateRandomTime() {
    const min = 2 * 60 * 60;
    const max = 24 * 60 * 60;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? generateRandomTime() : prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / (24 * 3600));
    const h = Math.floor((seconds % (24 * 3600)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${d > 0 ? `${d}d ` : ""}${h}h ${m}m ${s}s`;
  };

  return (
    <div
      className="group relative bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${id}`} className="block h-full">
        {/* Image Section */}
        <div className="relative w-full h-[350px] bg-gray-100 overflow-hidden">
          <img
            src={(Array.isArray(image) && image.length > 0 && image[0]) ? image[0] : "https://placehold.co/600x400?text=No+Image"}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400?text=No+Image"; }}
          />
          {Array.isArray(image) && image.length > 1 && image[1] && (
            <img
              src={image[1]}
              alt="hover-preview"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />

          {/* Wishlist */}
          <div className="absolute top-3 right-3 z-10">
            <button
              title="Wishlist"
              onClick={(e) => {
                e.preventDefault();
                setWishlisted(!wishlisted);
              }}
              className="bg-white/20 backdrop-blur-md p-2 rounded-full shadow hover:bg-white/40 transition-colors text-white"
            >
              {wishlisted ? (
                <FaHeart className="text-red-500" size={18} />
              ) : (
                <FaRegHeart size={18} />
              )}
            </button>
          </div>

          {/* In Stock Badge */}
          <div className="absolute top-3 left-3">
            <span className="bg-green-500/90 backdrop-blur-sm text-white text-[11px] px-2 py-1 rounded-full shadow-sm">
              In Stock
            </span>
          </div>

          {/* Info Section Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
            <p className="text-lg font-bold text-white line-clamp-1 mb-1">
              {name}
            </p>
            
            {subCategory && (
              <p className="text-xs text-gray-300 mb-2">{subCategory}</p>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                 <div className="flex items-center gap-2">
                    <p className="text-lg font-bold text-white">
                      {currency}{price}
                    </p>
                    <p className="text-xs text-gray-400 line-through">
                      {currency}{originalPrice}
                    </p>
                 </div>
                 <p className="text-[10px] text-red-400 mt-0.5">
                    Ends in {formatTime(timeLeft)}
                 </p>
              </div>
              
              <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-semibold px-2 py-1 rounded-full">
                20% OFF
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductItem;
