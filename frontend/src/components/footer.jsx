import React, { useState, useCallback, useEffect } from "react";
import { FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";
import { GoogleMap, useLoadScript, MarkerF, OverlayView } from '@react-google-maps/api';
import { Link } from 'react-router-dom';

const ContactInfo = ({ icon: Icon, text }) => (
  <div className="flex gap-2 sm:gap-3 mt-2 sm:mt-3 text-sm sm:text-base items-center transition-transform transform hover:scale-105">
    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
    <span>{text}</span>
  </div>
);

const LegalLink = ({ text, targetId }) => (
  <Link 
    to={`/midorchard-policy?section=${targetId}`}
    className="text-slate-300 font-serif block mt-2 sm:mt-3 transition-transform transform hover:scale-105 hover:text-teal-400 text-xs sm:text-sm"
  >
    {text}
  </Link>
);

const mapContainerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '250px',
  borderRadius: '8px',
};

const mapStyles = [
  {
    featureType: "all",
    elementType: "geometry",
    stylers: [{ color: "#242f3e" }]
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#242f3e" }]
  },
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [{ color: "#746855" }]
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }]
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }]
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }]
  },
];

const Footer = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries: ['marker'],
  });

  const [map, setMap] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const contactInfo = [
    { icon: FaPhone, text: "+91 8580641878" },
    { icon: FaEnvelope, text: "midorchardcottage@gmail.com" },
    { icon: FaInstagram, text: "@midorchard" },
    { icon: FaInstagram, text: "@aanganforyou" },
  ];

  const legalLinks = [
    { text: "Terms & Conditions", targetId: "terms" },
    { text: "Payment Policy", targetId: "payment" },
    { text: "Cancellation Policy", targetId: "cancellation" },
    { text: "Provisional Bookings", targetId: "provisional" },
  ];

  const locations = [
    { name: "Aangan Homes By Mid Orchard", position: { lat: 32.086581343440756, lng: 77.12471822486917 } },
    { name: "Mid Orchard Kasol- Riverside", position: { lat: 32.00687539017791, lng: 77.27902534946384 } },
  ];

  const handleLocationClick = (destinationName) => {
    const encodedDestination = encodeURIComponent(destinationName);
    const isAppleDevice = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);
    
    const urls = {
      googleMaps: `comgooglemaps://?q=${encodedDestination}&center=${encodedDestination}`,
      appleMaps: `maps://maps.apple.com/?q=${encodedDestination}`,
      androidGoogleMaps: `https://www.google.com/maps/search/?api=1&query=${encodedDestination}`,
      browser: `https://www.google.com/maps/search/?api=1&query=${encodedDestination}`
    };
  
    if (isAppleDevice) {
      // Try opening Google Maps first
      window.location.href = urls.googleMaps;
      
      // If Google Maps doesn't open, try Apple Maps after a short delay
      setTimeout(() => {
        window.location.href = urls.appleMaps;
      }, 1000);
      
      // If neither app opens, fall back to browser after another short delay
      setTimeout(() => {
        window.location = urls.browser;
      }, 2000);
    } else if (isAndroid) {
      // For Android, try to open in Google Maps app
      window.location.href = urls.androidGoogleMaps;
      
      // Fall back to browser if the app doesn't open
      setTimeout(() => {
        window.location = urls.browser;
      }, 1000);
    } else {
      // For desktop or other devices, open in a new tab
      window.open(urls.browser, '_blank');
    }
  };

  const options = {
    styles: mapStyles,
    disableDefaultUI: true,
    zoomControl: windowSize.width > 768,
  };

  const onLoad = useCallback((map) => {
    setMap(map);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (map) {
      const bounds = new window.google.maps.LatLngBounds();
      locations.forEach(({ position }) => bounds.extend(position));
      map.fitBounds(bounds);
      const listener = window.google.maps.event.addListenerOnce(map, 'idle', () => {
        if (map.getZoom() > 10) map.setZoom(10);
      });
      return () => {
        window.google.maps.event.removeListener(listener);
      };
    }
  }, [map, locations]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <footer className="relative flex flex-col text-white bg-black p-3 sm:p-4 md:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 md:mb-6">Contact Us</h2>

      <div className="flex flex-col lg:flex-row justify-between">
        <div className="flex flex-col w-full lg:w-3/4 mb-4 lg:mb-0">
          <section className="mb-3 sm:mb-4 md:mb-6">
            {contactInfo.map((info, index) => (
              <ContactInfo key={index} icon={info.icon} text={info.text} />
            ))}
          </section>

          <div className="w-full h-48 sm:h-56 md:h-64 lg:h-80 rounded-lg overflow-hidden">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              options={options}
              onLoad={onLoad}
            >
              {locations.map((location, index) => (
                <React.Fragment key={index}>
                  <MarkerF
                    position={location.position}
                    icon={{
                      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                      scaledSize: new window.google.maps.Size(24, 24),
                    }}
                  />
                  <OverlayView
                    position={location.position}
                    mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                  >
                    <div className="bg-white text-black p-1 sm:p-2 rounded shadow-md" style={{ width: '120px', fontSize: '10px' }}>
                      <p className="font-semibold mb-1">{location.name}</p>
                      <button 
                        onClick={() => handleLocationClick(location.name)}
                        className="w-full px-1 py-0.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors text-xs"
                      >
                        Get Directions
                      </button>
                    </div>
                  </OverlayView>
                </React.Fragment>
              ))}
            </GoogleMap>
          </div>
        </div>

        <div className="w-full lg:w-1/5">
          <nav className="lg:ml-4">
            {legalLinks.map((link, index) => (
              <LegalLink key={index} text={link.text} targetId={link.targetId} />
            ))}
          </nav>
        </div>
      </div>

      <img
        loading="lazy"
        src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082751/footer_bbuezx.png"
        alt="Person sitting"
        className="absolute bottom-0 sm:bottom-4 right-0 w-1/3 sm:w-1/4 max-w-[150px] sm:max-w-[200px]"
      />
    </footer>
  );
};

export default Footer;