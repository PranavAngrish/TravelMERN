import * as React from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../../redux/formSlice";
import { useNavigate } from "react-router-dom";

function ImageWithOverlay({ src, alt, children, linkTo }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate(linkTo);
    window.scrollTo(0, 0);
  };

  return (
    <div 
      onClick={handleClick} 
      className="bg-slate-800 block relative w-full h-screen overflow-hidden group cursor-pointer"
    >
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-90" 
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center p-6 sm:p-8 md:p-12">
        {children}
      </div>
    </div>
  );
}

function LocationCard({ iconSrc, title, subtitle }) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setFormData({ branchName: title }));
  }

  return (
    <div 
      className="flex flex-col items-center text-center sm:items-start sm:text-left text-white transition-transform duration-300 group-hover:scale-105 max-w-xs sm:max-w-none"
      onClick={handleClick}
    >
      <div className="flex flex-col sm:flex-row items-center">
        <img 
          src={iconSrc} 
          alt="Location icon" 
          className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain mb-3 sm:mb-0" 
        />
        <span className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-semibold sm:ml-3 leading-tight">
          {title}
        </span>
      </div>
      {subtitle && (
        <span className="text-sm sm:text-base md:text-lg lg:text-xl mt-2 sm:-mt-1 sm:ml-14 md:ml-16 lg:ml-17 opacity-90">
          {subtitle}
        </span>
      )}
    </div>
  );
}

function Properties() {
  return (
    <main className="flex flex-col min-h-screen">
      <ImageWithOverlay 
        src={"https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082753/kasol_hfggcj.png"}
        alt="Mountain landscape with lake"
        linkTo="/midorchard-kasol"
      >
        <LocationCard
          iconSrc={"https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png"}
          title="Mid Orchard Kasol- Riverside"
        />
      </ImageWithOverlay>
    </main>
  );
}

export default Properties;