import React, { useState, useRef } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Footer from "../components/footer";
import Properties from "../components/firstPage/properties";
import Testimonial from "../components/firstPage/testimonials";
import Host from "../components/host";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setFormData } from "../redux/formSlice";
import { signoutSuccess } from "../redux/userSlice";
import { resetForm } from "../redux/formSlice";
import api from "../api/axios";
import Gallery from "../components/firstPage/Gallery.jsx";
import Blog from "../pages/Blog.jsx";

function Home() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [checkInDate, setCheckInDate] = useState(today);
  const [checkOutDate, setCheckOutDate] = useState(tomorrow);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const propertiesRef = useRef(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleClick = () => navigate("/signin");

  const handleClickLogOut = async () => {
    try {
      await api.post('/auth/signout');
      dispatch(signoutSuccess());
      dispatch(resetForm());
    } catch(error) {
      console.error("Logout failed:", error);
    }
  };

  const incrementCount = () => {
    if (numberOfPeople < 8) setNumberOfPeople(numberOfPeople + 1);
  };

  const decrementCount = () => {
    if (numberOfPeople > 1) setNumberOfPeople(numberOfPeople - 1);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const NavItem = ({ text, targetId, isMobile = false }) => (
    <div 
      onClick={() => {
        document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        if (isMobile) closeSidebar();
      }}
      className={`${isMobile 
        ? "text-gray-800 hover:text-[#3DBBCD] py-3 px-4 border-b border-gray-200 cursor-pointer transition-colors duration-300 text-lg" 
        : "text-white hover:text-teal-300 cursor-pointer transition-colors duration-300"
      }`}
    >
      {text}
    </div>
  );
  
  const DateSection = ({ icon, title, date, subtitle, onDateChange, minDate }) => (
    <div className="flex flex-col w-full sm:w-auto group">
      <div className="flex items-center gap-2 text-gray-600">
        <img src={icon} alt={`${title} icon`} className="w-[24px] sm:w-[28px] md:w-[30px] aspect-[1.25]" />
        <div className="text-xs sm:text-sm md:text-base transition-colors duration-300 group-hover:text-cyan-600">{title}</div>
      </div>
      <div className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl font-semibold relative">
        <DatePicker
          selected={date}
          onChange={onDateChange}
          minDate={minDate}
          dateFormat="dd/MM/yyyy"
          className="bg-transparent border border-gray-300 p-2 text-gray-700 w-full appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 group-hover:border-cyan-300 rounded-lg pr-8"
        />
        <svg className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-300 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
        </svg>
      </div>
      <div className="mt-1 text-xs sm:text-sm text-gray-400">{subtitle}</div>
    </div>
  );

  const PeopleSection = ({ icon, title, subtitle }) => (
    <div className="flex flex-col w-full sm:w-auto group">
      <div className="flex items-center gap-2 text-gray-600">
        <img src={icon} alt={`${title} icon`} className="w-[24px] sm:w-[28px] md:w-[30px] aspect-[1.25]" />
        <div className="text-xs sm:text-sm md:text-base transition-colors duration-300 group-hover:text-cyan-600">{title}</div>
      </div>
      <div className="mt-1 sm:mt-2 text-base sm:text-lg md:text-xl font-semibold">
        <div className="inline-flex items-center justify-between bg-gray-200 rounded-lg px-2 py-1 transition-all duration-300 group-hover:bg-gray-300 w-full sm:w-auto">
          <button className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 text-lg w-6 h-6 flex items-center justify-center" onClick={decrementCount}>-</button>
          <span className="text-gray-900 font-bold mx-2">{numberOfPeople}</span>
          <button className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 text-lg w-6 h-6 flex items-center justify-center" onClick={incrementCount}>+</button>
        </div>
      </div>
      <div className="mt-1 text-xs sm:text-sm text-gray-400">{subtitle}</div>
    </div>
  );

  const navItems = [
    { text: "Properties", targetId: "properties-section" },
    { text: "Testimonials", targetId: "testimonials-section" },
    { text: "Gallery", targetId: "gallery-section" },
    { text: "About us", targetId: "about-section" },
    { text: "Blog", targetId: "blog-section" },
    { text: "Contact", targetId: "contact-section" },
  ];

  const scrollToProperties = () => {
    dispatch(setFormData({
      checkInDate: formatDate(checkInDate),
      checkOutDate: formatDate(checkOutDate),
      numberOfGuests: numberOfPeople.toString(),
      loading: false
    }));
    propertiesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCheckInChange = (date) => {
    date.setHours(0, 0, 0, 0);
    setCheckInDate(date);
    if (date >= checkOutDate) {
      const newCheckOutDate = new Date(date);
      newCheckOutDate.setDate(newCheckOutDate.getDate() + 1);
      newCheckOutDate.setHours(0, 0, 0, 0); 
      setCheckOutDate(newCheckOutDate);
    }
  };

  const handleCheckOutChange = (date) => {
    if (date > checkInDate) {
      date.setHours(0, 0, 0, 0);
      setCheckOutDate(date);
    }
  };

  return (
    <div className="min-h-screen bg-[#0F1A29] text-white relative">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-center bg-cover bg-no-repeat" style={{
          backgroundImage: "url('https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082727/bg_main_rzkapc.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}>
          <div className="absolute inset-0 bg-[#0F1A29] opacity-50"></div>
        </div>
      </div>
      
      {/* Mobile Sidebar - Full Screen */}
      <div className={`fixed inset-0 bg-slate-800 bg-opacity-95 backdrop-blur-sm transform transition-all duration-300 ease-in-out z-50 lg:hidden ${
        isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}>
        <div className="flex flex-col h-full justify-center items-center text-center px-8">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between w-full max-w-md mb-12">
            <img
              src='https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png'
              alt="Mid Orchard Logo"
              className="w-[80px] h-auto"
            />
            <button
              onClick={closeSidebar}
              className="p-3 rounded-full hover:bg-gray-100 transition-colors duration-200"
            >
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          {/* Navigation Items */}
          <nav className="flex flex-col space-y-8 mb-12">
            {navItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  document.getElementById(item.targetId)?.scrollIntoView({ behavior: 'smooth' });
                  closeSidebar();
                }}
                className="text-white hover:text-[#3DBBCD] cursor-pointer transition-colors duration-300 text-2xl font-medium"
              >
                {item.text}
              </div>
            ))}
          </nav>
          
          {/* Login/Logout Button */}
          <div>
            {user.currentUser == null ? (
              <button 
                onClick={() => {
                  handleClick();
                  closeSidebar();
                }} 
                className="bg-[#3DBBCD] text-white py-4 px-12 rounded-xl hover:bg-teal-500 transition-colors duration-300 font-medium text-xl"
              >
                LOGIN
              </button>
            ) : (
              <button 
                onClick={() => {
                  handleClickLogOut();
                  closeSidebar();
                }} 
                className="bg-[#3DBBCD] text-white py-4 px-12 rounded-xl hover:bg-teal-500 transition-colors duration-300 font-medium text-xl"
              >
                LOGOUT
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="p-3 sm:p-5 md:p-6">
          <nav className="flex justify-between items-center">
            {/* Logo */}
            <img
              src='https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png'
              alt="Mid Orchard Logo"
              className="w-[50px] sm:w-[70px] md:w-[90px] h-auto"
            />
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8 xl:gap-32">
              {navItems.map((item, index) => (
                <NavItem key={index} text={item.text} targetId={item.targetId} />
              ))}
              {user.currentUser == null ? (
                <button onClick={handleClick} className="bg-[#3DBBCD] text-white px-6 py-2 rounded-xl hover:bg-teal-500 transition-colors duration-300">
                  LOGIN
                </button>
              ) : (
                <button onClick={handleClickLogOut} className="bg-[#3DBBCD] text-white px-6 py-2 rounded-xl hover:bg-teal-500 transition-colors duration-300">
                  LOGOUT
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-colors duration-200"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </nav>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-8 md:px-20 py-2 sm:py-6 md:py-16 flex-grow flex flex-col justify-center -mt-8 sm:mt-0">
          <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4">
            Property for <span className="text-[#3DBBCD] text-3xl sm:text-5xl md:text-7xl">memorable</span>
            <br />
            moments rich in
            <br />
            emotions
          </h1>
          <p className="text-sm sm:text-lg md:text-2xl mb-6 sm:mb-8">
            Enjoy mesmerizing views of the
            <br />
            valley with a peaceful and
            <br />
            Luxurious stay
          </p>
          <button className="bg-[#3DBBCD] text-white px-4 sm:px-7 py-2 sm:py-2.5 md:px-8 md:py-3 rounded-xl hover:bg-teal-500 text-sm sm:text-base self-start transition-colors duration-300" onClick={scrollToProperties}>
            BOOK NOW
          </button>
        </main>

        {/* Booking Form Section */}
        <section className="bg-white text-black rounded-t-[24px] sm:rounded-t-[36px] md:rounded-tl-[72px] lg:rounded-tl-[108px] p-4 sm:p-6 md:p-8 lg:p-12 w-full sm:w-[90%] md:w-[85%] lg:w-[75%] max-w-[1200px] self-end">
          {/* Mobile Layout */}
          <div className="block sm:hidden">
            {/* People Section - Mobile */}
            <div className="flex flex-col mb-4 group">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082761/profile_icon_ejstvh.svg" alt="Guests icon" className="w-[18px] aspect-[1.25]" />
                <div className="text-sm transition-colors duration-300 group-hover:text-cyan-600">Guests</div>
              </div>
              <div className="text-base font-semibold mb-1">
                <div className="inline-flex items-center justify-between bg-gray-200 rounded-lg px-3 py-2 transition-all duration-300 group-hover:bg-gray-300 w-[140px]">
                  <button className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 text-base w-6 h-6 flex items-center justify-center" onClick={decrementCount}>-</button>
                  <span className="text-gray-900 font-bold mx-2">{numberOfPeople}</span>
                  <button className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 text-base w-6 h-6 flex items-center justify-center" onClick={incrementCount}>+</button>
                </div>
              </div>
              <div className="text-xs text-gray-400">Add Guests</div>
            </div>

            {/* Date Sections in Grid - Mobile */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Check-in Section - Mobile */}
              <div className="flex flex-col group">
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082743/date_icon_zikap9.svg" alt="Check-in icon" className="w-[16px] aspect-[1.25]" />
                  <div className="text-xs transition-colors duration-300 group-hover:text-cyan-600">Check-in</div>
                </div>
                <div className="text-sm font-semibold relative mb-1">
                  <DatePicker
                    selected={checkInDate}
                    onChange={handleCheckInChange}
                    minDate={today}
                    dateFormat="dd/MM/yyyy"
                    className="bg-transparent border border-gray-300 p-2 text-gray-700 w-full appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 group-hover:border-cyan-300 rounded-lg pr-7 text-xs"
                  />
                  <svg className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-300 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="text-xs text-gray-400">Select date</div>
              </div>

              {/* Check-out Section - Mobile */}
              <div className="flex flex-col group">
                <div className="flex items-center gap-1 text-gray-600 mb-2">
                  <img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082742/checkout_w9sy9b.svg" alt="Check-out icon" className="w-[16px] aspect-[1.25]" />
                  <div className="text-xs transition-colors duration-300 group-hover:text-cyan-600">Check-out</div>
                </div>
                <div className="text-sm font-semibold relative mb-1">
                  <DatePicker
                    selected={checkOutDate}
                    onChange={handleCheckOutChange}
                    minDate={new Date(checkInDate.getTime() + 86400000)}
                    dateFormat="dd/MM/yyyy"
                    className="bg-transparent border border-gray-300 p-2 text-gray-700 w-full appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 group-hover:border-cyan-300 rounded-lg pr-7 text-xs"
                  />
                  <svg className="w-3 h-3 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-300 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div className="text-xs text-gray-400">Select date</div>
              </div>
            </div>

            {/* Search Button - Mobile */}
            <button className="bg-[#3DBBCD] rounded-xl w-full flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors duration-300 py-3" onClick={scrollToProperties}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span className="text-white font-medium text-sm">SEARCH</span>
            </button>
          </div>

          {/* Desktop Layout */}
          <div className="hidden sm:flex flex-row justify-between items-end space-x-4">
            {/* People Section - Desktop */}
            <div className="flex flex-col w-auto group">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082761/profile_icon_ejstvh.svg" alt="Guests icon" className="w-[24px] sm:w-[28px] lg:w-[30px] aspect-[1.25]" />
                <div className="text-sm md:text-base transition-colors duration-300 group-hover:text-cyan-600">Guests</div>
              </div>
              <div className="text-base md:text-lg lg:text-xl font-semibold mb-1">
                <div className="inline-flex items-center justify-between bg-gray-200 rounded-lg px-3 py-2 transition-all duration-300 group-hover:bg-gray-300 w-auto min-w-[120px]">
                  <button className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 text-lg w-8 h-8 flex items-center justify-center" onClick={decrementCount}>-</button>
                  <span className="text-gray-900 font-bold mx-3">{numberOfPeople}</span>
                  <button className="text-gray-700 hover:text-cyan-600 transition-colors duration-300 text-lg w-8 h-8 flex items-center justify-center" onClick={incrementCount}>+</button>
                </div>
              </div>
              <div className="text-xs md:text-sm text-gray-400">Add Guests</div>
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-gray-200"></div>

            {/* Check-in Section - Desktop */}
            <div className="flex flex-col w-auto group">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082743/date_icon_zikap9.svg" alt="Check-in icon" className="w-[24px] sm:w-[28px] lg:w-[30px] aspect-[1.25]" />
                <div className="text-sm md:text-base transition-colors duration-300 group-hover:text-cyan-600">Check-in</div>
              </div>
              <div className="text-base md:text-lg lg:text-xl font-semibold relative mb-1">
                <DatePicker
                  selected={checkInDate}
                  onChange={handleCheckInChange}
                  minDate={today}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent border border-gray-300 p-2 text-gray-700 w-full appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 group-hover:border-cyan-300 rounded-lg pr-8 text-sm sm:text-base"
                />
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-300 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="text-xs md:text-sm text-gray-400">Select date</div>
            </div>

            {/* Divider */}
            <div className="w-px h-16 bg-gray-200"></div>

            {/* Check-out Section - Desktop */}
            <div className="flex flex-col w-auto group">
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <img src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082742/checkout_w9sy9b.svg" alt="Check-out icon" className="w-[24px] sm:w-[28px] lg:w-[30px] aspect-[1.25]" />
                <div className="text-sm md:text-base transition-colors duration-300 group-hover:text-cyan-600">Check-out</div>
              </div>
              <div className="text-base md:text-lg lg:text-xl font-semibold relative mb-1">
                <DatePicker
                  selected={checkOutDate}
                  onChange={handleCheckOutChange}
                  minDate={new Date(checkInDate.getTime() + 86400000)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent border border-gray-300 p-2 text-gray-700 w-full appearance-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-300 group-hover:border-cyan-300 rounded-lg pr-8 text-sm sm:text-base"
                />
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none transition-colors duration-300 group-hover:text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="text-xs md:text-sm text-gray-400">Select date</div>
            </div>

            {/* Search Button - Desktop */}
            <button className="bg-[#3DBBCD] p-3 md:p-4 rounded-xl w-auto flex items-center justify-center gap-2 hover:bg-teal-500 transition-colors duration-300 px-6 md:px-8 min-h-[60px] md:min-h-[70px] lg:min-h-[80px]" onClick={scrollToProperties}>
              <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span className="text-white font-medium text-base md:text-lg">SEARCH</span>
            </button>
          </div>
        </section>
      </div>

      {/* Page Sections */}
      <div ref={propertiesRef} id="properties-section">
        <Properties/>
      </div>
      <div id="testimonials-section">
        <Testimonial/>
      </div>
      <div id="gallery-section" className="relative z-10">
        <Gallery />
      </div>
      <div id="about-section">
        <Host/>
      </div>
      <div id="blog-section">
        <Blog />
      </div>
      <div id="contact-section">
        <Footer />
      </div>
    </div>
  );
}

export default Home;