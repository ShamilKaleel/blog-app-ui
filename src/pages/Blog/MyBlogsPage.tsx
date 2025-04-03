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
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function MyBlogsPage() {
  const { authState } = useAuth();
  const { toast } = useToast();
  const [myBlogs, setMyBlogs] = useState<BlogResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { deleteBlog } = useBlog();
  const [blogToDelete, setBlogToDelete] = useState<number | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

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

  const confirmDelete = (id: number) => {
    setBlogToDelete(id);
    setShowDeleteDialog(true);
  };

  const handleDeleteBlog = async () => {
    if (blogToDelete === null) return;
    
    try {
      await deleteBlog(blogToDelete);
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
    } finally {
      setShowDeleteDialog(false);
      setBlogToDelete(null);
    }
  };

  return (
    <div className="pt-0 px-8 pb-8 mt-10">
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              blog post and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteBlog}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

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
                    
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => confirmDelete(blog.id)}
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