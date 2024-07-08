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
      className="block relative w-full h-[40vh] sm:h-[50vh] overflow-hidden group cursor-pointer"
    >
      <img 
        src={src} 
        alt={alt} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 opacity-90" 
      />
      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center p-4 sm:p-6">
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
      className="flex flex-col items-start text-white transition-transform duration-300 group-hover:scale-105"
      onClick={handleClick}
    >
      <div className="flex items-center">
        <img src={iconSrc} alt="Location icon" className="w-8 h-8 sm:w-12 sm:h-12 object-contain" />
        <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold ml-2 sm:ml-3">{title}</span>
      </div>
      {subtitle && <span className="text-sm sm:text-base md:text-lg lg:text-xl -mt-1 ml-10 sm:ml-14">{subtitle}</span>}
    </div>
  );
}

function Properties() {
  return (
    <main className="flex flex-col">
      <ImageWithOverlay 
        src={"https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082753/kasol_hfggcj.png"}
        alt="Mountain landscape with lake"
        linkTo="/kasol"
      >
        <LocationCard
          iconSrc={"https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png"}
          title="Mid Orchard Kasol- Riverside"
        />
      </ImageWithOverlay>
      
      <ImageWithOverlay 
        src={"https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082760/manali_bayn3u.png"}
        alt="Mountain landscape at sunset"
        linkTo="/manali"
      >
        <LocationCard
          iconSrc={"https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082719/aangan_logo_mxdrjf.png"}
          title="Aangan By Mid Orchard, Manali"
          subtitle="Villa & Homes"
        />
      </ImageWithOverlay>
    </main>
  );
}

export default Properties;