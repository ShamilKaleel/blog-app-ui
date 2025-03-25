import React from "react";
import { FaLeaf, FaUsers, FaChalkboardTeacher } from "react-icons/fa";

const MissionSection: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between px-6 md:px-16 py-12 ">
      {/* Left Content */}
      <div className="md:w-1/2 text-left">
        <h2 className="text-green-600 text-3xl md:text-4xl font-bold mb-4">
          Mission we <br /> are working on
        </h2>
        <p className="text-muted-foreground text-lg mb-6">
          At AgriConnect, we are committed to transforming agriculture in Sri
          Lanka by fostering sustainable land utilization, encouraging youth
          engagement in farming, providing education and training, and
          strengthening community development. Our platform connects landowners,
          entrepreneurs, and allied farmers, ensuring efficient land use, modern
          farming techniques, and a thriving agricultural ecosystem.
        </p>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <FaLeaf className="text-green-600 text-xl" />
            <span className=" font-medium">Sustainable Land Utilization</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaUsers className="text-green-600 text-xl" />
            <span className=" font-medium">
              Youth Engagement in Agriculture
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaChalkboardTeacher className="text-green-600 text-xl" />
            <span className="t font-medium">Education and Training</span>
          </div>
        </div>
      </div>

      {/* Right Content - Image Grid */}
      <div className="md:max-w-[310px] flex flex-col items-center gap-4 mt-60 md:mt-0">
        <img
          src="/Image1.png"
          alt="Wheat field"
          className="w-full rounded-lg shadow-md"
        />
        <div className="flex gap-4 w-full">
          <img
            src="/Image2.png"
            alt="Farm land"
            className="w-1/2 rounded-lg shadow-md"
          />
          <img
            src="/Image3.png"
            alt="Market produce"
            className="w-1/2 rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
