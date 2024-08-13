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
    title: "The Spiritual Essence of Pure Veg Cuisine at Hotel Mid Orchard, Kasol",
    date: "July 8, 2024",
    excerpt: "The Only Pure Vegetarian Hotel in Kasol",
    imageUrl: "https://res.cloudinary.com/dk3qqzafg/image/upload/v1723546798/pic_hykq2k.jpg",
    slug: "spiritual-essence-pure-veg-cuisine",
    content: [
      {
        subheading: "A Haven for Vegetarian Delights",
        text: [
          "Hotel Mid Orchard proudly holds the distinction of being the only pure vegetarian hotel in Kasol. For travelers who cherish vegetarianism as not just a choice but a way of life, this charming retreat offers a sanctuary where dietary preferences align seamlessly with cultural values."
        ],
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787229/img2_vgx6k2.jpg"
      },
      {
        subheading: "Beyond Food: An Enlightened Culinary Journey",
        text: [
          "More than just a place to dine, Hotel Mid Orchard cultivates an atmosphere where every meal is an enriching experience. The dishes served here are not merely culinary delights but a reflection of the philosophy that food nourishes not just the body, but also the soul. The pure veg food in Kasol offered at Hotel Mid Orchard ensures that every meal is a celebration of vegetarian cuisine."
        ]
      },
      {
        subheading: "Unparalleled Hospitality",
        text: "Beyond its culinary offerings, Hotel Mid Orchard extends warm hospitality that makes every guest feel like family. From the moment you arrive, you're welcomed into a space where comfort meets conscientious living, ensuring that your stay is not just pleasant but memorable. Experience the best vegetarian food in Kasol while enjoying the warmth and comfort of Hotel Mid Orchard.",
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1722070994/IMG_0497_1_ek2ycd.jpg"
      },
      {
        subheading: "Plan Your Stay",
        text: "Ready to embark on a journey of culinary discovery and cultural immersion? Book your stay at Hotel Mid Orchard today and immerse yourself in the essence of vegetarianism amidst the breathtaking beauty of Kasol. As the only pure veg hotel, we promise an unforgettable experience."
      }
    ]
  },
  {
    title: "Top 3 Riverside Hotels in Kasol",
    date: "July 15, 2024",
    excerpt: "A Family-Friendly Haven",
    imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1722071150/IMG_2210_2_icy0ij.jpg",
    slug: "top-riverside-hotels-kasol",
    content: [
      {
        subheading: "1. Mid Orchard a Secluded Riverside Retreat ",
        text: [
          "Hotel Mid Orchard is situated in a secluded location, 3 kilometers away from the hustle and bustle of the market. There are only a few riverside family hotels in Kasol, and Hotel Mid Orchard is one of them. It offers mesmerizing views from private balconies, allowing guests to soak in the natural beauty of the Parvati River and the surrounding mountains. The property provides all essential facilities such as room service, modern attached washrooms, toiletries, tour/trek assistance, and a multi-cuisine restaurant to cater to the diverse preferences of its guests.",
          "Riverside Views in Kasol",
          "Situated right by the river, Hotel Mid Orchard offers breathtaking views of the Parvati River and the surrounding mountains. Imagine waking up to the soothing sound of flowing water and the sight of the sun rising over the mountains. The hotel's riverside location provides a tranquil setting, perfect for relaxation and rejuvenation. Whether you want to take a leisurely stroll by the river or simply enjoy the view from your room, Hotel Mid Orchard ensures a memorable stay."
        ],
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787202/img1_alrlgg.jpg"
      },
      {
        subheading: "2. Moksha Riverside Cottage Kasol",
        text: [
          "Tranquil Retreat Kasol",
          "Moksha Riverside Cottage is another excellent choice for a riverside stay in Kasol. This hotel is known for its tranquil ambiance and beautiful surroundings. The cottages are designed to provide a cozy and comfortable stay, making it a perfect retreat for travelers seeking peace and serenity.",
          "Riverside Cottages",
          "The riverside cottages at Moksha offer stunning views of the Parvati River. The soothing sound of the river and the lush greenery create a peaceful atmosphere, ideal for unwinding and rejuvenating. Guests can relax on the private balconies, enjoying the serene views and fresh mountain air.",
          "Gourmet Experience",
          "Moksha Riverside Cottage features a restaurant that serves a variety of delicious dishes. Guests can savor their meals while taking in the picturesque views of the river and mountains. The restaurant offers a mix of local and international cuisines, ensuring a delightful dining experience for all guests."
        ],
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1722071215/MR_img_1_jhzlhx.jpg"
      },
      {
        subheading: "3. Parvati Kuteer Kasol",
        text: [
          "Cozy and Comfortable",
          "Parvati Kuteer is a cozy riverside hotel in Kasol that offers a comfortable and homely stay. The wooden cottages are well-equipped with modern amenities, ensuring a pleasant stay for guests.",
          "Riverside Deck",
          "One of the highlights of Parvati Kuteer is its riverside deck. Guests can relax on the deck, enjoy a cup of tea, and soak in the serene beauty of the Parvati River. The deck is also an excellent spot for yoga and meditation sessions, providing a peaceful environment for spiritual practices.",
          "Local Cuisine",
          "Parvati Kuteer's restaurant serves delicious local cuisine, giving guests a taste of Himachali flavors. The restaurant's riverside location enhances the dining experience, making it a memorable one."
        ],
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1722071233/PK_img_1_dvxieg.jpg"
      },
      {
        subheading: "Conclusion",
        text: [
          "Kasol's riverside hotels offer a perfect blend of natural beauty, comfort, and hospitality. Among these, Hotel Mid Orchard stands out with its family-friendly environment, pure veg restaurant, and stunning riverside views. Whether you choose to stay at Hotel Mid Orchard, Moksha Riverside Cottage, or Parvati Kuteer, you're sure to have an unforgettable experience in the lap of nature.",
          "Plan your stay at Hotel Mid Orchard for a unique and serene riverside retreat in Kasol. Enjoy the tranquility of the river, the majestic mountains, and the warm hospitality that will make your vacation truly special."
        ],
      }
    ]
  },
  {
    title: "Best Secluded Stay in Manali: Aangan Villa and Homes by Mid Orchard",
    date: "July 24, 2024",
    excerpt: " If you're seeking a serene and private retreat, finding the right place to stay is crucial. Aangan Villa & Homes is just the place",
    imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082193/img3_q58lox.jpg",
    slug: "best-secluded-stay-manali",
    content: [
      {
        subheading: "Tranquil and Secluded Location",
        text: [
          "Aangan Villa and Homes by Mid Orchard offers an unparalleled secluded experience. Nestled amidst the breathtaking landscapes of Manali, this property provides a peaceful retreat away from the crowded tourist spots. The villas and homes are strategically located to ensure complete privacy, making it the best homestay in Manali for those seeking a quiet escape."
        ]
      },
      {
        subheading: "Luxurious and Comfortable Accommodations",
        text: [
          "The accommodations at Aangan Villa and Homes are designed to offer the utmost comfort and luxury. Each villa and home is tastefully furnished, blending modern amenities with traditional Himachali architecture. Spacious bedrooms, cozy living areas, and well-equipped kitchens ensure a comfortable stay for families, couples, or solo travelers. This makes it an ideal choice for a homestay in Manali with a kitchen and those looking for a long-term stay homestay in Manali."
        ],
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082145/img10_rir5fo.jpg"
      },
      {
        subheading: "Stunning Views and Scenic Beauty",
        text: [
          "One of the highlights of staying at Aangan Villa and Homes is the breathtaking views it offers. Wake up to the sight of snow-capped mountains, lush valleys, and the serene Beas River. The property’s elevated location provides panoramic views that are sure to leave you mesmerized, making it a top choice for a mountain view homestay in Manali."
        ],
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720080680/img8_bvrosw.jpg"
      },
      {
        subheading: "Proximity to Manali's Attractions",
        text: [
          "While Aangan Villa and Homes offers a secluded retreat, it is also conveniently located close to Manali’s popular attractions. Whether you want to explore the Hadimba Temple, visit the Solang Valley for adventure sports, or take a leisurely stroll on the Mall Road, you’re just a short drive away from these activities. The property’s location allows you to enjoy the best of both worlds – peace and tranquility at your stay and easy access to Manali’s vibrant culture.",
          "If you’re looking for the best secluded stay or Airbnb near Manali, Aangan Villa and Homes by Mid Orchard is your ideal choice. With its tranquil location, luxurious accommodations, stunning views, personalized hospitality, and eco-friendly practices, it offers a perfect retreat for those seeking peace and rejuvenation. Book your stay at Aangan Villa and Homes and experience the serene beauty of Manali like never before."
        ],
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
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-8">Our Blogs</h2>
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