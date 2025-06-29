import * as React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

function RoomCard({ imageSrc, title, buttonText, linkTo }) {
  const navigate = useNavigate();

  const handleChange = () => {
    navigate(linkTo);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
      <div className="relative h-64 overflow-hidden">
        <img
          loading="lazy"
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-3 leading-tight">
          {title}
        </h3>
        <button
          onClick={handleChange}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
        >
          <span>{buttonText}</span>
          <svg
            className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

function LandingKasol() {
  const navigate = useNavigate();
  
  const rooms = [
    {
      imageSrc: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720770731/sd_yrzjmq.png",
      title: "Super Deluxe Room With Balcony & Mountain View",
      buttonText: "Know More",
      linkTo: "/kasol-mountain-view-hotel"
    },
    {
      imageSrc: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5459_wtnxap.jpg",
      title: "Luxury Room With Balcony & River View",
      buttonText: "Know More",
      linkTo: "/kasol-river-view-hotel"
    },
    {
      imageSrc: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img7_do0ndv.jpg",
      title: "Family Suite With Balcony & River View",
      buttonText: "Know More",
      linkTo: "/kasol-family-hotel"
    }
  ];

  const handleLogo = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0">
          <img
            loading="lazy"
            src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082721/bg-kasol_dcdhrj.png"
            alt="Kasol Riverside Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 py-8 min-h-screen flex flex-col">
          {/* Header */}
          <div className="flex justify-between items-center mb-16">
            <div
              onClick={handleLogo}
              className="cursor-pointer transition-transform duration-300 hover:scale-110"
            >
              <img
                loading="lazy"
                src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png"
                alt="Mid Orchard Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 flex items-center">
            <div className="grid lg:grid-cols-2 gap-12 w-full max-w-7xl mx-auto">
              <div className="space-y-8">
                <div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-4">
                    MID ORCHARD
                  </h1>
                  <h2 className="text-3xl lg:text-5xl font-light text-teal-300 mb-2">
                    KASOL
                  </h2>
                  <h3 className="text-2xl lg:text-4xl font-light text-white/90">
                    RIVERSIDE
                  </h3>
                </div>
                
                <div className="w-24 h-1 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" />
              </div>

              <div className="flex items-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                  <p className="text-xl lg:text-2xl text-white/95 leading-relaxed">
                    Here at Mid Orchard, Kasol - we take pride in providing our guests with the highest quality and very personal service so we can emulate what it's like to be at home.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rooms Section */}
      <div className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Our Rooms
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Discover comfort and luxury in our carefully designed accommodations
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full mx-auto mt-6" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {rooms.map((room, index) => (
              <RoomCard key={index} {...room} />
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Premium Accommodations</h3>
              <p className="text-gray-600">Luxurious rooms with stunning mountain and river views</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Service</h3>
              <p className="text-gray-600">Dedicated staff ensuring your comfort and satisfaction</p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 transform transition-transform duration-300 group-hover:scale-110">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Prime Location</h3>
              <p className="text-gray-600">Riverside location in the heart of beautiful Kasol</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default LandingKasol;