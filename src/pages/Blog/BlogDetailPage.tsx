import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBlog } from "@/hooks/useBlog";
import { useComment } from "@/hooks/useComment";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { BlogResponseDTO, CommentResponseDTO } from "@/types/blogapp";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Calendar, Edit, Trash, User } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getBlogById, deleteBlog } = useBlog();
  const { comments, getCommentsByBlogId, createComment, deleteComment, updateComment } = useComment();
  const { authState } = useAuth();
  const { toast } = useToast();

  const [blog, setBlog] = useState<BlogResponseDTO | null>(null);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");

  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (!id) return;

      try {
        setIsLoading(true);
        const blogId = parseInt(id);
        const blogData = await getBlogById(blogId);
        
        if (blogData) {
          setBlog(blogData);
          await getCommentsByBlogId(blogId);
          
          // Debug info
          console.log("Auth state:", authState);
          console.log("Blog data:", blogData);
        } else {
          toast({
            title: "Blog not found",
            description: "The requested blog could not be found",
            variant: "destructive",
          });
          navigate("/blogs");
        }
      } catch (error) {
        console.error("Error fetching blog details:", error);
        toast({
          title: "Error",
          description: "Failed to load blog details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  const handleSubmitComment = async () => {
    if (!id || !authState || !newComment.trim()) return;

    try {
      await createComment({
        content: newComment,
        blogId: parseInt(id),
        userId: 1, // Replace with actual user ID from authState
      });

      setNewComment("");
      toast({
        title: "Comment posted",
        description: "Your comment has been posted successfully",
      });

      // Refresh comments
      await getCommentsByBlogId(parseInt(id));
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Failed to post comment",
        description: "An error occurred while posting your comment",
        variant: "destructive",
      });
    }
  };

  const handleDeleteBlog = async () => {
    if (!id || !authState) return;

    // Show confirmation dialog
    if (!window.confirm("Are you sure you want to delete this blog?")) {
      return;
    }

    try {
      await deleteBlog(parseInt(id));
      toast({
        title: "Blog deleted",
        description: "Your blog has been deleted successfully",
      });
      navigate("/blogs");
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Failed to delete blog",
        description: "An error occurred while deleting the blog",
        variant: "destructive",
      });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    // Show confirmation dialog
    if (!window.confirm("Are you sure you want to delete this comment?")) {
      return;
    }
    
    try {
      await deleteComment(commentId);
      toast({
        title: "Comment deleted",
        description: "The comment has been deleted successfully",
      });
      
      // Refresh comments
      if (id) {
        await getCommentsByBlogId(parseInt(id));
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Failed to delete comment",
        description: "An error occurred while deleting the comment",
        variant: "destructive",
      });
    }
  };

  const startEditComment = (comment: CommentResponseDTO) => {
    setEditingCommentId(comment.id);
    setEditCommentContent(comment.content);
  };

  const cancelEditComment = () => {
    setEditingCommentId(null);
    setEditCommentContent("");
  };

  const handleUpdateComment = async () => {
    if (!id || !authState || !editingCommentId || !editCommentContent.trim()) return;

    try {
      await updateComment(editingCommentId, {
        content: editCommentContent,
        blogId: parseInt(id),
        userId: 1, // Replace with actual user ID from authState
      });

      setEditingCommentId(null);
      setEditCommentContent("");
      
      toast({
        title: "Comment updated",
        description: "Your comment has been updated successfully",
      });

      // Refresh comments
      await getCommentsByBlogId(parseInt(id));
    } catch (error) {
      console.error("Error updating comment:", error);
      toast({
        title: "Failed to update comment",
        description: "An error occurred while updating your comment",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="pt-0 px-8 pb-8 mt-10 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog Not Found</h1>
        <p className="mb-6">The blog you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate("/blogs")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Return to Blogs
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-0 px-8 pb-8 mt-10">
      <Button 
        variant="ghost" 
        className="mb-6"
        onClick={() => navigate("/blogs")}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
      </Button>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center mb-2 text-muted-foreground">
                <span className="px-2 py-1 rounded-full bg-secondary text-xs font-medium mr-4">
                  {blog.category}
                </span>
                <User className="h-4 w-4 mr-1" /> {blog.authorName}
              </div>
              <CardTitle className="text-3xl">{blog.title}</CardTitle>
            </div>
            
            {/* Show delete button only if the current user is the author */}
            {authState && authState.username === blog.authorEmail && (
              <Button variant="destructive" size="sm" onClick={handleDeleteBlog}>
                Delete Blog
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose dark:prose-invert max-w-none">
            {/* Display blog content with proper formatting */}
            {blog.content.split('\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        
        {/* Comment Form */}
        {authState ? (
          <div className="mb-6">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="mb-2"
            />
            <Button onClick={handleSubmitComment} disabled={!newComment.trim()}>
              Post Comment
            </Button>
          </div>
        ) : (
          <div className="mb-6 p-4 bg-secondary rounded-lg">
            <p>Please <Button variant="link" className="p-0" onClick={() => navigate("/login")}>log in</Button> to leave a comment.</p>
          </div>
        )}

        {/* Comments List */}
        {comments.length > 0 ? (
          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="font-medium flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {comment.commenterName}
                    </div>
                    
                    {/* Show edit/delete options for all comments during debugging */}
                    {authState && (
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => startEditComment(comment)}
                          className="h-8 text-primary hover:text-primary"
                        >
                          <Edit className="h-4 w-4 mr-1" /> Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleDeleteComment(comment.id)}
                          className="h-8 text-destructive hover:text-destructive"
                        >
                          <Trash className="h-4 w-4 mr-1" /> Delete
                        </Button>
                      </div>
                    )}
                    
                    {/* Debug information to see values */}
                    {authState && (
                      <div className="text-xs text-muted-foreground mt-1">
                        User: {authState.username} | Commenter: {comment.commenterName}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {editingCommentId === comment.id ? (
                    <div className="space-y-2">
                      <Textarea
                        value={editCommentContent}
                        onChange={(e) => setEditCommentContent(e.target.value)}
                        className="mb-2"
                      />
                      <div className="flex space-x-2">
                        <Button onClick={handleUpdateComment} size="sm">Save</Button>
                        <Button onClick={cancelEditComment} variant="outline" size="sm">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <p>{comment.content}</p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 bg-secondary rounded-lg">
            <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
}