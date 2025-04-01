import { useEffect } from 'react';
import { useBlog } from '@/hooks/useBlog'; // Import the useBlog hook
import { BlogResponseDTO } from '@/types/blogapp'; // Import the BlogResponseDTO type

const  DashboardPage = () => {
  const { blogs, getAllBlogs, isLoading } = useBlog(); // Use the custom hook to access BlogContext

  useEffect(() => {
    getAllBlogs(); // Fetch blogs on component mount
  }, [getAllBlogs]);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold my-8">Latest Blogs</h1>
      
      {isLoading ? (
        <p className="text-center">Loading blogs...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {blogs.map((blog: BlogResponseDTO) => (
            <div key={blog.id} className="border rounded-lg overflow-hidden shadow-lg">
              
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 text-sm mb-4">{blog.content.substring(0, 100)}...</p>
                <button className="text-blue-500 hover:text-blue-700">Read more</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
