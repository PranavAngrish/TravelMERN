import React, { useState, useCallback, useEffect } from "react";
import { FaPhone, FaEnvelope } from "react-icons/fa";
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
    to={`/legal?section=${targetId}`}
    className="block mt-2 sm:mt-3 transition-transform transform hover:scale-105 hover:text-teal-400 text-xs sm:text-sm"
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
  ];

  const legalLinks = [
    { text: "Terms & Conditions", targetId: "terms" },
    { text: "Payment Policy", targetId: "payment" },
    { text: "Cancellation Policy", targetId: "cancellation" },
    { text: "Provisional Bookings", targetId: "provisional" },
  ];

  const locations = [
    { name: "Aangan By Mid Orchard, Manali", position: { lat: 32.086581343440756, lng: 77.12471822486917 } },
    { name: "Mid Orchard Kasol- Riverside", position: { lat: 32.00687539017791, lng: 77.27902534946384 } },
  ];

  const handleLocationClick = (lat, lng) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${lat},${lng}`;
        window.open(url, '_blank');
      }, () => {
        const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
        window.open(url, '_blank');
      });
    } else {
      const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      window.open(url, '_blank');
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
    <footer className="relative flex flex-col min-h-screen text-white bg-black p-3 sm:p-4 md:p-6 lg:p-8">
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
                        onClick={() => handleLocationClick(location.position.lat, location.position.lng)}
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
        className="absolute bottom-0 sm:bottom-4 right-0 w-1/4 sm:w-1/5 max-w-[100px] sm:max-w-[150px]"
      />
    </footer>
  );
};

export default Footer;