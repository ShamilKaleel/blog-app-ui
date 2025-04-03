import React, {  useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "@/types/blogapp";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";

const BlogHomePage: React.FC = () => {
  const { authState } = useAuth();
  const [featuredPosts, setFeaturedPosts] = useState([
    {
      id: 1,
      title: "The Future of Sustainable Agriculture",
      excerpt: "Exploring innovative farming techniques that preserve our planet while increasing productivity.",
      category: "TECHNOLOGY",
      authorName: "Jane Smith",
      imageUrl: "/blog1.jpg"
    },
    {
      id: 2,
      title: "Health Benefits of Mediterranean Diet",
      excerpt: "Discover how this ancient eating pattern can improve your health and wellbeing.",
      category: "HEALTH",
      authorName: "Dr. Michael Chen",
      imageUrl: "/blog2.jpg"
    },
    {
      id: 3,
      title: "10 Essential Business Skills for 2025",
      excerpt: "Stay ahead of the curve with these critical skills every professional should develop.",
      category: "BUSINESS",
      authorName: "Rebecca Johnson",
      imageUrl: "/blog3.jpg"
    }
  ]);

  const categories = Object.values(Category || {
    TECHNOLOGY: "TECHNOLOGY",
    HEALTH: "HEALTH", 
    LIFESTYLE: "LIFESTYLE",
    EDUCATION: "EDUCATION",
    BUSINESS: "BUSINESS",
    SPORTS: "SPORTS",
    ENTERTAINMENT: "ENTERTAINMENT",
    OTHERS: "OTHERS"
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  // Random placeholder image URL
  const getPlaceholderImage = (index: number) => {
    const images = [
      "https://images.unsplash.com/photo-1499750310107-5fef28a66643",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173"
    ];
    return images[index % images.length] + "?w=600&h=400&fit=crop";
  };

  return (

    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full pt-16 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-primary/20 to-primary/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Share Your Story, <br />
              <span className="text-primary">Inspire the World</span>
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl mb-8 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Discover thought-provoking articles, share your insights, and connect with a community of curious minds. Your next favorite read is just a click away.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link to="/blogs">
                <Button size="lg" className="mr-4">
                  Explore Blogs
                </Button>
              </Link>
              {authState && (
                <Link to="/create-blog">
                  <Button variant="outline" size="lg">
                    Write a Post
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643" 
                alt="Blog community" 
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-primary/10 rounded-full -z-10"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full -z-10"></div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Featured Posts
          </motion.h2>
          
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {featuredPosts.map((post, index) => (
              <motion.div key={post.id} variants={itemVariants}>
                <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={getPlaceholderImage(index)} 
                      alt={post.title} 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/10 text-primary rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">By {post.authorName}</span>
                      <Link to="/blogs">
                        <Button variant="ghost" size="sm">Read More</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link to="/blogs">
              <Button size="lg" className="px-8">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="text-3xl font-bold mb-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Explore Categories
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {categories.map((category, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Link to={`/blogs/category/${category}`}>
                  <div className="bg-card hover:bg-accent p-6 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer h-full flex flex-col justify-center items-center">
                    <span className="text-lg font-medium">{category}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to start sharing your ideas?
          </motion.h2>
          <motion.p 
            className="text-xl mb-8 max-w-3xl mx-auto opacity-90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Join our community of writers and readers today. Start your blogging journey in minutes!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {authState ? (
              <Link to="/create-blog">
                <Button size="lg" variant="secondary" className="px-8">
                  Create Your First Post
                </Button>
              </Link>
            ) : (
              <Link to="/signup">
                <Button size="lg" variant="secondary" className="px-8">
                  Sign Up Now
                </Button>
              </Link>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogHomePage;