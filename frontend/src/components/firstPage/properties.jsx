import * as React from "react";
import { MapPin, Mountain, Waves, TreePine } from "lucide-react";
import { useNavigate } from "react-router-dom";

function PropertyCard({ children, linkTo }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(linkTo);
    window.scrollTo && window.scrollTo(0, 0);
  };

  return (
    <div 
      onClick={handleClick}
      className="relative w-full min-h-screen bg-slate-800 bg-opacity-0 cursor-pointer group overflow-hidden"
    >
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        {children}
      </div>
    </div>
  );
}

function LocationInfo({ iconSrc, title, subtitle }) {
  const navigate = useNavigate();

  const handleClick = () => {
    // Redux dispatch would happen here in your actual app
    console.log('Set form data:', { branchName: title });
  };

  const handleExploreRooms = (e) => {
    e.stopPropagation();
    e.preventDefault();
    navigate('/midorchard-kasol');
    window.scrollTo && window.scrollTo(0, 0);
  };

  return (
    <div 
      className="text-center text-white max-w-4xl mx-auto"
      onClick={handleClick}
    >
      {/* Logo */}
      <div className="flex justify-center mb-8">
        <img 
          src={iconSrc} 
          alt="Mid Orchard Kasol logo" 
          className="w-24 h-24 object-contain drop-shadow-lg" 
        />
      </div>
      
      {/* Title */}
      <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-r from-white to-cyan-200 bg-clip-text text-transparent">
        {title}
      </h1>
      
      {/* Subtitle with location */}
      <div className="space-y-4 mb-8">
        <p className="text-2xl md:text-3xl text-cyan-100 font-medium">
          {subtitle}
        </p>
        <div className="flex items-center justify-center gap-2 text-cyan-200">
          <MapPin className="w-5 h-5" />
          <span className="text-lg">Kasol, Parvati Valley, Himachal Pradesh</span>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 max-w-3xl mx-auto">
        <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <Waves className="w-8 h-8 text-cyan-300 mb-2" />
          <span className="text-sm font-medium">Riverside Location</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <Mountain className="w-8 h-8 text-cyan-300 mb-2" />
          <span className="text-sm font-medium">Mountain Views</span>
        </div>
        <div className="flex flex-col items-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
          <TreePine className="w-8 h-8 text-cyan-300 mb-2" />
          <span className="text-sm font-medium">Nature Retreat</span>
        </div>
      </div>

      {/* Description */}
      <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
        Experience the tranquil beauty of Parvati Valley at Mid Orchard Kasol. 
        Nestled along the pristine Parvati River, our resort offers the perfect 
        blend of comfort and nature's serenity in the heart of the Himalayas.
      </p>

      {/* Call to action button */}
      <div className="mt-8">
        <button 
          onClick={handleExploreRooms}
          className="bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl text-lg"
        >
          Explore Our Rooms
        </button>
      </div>
    </div>
  );
}

function Properties() {
  return (
    <main className="min-h-screen">
      <PropertyCard linkTo="/midorchard-kasol">
        <LocationInfo
          iconSrc="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png"
          title="Mid Orchard Kasol"
          subtitle="Riverside Resort & Retreat"
        />
      </PropertyCard>
      
      {/* Additional content section */}
      <section className="bg-slate-800 bg-opacity-0  py-16">
        <div className="max-w-6xl mx-auto px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Mid Orchard Kasol?</h2>
            <p className="text-xl text-white">Discover what makes our resort special</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Riverside Paradise</h3>
              <p className="text-white">Wake up to the soothing sounds of the Parvati River flowing right outside your window.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mountain className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Himalayan Views</h3>
              <p className="text-white">Breathtaking panoramic views of snow-capped peaks and lush green valleys.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Nature's Embrace</h3>
              <p className="text-white">Surrounded by apple orchards and pine forests for the ultimate nature experience.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Properties;