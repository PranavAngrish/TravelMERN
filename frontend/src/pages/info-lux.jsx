import React, { useState, useEffect } from "react";
import { Star, Wifi, Car, Shirt, Home, MapPin, Utensils, Check } from "lucide-react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const AmenityItem = ({ icon: Icon, text }) => (
  <div className="flex items-center gap-3 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group">
    <div className="p-2 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
      <Icon className="w-5 h-5 text-white" />
    </div>
    <span className="text-white/90 font-medium">{text}</span>
  </div>
);

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl group">
      {/* Container with fixed aspect ratio */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/10] lg:aspect-[16/9]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10"></div>
        
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
          >
            <img
              src={image}
              alt={`Room view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        
        <button 
          onClick={goToPrevious}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:scale-110 z-20 border border-white/20"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={goToNext}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:bg-black/60 hover:scale-110 z-20 border border-white/20"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-white shadow-lg scale-125' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

function MyComponent() {
  const navigate = useNavigate();
  const logo = 'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png';
  const images = [
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786537/img5_yap8bg.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5455_qs0np0.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192241/IMG_5453_qrvoly.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786539/img4_jj5dzv.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5459_wtnxap.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786539/img3_nk8x77.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786560/img8_fypqic.png",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5449_zv2vcw.jpg",
  ];

  const amenities = [
    { icon: Home, text: "Lounge Area" },
    { icon: Car, text: "On Site Parking" },
    { icon: Shirt, text: "Wardrobe" },
    { icon: MapPin, text: "Private Balcony" },
    { icon: Wifi, text: "High-Speed WiFi" },
    { icon: Utensils, text: "Restaurant" }
  ];

  const handleBooking = () => {
    navigate('/river-view-booking');
  };

  const handleHome = () => {
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-black">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
        <div className="relative z-10 container mx-auto px-6 py-8">
          <div className="flex flex-col items-center text-center">
            <button onClick={handleHome} className="mb-6 transition-transform duration-300 hover:scale-105">
              <img 
                src={logo} 
                alt="Hotel Logo" 
                className="w-20 h-20 object-contain" 
              />
            </button>
            
            <div className="mb-4">
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2 leading-tight">
                Luxury Room
              </h1>
              <p className="text-xl text-cyan-400 font-medium">
                Balcony & River View
              </p>
            </div>
            
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-white/80 text-sm">(5.0 Rating)</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 pb-12">
        {/* Image Carousel */}
        <div className="mb-12">
          <ImageCarousel images={images} />
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column - Amenities */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
                Premium Amenities
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mb-8"></div>
            </div>
            
            <div className="grid gap-4">
              {amenities.map((amenity, index) => (
                <AmenityItem key={index} icon={amenity.icon} text={amenity.text} />
              ))}
            </div>
          </div>

          {/* Right Column - Description & Booking */}
          <div className="space-y-8">
            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-4">Room Description</h3>
              <p className="text-white/80 leading-relaxed text-lg">
                Indulge in opulence with our Luxury Room featuring a private balcony and mesmerizing river views. Immerse yourself in unparalleled comfort, surrounded by lavish furnishings and modern amenities. Bask in the serenity of nature while relishing the exquisite experience of our premium accommodations, where luxury meets the tranquility of a scenic riverside retreat.
              </p>
            </div>

            {/* Pricing & Booking */}
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Room Tariff</h3>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-sm text-white/60">Starting from</span>
                  <span className="text-4xl font-bold text-white">₹2,900</span>
                  <span className="text-white/60">per night</span>
                </div>
                <p className="text-sm text-white/60 mt-1">*Taxes and fees may apply</p>
              </div>
              
              <button 
                onClick={handleBooking}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <Check className="w-5 h-5" />
                  CHECK AVAILABILITY
                </div>
              </button>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-white/60">
                  • Best rate guarantee
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default MyComponent;