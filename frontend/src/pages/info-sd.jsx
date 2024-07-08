import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const AmenityItem = ({ text }) => (
  <div className="flex items-center gap-2 p-2 rounded transition-all duration-300 transform hover:scale-105">
    <img src='https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082737/check_dhncdq.png' alt="Checkmark" className="w-4 h-4 sm:w-5 sm:h-5" />
    <span className="text-lg sm:text-xl lg:text-2xl">{text}</span>
  </div>
);

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden group">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
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
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
      >
        &#10094;
      </button>
      <button 
        onClick={goToNext}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 sm:p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
      >
        &#10095;
      </button>
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === currentIndex ? 'bg-white' : 'bg-gray-400'
            } transition-all duration-300 cursor-pointer`}
            onClick={() => setCurrentIndex(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

function MyComponent() {
  const logo = 'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png';
  const images = [
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081764/img1_h90jde.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img2_h82llu.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img3_wcox61.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img4_sw27x9.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081776/img5_nnwjuu.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081774/img6_mpykvx.jpg"
  ]
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/sdenq');
  }

  const handleLogo = () => {
    navigate('/');
  }
  
  return (
    <div className="min-h-screen bg-slate-800 text-white relative">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-50" 
        style={{backgroundImage: "url('https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081762/bg_lkffux.png')"}}
      ></div>
      
      <div className="relative z-10">
        <header className="bg-cover bg-center flex flex-col items-center p-4 sm:p-6 lg:p-8" 
                style={{backgroundImage: "url('https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081775/title_bg_p0pvzc.png')"}}>
          <div onClick={handleLogo}>
            <img 
              src={logo} 
              alt="Logo" 
              className="w-24 sm:w-28 lg:w-32 mb-2 sm:mb-4 transition-transform duration-300 transform hover:scale-110" 
            />
          </div>
          
          <h1 className="text-2xl sm:text-3xl lg:text-4xl text-center">Super Deluxe Room <br /> Balcony & Mountain View</h1>
        </header>
        
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
          <ImageCarousel images={images} />
          
          <div className="flex justify-between mt-4 sm:mt-6 mb-6 sm:mb-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-xl sm:text-2xl transition-transform duration-300 transform hover:scale-110">⭐</span>
            ))}
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 mt-8 sm:mt-12 lg:mt-16">Amenities</h2>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-xl sm:text-2xl lg:text-3xl text-[#D9D9D9]">
                <AmenityItem text="Common Pool" />
                <AmenityItem text="On Site Parking" />
                <AmenityItem text="Spa & Salon" />
                <AmenityItem text="Private Balcony" />
                <AmenityItem text="Wifi" />
                <AmenityItem text="Restaurant" />
              </div>
            </div>
            <div className="lg:w-1/2">
              <p className="p-3 sm:p-4 rounded transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl lg:text-2xl">
              Indulge in luxury with our Super Deluxe Room, featuring a private balcony that opens up to breathtaking mountain vistas. Immerse yourself in comfort with spacious accommodations, contemporary design, and top-notch amenities. Elevate your stay with panoramic views, ensuring a memorable escape in the heart of nature's beauty.
              </p>
              <div className="mt-4 sm:mt-6">
                <div className="text-2xl sm:text-3xl lg:text-4xl p-3 sm:p-4 rounded transition-all duration-300 transform hover:scale-105">
                  FARE DETAILS
                  <span className="text-xl sm:text-2xl text-[#D9D9D9] block">XXXXXX</span>
                </div>
                <button onClick={handleClick} className="bg-cyan-500 text-white py-2 sm:py-3 px-4 sm:px-6 w-full lg:w-auto lg:px-40 rounded-lg text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 mt-3 sm:mt-4">
                  CHECK AVAILABILITY
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default MyComponent;