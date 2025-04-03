import { useState } from "react";
import { useBlog } from "@/hooks/useBlog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CreateBlogPage() {
  const { createBlog } = useBlog();
  const { authState } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    category: "HEALTH"
  });

  const categories = [
    "TECHNOLOGY",
    "HEALTH",
    "LIFESTYLE",
    "EDUCATION",
    "BUSINESS",
    "SPORTS",
    "ENTERTAINMENT",
    "OTHERS"
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setNewBlog({ ...newBlog, category: value });
  };

  const handleCreateBlog = async () => {
    try {
      if (!authState) {
        toast({
          title: "Authentication required",
          description: "You must be logged in to create a blog",
          variant: "destructive",
        });
        navigate("/login");
        return;
      }

      if (!newBlog.title || !newBlog.content) {
        toast({
          title: "Missing information",
          description: "Please fill out all required fields",
          variant: "destructive",
        });
        return;
      }

      await createBlog({
        title: newBlog.title,
        content: newBlog.content,
        category: newBlog.category,
        userID: authState.id,
      });

      toast({
        title: "Blog created",
        description: "Your blog has been published successfully",
      });

      // Redirect to blogs page after successful creation
      navigate("/blogs");
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
    <div className="pt-0 px-8 pb-8 mt-10 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Blog</h1>
        <Button variant="outline" onClick={() => navigate("/blogs")}>
          Cancel
        </Button>
      </div>

      <div className="p-6 border rounded-lg shadow-md">
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
            <Select 
              value={newBlog.category}
              onValueChange={handleCategoryChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              name="content"
              value={newBlog.content}
              onChange={handleInputChange}
              placeholder="Write your blog content here..."
              className="min-h-[300px]"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={handleCreateBlog}>
            Publish Blog
          </Button>
        </div>
      </div>
    </div>
  );
}