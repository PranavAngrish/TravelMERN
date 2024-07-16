import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

const BlogPost = ({ title, date, excerpt, imageUrl }) => {
  console.log("there",title , date, excerpt, imageUrl);
  const data = {
    title:title,
    date:date,
    excerpt:excerpt,
    imageUrl:imageUrl
  }
  
  return(
  <div className="bg-white bg-opacity-80 rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-2">{date}</p>
      <p className="text-gray-700">{excerpt}</p>
      <Link to={`/blog/${title.replace(/\s+/g, '-').toLowerCase()}`}
      state={{ from: "occupation" , state: data }}
        // to={{
        //   pathname: `/blog/${title.replace(/\s+/g, '-').toLowerCase()}`,
         
        // }}
        className="mt-4 text-[#3DBBCD] hover:text-teal-600 transition-colors duration-300 inline-block"
      >
        Read More
      </Link>
    </div>
  </div>
)};

function Blog() {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const blogRef = useRef(null);

  const blogPosts = [
    {
      title: "Top 10 Local Attractions Near Our Hotel",
      date: "July 10, 2024",
      excerpt: "Discover the must-visit spots around our hotel, from hidden gems to popular landmarks.",
      imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/attractions_placeholder.jpg"
    },
    {
      title: "A Culinary Journey: Our Chef's Signature Dishes",
      date: "June 28, 2024",
      excerpt: "Explore the flavors and stories behind our most beloved menu items.",
      imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/culinary_placeholder.jpg"
    },
    {
      title: "Sustainable Tourism: Our Eco-Friendly Initiatives",
      date: "June 15, 2024",
      excerpt: "Learn about our efforts to minimize our environmental impact and promote responsible travel.",
      imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/eco_placeholder.jpg"
    },
    {
      title: "The History of Our Hotel: A Journey Through Time",
      date: "May 30, 2024",
      excerpt: "Discover the fascinating story behind our historic hotel and its place in local culture.",
      imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/history_placeholder.jpg"
    },
    {
      title: "Wellness Retreat: Relaxation Tips from Our Spa Experts",
      date: "May 15, 2024",
      excerpt: "Unwind with these professional tips and tricks for ultimate relaxation during your stay.",
      imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/wellness_placeholder.jpg"
    },
    {
      title: "Seasonal Events: What's Happening This Summer",
      date: "May 1, 2024",
      excerpt: "Plan your visit around the exciting local events and festivals happening this season.",
      imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/events_placeholder.jpg"
    },
    {
        title: "Seasonal Events: What's Happening This Summer",
        date: "May 1, 2024",
        excerpt: "Plan your visit around the exciting local events and festivals happening this season.",
        imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/events_placeholder.jpg"
      },
    // Add more blog posts here as needed
  ];

  const handleViewMore = () => {
    setVisiblePosts(prevVisible => prevVisible + 3);
  };

  const handleShowLess = () => {
    setVisiblePosts(3);
    blogRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  const allPostsVisible = visiblePosts >= blogPosts.length;

  return (
    <section ref={blogRef} className="relative z-10 py-16 bg-slate-800 bg-opacity-10 bg-cover bg-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Our Blog</h2>
        <p className="text-center text-gray-200 mb-12 max-w-2xl mx-auto">
          Stay updated with our latest news, travel tips, and insider insights to make the most of your stay.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.slice(0, visiblePosts).map((post, key) =>(
          <BlogPost key={key} title={post.title} date={post.date} excerpt={post.excerpt} imageUrl={post.imageUrl}/>
         ))}
        </div>
        <div className="text-center mt-12 space-y-4">
          {!allPostsVisible && (
            <button
              onClick={handleViewMore}
              className="bg-[#3DBBCD] text-white px-6 py-3 rounded-xl hover:bg-teal-500 transition-colors duration-300"
            >
              View More Posts
            </button>
          )}
          {allPostsVisible && visiblePosts > 3 && (
            <button
              onClick={handleShowLess}
              className="bg-gray-500 text-white px-6 py-3 rounded-xl hover:bg-gray-600 transition-colors duration-300"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default Blog;