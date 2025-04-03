import React from 'react';
import { BlogResponseDTO } from '@/types/blogapp';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';

interface BlogCardProps {
  blog: BlogResponseDTO;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const navigate = useNavigate();

  // Function to truncate long text with ellipsis
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-lg cursor-pointer" 
          onClick={() => navigate(`/blogs/${blog.id}`)}>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="text-sm text-muted-foreground flex items-center">
            <User className="h-4 w-4 mr-1" />
            {blog.authorName}
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
              {blog.category}
            </span>
          </div>
        </div>
        <CardTitle className="text-xl mt-2">{blog.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground">
          {truncateText(blog.content, 150)}
        </p>
      </CardContent>
      <CardFooter className="pt-2 border-t">
        <Button variant="outline" size="sm" className="w-full">
          Read More
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;