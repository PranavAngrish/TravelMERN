import React from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

const BlogPostPage = () => {
  const { state } = useLocation();
  const { title, date, excerpt, imageUrl } = state || {};
  console.log(title, date, excerpt, imageUrl)
  // if (!title) {
  //   return <div>Blog post not found</div>;
  // }

  return (
    <div className="bg-slate-800 bg-opacity-10 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <Link to="/blog" className="text-[#3DBBCD] hover:text-teal-600 transition-colors duration-300 mb-8 inline-block">
          &larr; Back to Blog
        </Link>
        <article className="bg-white bg-opacity-80 rounded-lg shadow-lg overflow-hidden">
          <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
          <div className="p-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">{title}</h1>
            <p className="text-sm text-gray-600 mb-6">{date}</p>
            <div className="prose max-w-none text-gray-700">
              <p className="mb-4">{excerpt}</p>
              {/* Add the full blog post content here */}
              {title}
              {/* Add more paragraphs or sections as needed */}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPostPage;