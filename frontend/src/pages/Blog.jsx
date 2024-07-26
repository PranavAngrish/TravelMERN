import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const BlogPost = ({ title, date, excerpt, imageUrl, slug }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/blog/${slug}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white bg-opacity-80 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer"
      onClick={handleClick}
    >
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-2">{date}</p>
        <p className="text-gray-700">{excerpt}</p>
        <span className="mt-4 text-[#3DBBCD] hover:text-teal-600 transition-colors duration-300 inline-block">
          Read More
        </span>
      </div>
    </motion.div>
  );
};

export const blogPosts = [
  {
    title: "Top 10 Local Attractions Near Our Hotel",
    date: "July 10, 2024",
    excerpt: "Discover the must-visit spots around our hotel, from hidden gems to popular landmarks.",
    imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/attractions_placeholder.jpg",
    slug: "top-10-local-attractions",
    content: [
      {
        subheading: "Unveiling the Hidden Gems",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/attractions_1.jpg"
      },
      {
        subheading: "Popular Landmarks You Can't Miss",
        text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      },
      {
        subheading: "Off the Beaten Path: Local Favorites",
        text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/attractions_2.jpg"
      }
    ]
  },
  {
    title: "A Culinary Journey: Our Chef's Signature Dishes",
    date: "June 28, 2024",
    excerpt: "Explore the flavors and stories behind our most beloved menu items.",
    imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/culinary_placeholder.jpg",
    slug: "culinary-journey",
    content: [
      {
        subheading: "The Art of Flavor Fusion",
        text: "Our chef's signature dishes are a testament to culinary excellence and creativity.",
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/culinary_1.jpg"
      },
      {
        subheading: "Local Ingredients, Global Inspiration",
        text: "Each dish tells a story of local ingredients and international inspiration.",
      },
      {
        subheading: "From Farm to Table: Our Commitment",
        text: "From farm to table, we ensure that every bite is an unforgettable experience.",
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/culinary_2.jpg"
      }
    ]
  },
  {
    title: "A Culinary Journey: Our Chef's Signature Dishes",
    date: "June 28, 2024",
    excerpt: "Explore the flavors and stories behind our most beloved menu items.",
    imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/culinary_placeholder.jpg",
    slug: "culinary-journey",
    content: [
      {
        subheading: "The Art of Flavor Fusion",
        text: "Our chef's signature dishes are a testament to culinary excellence and creativity.",
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/culinary_1.jpg"
      },
      {
        subheading: "Local Ingredients, Global Inspiration",
        text: "Each dish tells a story of local ingredients and international inspiration.",
      },
      {
        subheading: "From Farm to Table: Our Commitment",
        text: "From farm to table, we ensure that every bite is an unforgettable experience.",
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/culinary_2.jpg"
      }
    ]
  },
];

function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const blogRef = useRef(null);

  const handleViewMore = () => {
    setVisiblePosts(prevVisible => prevVisible + 3);
  };

  const handleShowLess = () => {
    setVisiblePosts(3);
    blogRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const allPostsVisible = visiblePosts >= blogPosts.length;

  return (
    <section ref={blogRef} id="blog-section" className="relative z-10 py-16 bg-slate-800 bg-opacity-10 bg-cover bg-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Our Blog</h2>
        <p className="text-center text-gray-200 mb-12 max-w-2xl mx-auto">
          Stay updated with our latest news, travel tips, and insider insights to make the most of your stay.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(0, visiblePosts).map((post, index) => (
            <BlogPost 
              key={index} 
              title={post.title} 
              date={post.date} 
              excerpt={post.excerpt} 
              imageUrl={post.imageUrl} 
              slug={post.slug}
            />
          ))}
        </div>
        <div className="text-center mt-12 space-y-4">
          {!allPostsVisible && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleViewMore}
              className="bg-[#3DBBCD] text-white px-6 py-3 rounded-xl hover:bg-teal-500 transition-colors duration-300"
            >
              View More Posts
            </motion.button>
          )}
          {allPostsVisible && visiblePosts > 3 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleShowLess}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors duration-300"
            >
              Show Less
            </motion.button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Blog;