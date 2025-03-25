import { useContext } from "react";
import { CourseContext } from "@/contexts/courseContext";

// Custom hook to use CourseContext
export const useCourse = () => {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error("useCourse must be used within a CourseProvider");
  }

  return context;
};
