import React from 'react'
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "New Season Sneakers",
    subtitle: "Up to 40% Off",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db",
    title: "Running Essentials",
    subtitle: "Lightweight & Comfortable",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
    title: "Street Style Shoes",
    subtitle: "Premium Collection",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[380px] overflow-hidden rounded-2xl shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700
            ${index === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center">
            <div className="px-10 text-white max-w-xl">
              <h2 className="text-4xl font-bold mb-3">
                {slide.title}
              </h2>
              <p className="text-lg mb-5">
                {slide.subtitle}
              </p>
              <button className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full
              ${index === current ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </div>
  );
}

export default Carousel;
