import { useEffect, useState } from "react";
import { useBlog } from "@/hooks/useBlog";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { BlogResponseDTO } from "@/types/blogapp";
import { useAuth } from "@/hooks/useAuth";
import BlogCard from "@/components/BlogCard";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";

export default function BlogsPage() {
  const { blogs, getAllBlogs, createBlog, isLoading } = useBlog();
  const { authState } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "HEALTH"
  });

  useEffect(() => {
    getAllBlogs();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCreateBlog = async () => {
    try {
      if (!authState) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to create a blog",
          variant: "destructive",
        });
        return;
      }

      if (!newBlog.title || !newBlog.content) {
        toast({
          title: "Missing information",
          description: "Please fill out all fields",
          variant: "destructive",
        });
        return;
      }

      // This assumes your API needs a userID in the BlogDTO
      await createBlog({
        title: newBlog.title,
        content: newBlog.content,
        category: newBlog.category,
        userID: 1, // You should replace this with the actual user ID from authState
      });

      toast({
        title: "Blog created",
        description: "Your blog has been published successfully",
      });

      setNewBlog({
        title: "",
        content: "",
        category: ""
      });
      
      setShowCreateForm(false);
      // Refresh blogs list
      getAllBlogs();
    } catch (error: any) {
      console.error("Error creating blog:", error);
      toast({
        title: "Failed to create blog",
        description: error.response?.data?.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="pt-0 px-8 pb-8 mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Blogs</h1>
        {authState && (
          <Button onClick={() => setShowCreateForm(!showCreateForm)}>
            {showCreateForm ? "Cancel" : "Create New Blog"}
          </Button>
        )}
      </div>

      {/* Blog Creation Form */}
      {showCreateForm && (
        <div className="mb-8 p-6 border rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={newBlog.title}
                onChange={handleInputChange}
                placeholder="Enter blog title"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                name="category"
                value={newBlog.category}
                onChange={handleInputChange}
                placeholder="Enter blog category"
              />
            </div>
            <div>
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={newBlog.content}
                onChange={handleInputChange}
                placeholder="Write your blog content here..."
                className="min-h-[200px]"
              />
            </div>
          </div>
          <Button className="mt-4" onClick={handleCreateBlog}>
            Publish Blog
          </Button>
        </div>
      )}

      {/* Blog List */}
      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
        </div>
      ) : blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h3 className="text-xl font-medium text-gray-500 dark:text-gray-400">
            No blogs available
          </h3>
          <p className="mt-2 text-gray-400 dark:text-gray-500">
            Be the first to publish a blog!
          </p>
        </div>
      )}
    </div>
  );
}