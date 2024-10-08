import React, { useState, useEffect } from "react";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const AmenityItem = ({ text }) => (
  <div className="flex items-center gap-2 p-2 rounded transition-all duration-300 transform hover:scale-105">
    <img src='https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082737/check_dhncdq.png' alt="Checkmark" className="w-5 h-5" />
    <span className="text-lg md:text-xl lg:text-2xl">{text}</span>
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
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
      >
        &#10094;
      </button>
      <button 
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
      >
        &#10095;
      </button>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
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
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785415/img1_tpd6df.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img2_qqdoj2.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img7_do0ndv.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img3_l9xlll.jpg",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785417/img6_ccbrmn.heic",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785911/img6_fkvs2s.png",
    "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785415/img5_mgih6e.jpg"
  ];
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/family-hotel-booking');
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
        <header className="bg-cover bg-center flex flex-col items-center p-4 sm:p-6 md:p-8" 
                style={{backgroundImage: "url('https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720079843/title_bg_vi4p9m.png')"}}>
          <div onClick={handleLogo} className="cursor-pointer">
            <img 
              src={logo} 
              alt="Logo" 
              className="w-24 sm:w-28 md:w-32 mb-4 transition-transform duration-300 transform hover:scale-110" 
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl text-center">Family Suite</h1>
        </header>
        
        <main className="max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
          <ImageCarousel images={images} />
          
          <div className="flex justify-between mt-4 sm:mt-6 mb-6 sm:mb-10">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className="text-xl sm:text-2xl transition-transform duration-300 transform hover:scale-110">⭐</span>
            ))}
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
            <div className="md:w-1/2">
              <h2 className="text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-6 mt-8 sm:mt-16">Amenities</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xl sm:text-2xl md:text-3xl text-[#D9D9D9]">
                <AmenityItem text="Lounge Area" />
                <AmenityItem text="On Site Parking" />
                <AmenityItem text="Wardrobe" />
                <AmenityItem text="Private Balcony" />
                <AmenityItem text="Wifi" />
                <AmenityItem text="Restaurant" />
              </div>
            </div>
            <div className="md:w-1/2">
              <p className="p-4 rounded transition-all duration-300 transform hover:scale-105 text-lg sm:text-xl md:text-2xl">
                Discover our Family Suite, where luxury meets panoramic views from your private balcony. Perfectly designed for comfort and relaxation, this spacious retreat offers modern amenities and plush furnishings for an unforgettable stay. Whether you're admiring sunrise vistas or unwinding together, our suite promises a luxurious experience for the whole family.
              </p>
              <div className="mt-4 sm:mt-6">
                <div className="text-2xl sm:text-3xl md:text-4xl p-4 rounded transition-all duration-300 transform hover:scale-105">
                  Room Tariff
                  <span className="text-lg sm:text-xl md:text-2xl text-[#D9D9D9] block">Starts ₹3800 Per Night</span>
                </div>
                <button 
                  onClick={handleClick} 
                  className="w-full sm:w-auto bg-cyan-500 text-white py-3 px-6 sm:px-10 md:px-20 lg:px-40 rounded-lg text-lg sm:text-xl transition-all duration-300 transform hover:scale-105 mt-4"
                >
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