import { useEffect, useState } from "react";
import { useBlog } from "@/hooks/useBlog";
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BlogResponseDTO } from "@/types/blogapp";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import axiosInstance from "@/api/axiosInstance";

export default function MyBlogsPage() {
  const { authState } = useAuth();
  const { toast } = useToast();
  const [myBlogs, setMyBlogs] = useState<BlogResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { deleteBlog } = useBlog();

  useEffect(() => {
    fetchMyBlogs();
  }, [authState]);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      if (authState) {
        // We'll use the user ID from the authentication state
        const response = await axiosInstance.get(`/blogs/user/${authState.id}`);
        setMyBlogs(response.data);
      }
    } catch (error) {
      console.error("Error fetching my blogs:", error);
      toast({
        title: "Error",
        description: "Failed to fetch your blogs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBlog = async (id: number) => {
    try {
      await deleteBlog(id);
      toast({
        title: "Blog deleted",
        description: "Your blog was deleted successfully",
      });
      // Refresh the list after deletion
      fetchMyBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast({
        title: "Error",
        description: "Failed to delete the blog. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-0 px-8 pb-8 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Blogs</h1>
        <Link to="/create-blog">
          <Button className="flex items-center gap-2">
            Create New Blog
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-t-primary border-opacity-50 rounded-full animate-spin"></div>
        </div>
      ) : myBlogs.length === 0 ? (
        <div className="text-center py-12 bg-muted rounded-lg">
          <h2 className="text-xl font-semibold mb-2">You haven't created any blogs yet</h2>
          <p className="text-muted-foreground mb-6">Start sharing your thoughts by creating your first blog post</p>
          <Link to="/create-blog">
            <Button>Create Your First Blog</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myBlogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden">
              <CardHeader className="bg-muted p-4">
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <div className="text-sm text-muted-foreground mt-1">
                  Category: <span className="font-medium">{blog.category}</span>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="mb-4">
                  <p className="text-sm line-clamp-3">{blog.content}</p>
                </div>
                <div className="flex justify-between items-center mt-auto">
                  <Link to={`/blogs/${blog.id}`}>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </Link>
                  <div className="flex gap-2">
                    <Link to={`/edit-blog/${blog.id}`}>
                      <Button variant="outline" size="icon" className="h-8 w-8">
                        <Edit size={16} />
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleDeleteBlog(blog.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}