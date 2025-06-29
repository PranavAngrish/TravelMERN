import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const galleryImages = {
  kasol: [
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787202/img1_alrlgg.jpg',
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img3_wcox61.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192236/IMG_5457_jhugic.jpg",
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787229/img2_vgx6k2.jpg',
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1722070994/IMG_0497_1_ek2ycd.jpg",
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787205/img4_jnmqoa.jpg',
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787216/img5_dtd1cy.jpg',
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787201/img9_taptrr.jpg',
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787259/img6_l4ae0z.jpg',
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192231/IMG_5454_hguvm7.jpg',
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720787216/img3_y10ptj.jpg',
    'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5459_wtnxap.jpg',
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192238/IMG_5462_kzkz0z.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192229/IMG_5450_vk8p6b.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192241/IMG_5453_qrvoly.jpg"
  ],
};

const Gallery = () => {
  const [activeLocation, setActiveLocation] = useState('kasol');
  const [showAll, setShowAll] = useState(false);

  const handleLocationChange = useCallback((location) => {
    setActiveLocation(location);
    setShowAll(false);
  }, []);

  const toggleShowAll = useCallback(() => {
    setShowAll((prev) => !prev);
  }, []);

  const displayedImages = useMemo(() => {
    return showAll
      ? galleryImages[activeLocation]
      : galleryImages[activeLocation].slice(0, 6);
  }, [activeLocation, showAll]);

  return (
    <section
      id="gallery-section"
      className="relative py-16 px-4 text-white bg-fixed bg-cover bg-center bg-opacity-0"
    >
      <div className="absolute inset-0" />
      <div className="relative max-w-6xl mx-auto z-10">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-12 text-white">
          Our Gallery
        </h2>
        <div className="flex justify-center mb-10">
        </div>
        <GalleryGrid images={displayedImages} location={activeLocation} />
        {galleryImages[activeLocation].length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={toggleShowAll}
              className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
            >
              {showAll ? 'Show Less' : 'View More'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

const LocationButton = React.memo(({ location, isActive, onClick }) => (
  <button
    className={`mx-2 px-6 py-2 rounded-xl transition-all duration-300 ${
      isActive
        ? 'bg-[#3DBBCD] text-white'
        : 'bg-white text-[#0F1A29] hover:bg-gray-200'
    }`}
    onClick={onClick}
  >
    {location}
  </button>
));

const GalleryGrid = React.memo(({ images, location }) => (
  <AnimatePresence>
    <motion.div
      key={location}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {images.map((image, index) => (
        <GalleryItem key={`${location}-${index}`} src={image} />
      ))}
    </motion.div>
  </AnimatePresence>
));

const GalleryItem = React.memo(({ src }) => (
  <motion.div
    layout
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
    className="overflow-hidden rounded-lg shadow-lg"
  >
    <motion.img
      src={src}
      alt="Gallery"
      className="w-full h-64 object-cover transition-transform duration-300"
      whileHover={{ scale: 1.1 }}
      loading="lazy"
    />
  </motion.div>
));

export default Gallery;