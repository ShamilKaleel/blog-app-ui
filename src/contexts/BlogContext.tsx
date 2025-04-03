import React, { createContext, useContext, useState, ReactNode } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { BlogResponseDTO, CreateBlogDTO } from '@/types/blogapp'; // Import your types

// Define the BlogContext type
interface BlogContextType {
  blogs: BlogResponseDTO[];
  getAllBlogs: () => Promise<void>;
  getBlogById: (id: number) => Promise<BlogResponseDTO | null>;
  createBlog: (data: CreateBlogDTO) => Promise<BlogResponseDTO>;
  updateBlog: (id: number, data: CreateBlogDTO) => Promise<BlogResponseDTO>;
  deleteBlog: (id: number) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
export const BlogContext = createContext<BlogContextType | undefined>(undefined);

// BlogProvider component
export const BlogProvider = ({ children }: { children: ReactNode }) => {
  const [blogs, setBlogs] = useState<BlogResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get all blogs
  const getAllBlogs = async () => {
    setIsLoading(false);
    try {
      const response = await axiosInstance.get('/blogs/all');
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Get a single blog by ID
  const getBlogById = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching blog by ID", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new blog
  const createBlog = async (data: CreateBlogDTO) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/blogs/create', data);
      return response.data;
    } catch (error) {
      console.error("Error creating blog", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing blog
  const updateBlog = async (id: number, data: CreateBlogDTO) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(`/blogs/${id}`, data);
      return response.data;
    } catch (error) {
      console.error("Error updating blog", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a blog
  const deleteBlog = async (id: number) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/blogs/${id}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        getAllBlogs,
        getBlogById,
        createBlog,
        updateBlog,
        deleteBlog,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

// Custom hook to use the BlogContext
export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};
