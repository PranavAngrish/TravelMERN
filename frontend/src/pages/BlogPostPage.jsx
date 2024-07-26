import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogPosts } from './Blog';

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const post = blogPosts.find(post => post.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return <div>Blog post not found</div>;
  }

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 min-h-screen text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <motion.img
            src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png" 
            alt="Hotel Logo"
            className="w-32 cursor-pointer"
            onClick={handleLogoClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          />
        </div>
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden"
        >
          <img src={post.imageUrl} alt={post.title} className="w-full h-80 object-cover" />
          <div className="p-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#3DBBCD]">{post.title}</h1>
            <p className="text-sm text-gray-400 mb-6">{post.date}</p>
            <p className="text-xl text-gray-300 mb-8 font-light italic">{post.excerpt}</p>
            <div className="prose prose-lg prose-invert max-w-none">
              {post.content.map((paragraph, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="mb-8"
                >
                  <p className="mb-4">{paragraph.text}</p>
                  {paragraph.image && (
                    <motion.img 
                      src={paragraph.image} 
                      alt={`Image for paragraph ${index + 1}`}
                      className="w-full rounded-lg shadow-md mb-4"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.article>
      </div>
    </div>
  );
};

export default BlogPostPage;