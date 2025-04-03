import React from "react";
import MissionSection from "./MissionSection";
const HeroSection: React.FC = () => {
  return (
    <>
      <div className="relative w-full h-screen flex items-center justify-center p-6 bg-[url('/BG1.png')] bg-cover bg-center mb-52">
        <div className="text-center max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Revolutionizing Agriculture <br /> With AgriConnect
          </h1>
          <p className="text-lg md:text-xl mb-6">
            Unlock the potential of your land with cutting-edge sustainable
            farming techniques. AgriConnect brings together modern innovations
            and global expertise to cultivate success and growth.
          </p>
          <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-100 transition">
            go!!
          </button>
        </div>
        <div className="absolute -bottom-20   left-1/2 transform -translate-x-1/2 w-full max-w-lg  rounded-lg shadow-lg p-2">
          <img
            src="/image.png"
            alt="Agriculture field"
            className="rounded-lg w-full object-cover"
          />
        </div>
      </div>
      <MissionSection />
    </>
  );
};

export default HeroSection;
