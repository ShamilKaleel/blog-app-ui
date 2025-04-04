import { useContext } from "react";
import { BlogContext } from "@/contexts/BlogContext"; // Import the BlogContext

// Custom hook to use BlogContext
export const useBlog = () => {
  const context = useContext(BlogContext);

  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }

  return context;
};
