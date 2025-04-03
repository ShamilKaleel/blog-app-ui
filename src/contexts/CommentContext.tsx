import React, { createContext, useContext, useState, ReactNode } from 'react';
import axiosInstance from '@/api/axiosInstance';
import { CommentResponseDTO, CreateCommentDTO } from '@/types/blogapp'; // Import your types

// Define the CommentContext type
interface CommentContextType {
  comments: CommentResponseDTO[];
  getCommentsByBlogId: (blogId: number) => Promise<void>;
  createComment: (data: CreateCommentDTO) => Promise<CommentResponseDTO>;
  updateComment: (id: number, data: CreateCommentDTO) => Promise<CommentResponseDTO>;
  deleteComment: (id: number) => Promise<void>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
export const CommentContext = createContext<CommentContextType | undefined>(undefined);

// CommentProvider component
export const CommentProvider = ({ children }: { children: ReactNode }) => {
  const [comments, setComments] = useState<CommentResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Get all comments for a specific blog
  const getCommentsByBlogId = async (blogId: number) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.get(`/comments/blog/${blogId}`);
      setComments(response.data);
    } catch (error) {
      console.error("Error fetching comments", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new comment
  const createComment = async (data: CreateCommentDTO) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post('/comments/create', data);
      setComments((prevComments) => [...prevComments, response.data]);
      return response.data;
    } catch (error) {
      console.error("Error creating comment", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing comment
  const updateComment = async (id: number, data: CreateCommentDTO) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(`/comments/${id}`, data);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, ...response.data } : comment
        )
      );
      return response.data;
    } catch (error) {
      console.error("Error updating comment", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a comment
  const deleteComment = async (id: number) => {
    setIsLoading(true);
    try {
      await axiosInstance.delete(`/comments/${id}`);
      setComments((prevComments) => prevComments.filter((comment) => comment.id !== id));
    } catch (error) {
      console.error("Error deleting comment", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CommentContext.Provider
      value={{
        comments,
        getCommentsByBlogId,
        createComment,
        updateComment,
        deleteComment,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </CommentContext.Provider>
  );
};

// Custom hook to use the CommentContext
export const useComment = (): CommentContextType => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComment must be used within a CommentProvider');
  }
  return context;
};
