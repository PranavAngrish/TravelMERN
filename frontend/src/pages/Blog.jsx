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
    title: "Family & Couple Hotel in Kasol: A Memorable Stay at Mid Orchard",
    date: "September 30, 2024",
    excerpt: "Family & Couple Hotel in Kasol: A Memorable Stay at Mid Orchard",
    imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img3_wcox61.jpg",
    slug: "couple-friendly-hotel-in-kasol",
    content: [
      {
        subheading: "Family Trip to Kasol",
        text: [
          "If you're looking for a family hotel in Kasol that combines comfort and convenience, look no further than Mid Orchard. Nestled in the heart of Kasol’s scenic beauty and close to the Parvati River, this hotel provides the perfect retreat for families and couples alike. Offering the best of both worlds—access to nature and modern amenities—Mid Orchard ensures a hassle-free and relaxing experience for all its guests, making it a top choice for a family or couple trip in Kasol."
        ],
        image: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787202/img1_alrlgg.jpg"
      },
      {
        subheading: "Why Mid Orchard is the Best Hotel for Couples and Families in Kasol",
        text: [
          "When searching for a hotel for couples in Kasol, privacy and a romantic atmosphere are essential. Mid Orchard ticks all the boxes, offering cozy, well-designed rooms that provide the perfect backdrop for a peaceful and intimate stay. For families, the hotel’s spacious accommodations and family-friendly amenities make it one of the best family hotels in Kasol. Enjoy the tranquility of this PURE vegetarian property, surrounded by lush greenery, and take advantage of its proximity as a Kasol hotel with a river view, allowing for serene moments and family time by the water."
        ],
      },
      {
        subheading: "Modern Amenities That Make This the Best Family Hotel Kasol Offers",
        text: [
          "Mid Orchard prides itself on providing top-notch amenities. From private secure parking to trained staff available 24/7, this family hotel in Kasol ensures a comfortable and worry-free stay. You can also enjoy room service, daily housekeeping with crisp white linens, and a multi-cuisine restaurant offering a variety of delicious meals. These modern conveniences make it the ideal choice for both families and couples seeking a relaxing getaway, especially for those planning a Kasol family trip."
        ],
        image : "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img2_qqdoj2.jpg"
      },
      {
        subheading: "Explore Kasol with Ease: Accessibility and Travel Help Desk",
        text: [
          "Conveniently located near the main road, Mid Orchard provides easy access to local attractions and is a top-rated Kasol hotel near the river. The hotel for families in Kasol also offers a travel help desk, ensuring you can plan your local sightseeing and adventures without hassle. Whether you're trekking or simply exploring the local markets, the team at Mid Orchard is ready to assist in making your Kasol family trip truly memorable."
        ],
      },
      {
        subheading: "Book Your Stay at the Best Family and Couple Hotel in Kasol",
        text: [
          "Ready to experience the serenity of Kasol with your loved ones? Mid Orchard is not just another couple and family hotel in Kasol—it’s an experience of comfort, convenience, and charm. Whether you're a couple seeking a romantic retreat or a family looking for a peaceful vacation, this hotel has everything you need for an unforgettable stay. Book your stay today and make the most of your Kasol family trip by staying at this charming Kasol hotel near the river!"
        ],
      },
      
    ]
  },
  {
    title: "Hotel Mid Orchard Kasol: The Ultimate Dog-Friendly Riverside Retreat",
    date: "August 2, 2024",
    excerpt: "A Pet-Friendly retreat perfect for your next trip to Kasol",
    imageUrl: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787202/img1_alrlgg.jpg",
    slug: "mid-orchard-pet-friendly-retreat",
    content: [
      {
        subheading: "Dog-Friendly Resorts Near Me: Your Ideal Kasol Getaway",
        text: [
          "When searching for the perfect escape where your pet is just as welcome as you are, Hotel Mid Orchard Kasol tops the list of dog-friendly resorts near me. This serene riverside hotel, nestled along the Parvati River, is a prime destination for pet lovers seeking both comfort and adventure in the heart of Kasol."
        ],
      },
      {
        subheading: "Pet-Friendly Hotels in Kasol: A Riverside Stay You’ll Both Love",
        text: [
          "Looking for pet-friendly hotels in Kasol? Hotel Mid Orchard offers everything you need for a memorable stay with your furry friend. From the tranquil riverside setting to the welcoming atmosphere, this hotel ensures that both you and your pet feel right at home, making it a standout among Kasol pet-friendly stays."
        ],
      },
      {
        subheading: "Kasol Dog-Friendly Accommodations with Riverside Views",
        text: [
          "Wake up to the soothing sounds of the Parvati River, with the majestic Himalayas as your backdrop. As one of the top Kasol dog-friendly accommodations, Hotel Mid Orchard offers rooms with private balconies, allowing you and your pet to enjoy the serene river views. The combination of modern amenities and a pet-welcoming environment makes it one of the best pet-friendly riverside hotels in Himachal."
        ],
      },
      {
        subheading: "Hotels for Pets in Kasol: All the Comforts You Need",
        text: [
          "Hotel Mid Orchard Kasol goes beyond being just a dog-friendly resort—it’s a place where pets are pampered just as much as their owners. With easy access to pet food, cozy rooms, 24/7 hot water, and secure parking, every detail is taken care of to ensure a hassle-free stay. Whether you’re looking to relax or explore, this is one of the top hotels for pets in Kasol."
        ],
      },
      {
        subheading: "Best Riverside Hotels in Kasol for Pets: Experience the Ultimate Stay",
        text: [
          "Imagine spending your days exploring the scenic beauty of Kasol and your evenings unwinding on your private balcony, with your pet by your side. As one of the best riverside hotels in Kasol for pets, Hotel Mid Orchard offers the perfect blend of nature and comfort. And if you need some time to yourself, our pet babysitting services ensure your furry friend is in good hands."
        ],
      },
      {
        subheading: "Kasol Hotels: Book Your Pet-Friendly Riverside Escape Today",
        text: [
          "Why settle for less when you can have the best? Make your reservation at Hotel Mid Orchard Kasol, one of the top dog-friendly resorts near you. Whether you’re planning a quiet retreat or an adventure-filled holiday, this Kasol hotel is ready to welcome you and your pet for an unforgettable stay."
        ],
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
    <section ref={blogRef} id="blog-section" className="relative z-10 py-16 bg-slate-800 bg-opacity-0 bg-cover bg-center">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-white text-center mb-8">Our Blogs</h2>
        <p className="text-xl sm:text-xl lg:text-2xl text-center text-gray-200 mb-12 max-w-2xl mx-auto">
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