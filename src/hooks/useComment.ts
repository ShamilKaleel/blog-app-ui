import { useContext } from 'react';
import { CommentContext } from '@/contexts/CommentContext';

// Custom hook to use CommentContext
export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error('useComment must be used within a CommentProvider');
  }
  return context;
};
