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
    return (
      <div className="flex items-center justify-center h-screen bg-slate-800">
        <p className="text-white text-2xl">Blog post not found</p>
      </div>
    );
  }

  const handleLogoClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-gradient-to-b from-slate-800 to-slate-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div 
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png" 
            alt="Hotel Logo"
            className="w-24 sm:w-32 cursor-pointer"
            onClick={handleLogoClick}
          />
        </motion.div>
        <motion.article 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white bg-opacity-10 backdrop-blur-md rounded-lg shadow-2xl overflow-hidden"
        >
          <div className="relative">
            <img src={post.imageUrl} alt={post.title} className="w-full h-48 sm:h-64 md:h-80 object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end">
              <div className="p-4 sm:p-6">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-white">{post.title}</h1>
                <p className="text-sm sm:text-base text-gray-300">{post.date}</p>
              </div>
            </div>
          </div>
          <div className="p-4 sm:p-6 md:p-8">
            <p className="text-xl sm:text-2xl text-gray-300 mb-6 font-light italic">{post.excerpt}</p>
            <div className="space-y-8">
              {post.content.map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <h2 className="text-2xl sm:text-3xl font-semibold text-[#3DBBCD] mb-4">{section.subheading}</h2>
                  {Array.isArray(section.text) ? (
                    section.text.map((paragraph, pIndex) => (
                      <p key={pIndex} className="mb-4 text-gray-300 text-lg sm:text-xl font-light leading-relaxed">{paragraph}</p>
                    ))
                  ) : (
                    <p className="mb-4 text-gray-300 text-lg sm:text-xl font-light leading-relaxed">{section.text}</p>
                  )}
                  {section.image && (
                    <motion.img 
                      src={section.image} 
                      alt={`Image for ${section.subheading}`}
                      className="w-full rounded-lg shadow-md mb-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.article>
        <motion.div 
          className="mt-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPostPage;