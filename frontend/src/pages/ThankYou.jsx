import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function ThankYouPage() {
  const logo = 'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png';
  const navigate = useNavigate();
  const location = useLocation();
  const propsToSend = location.state || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 sm:p-10 rounded-xl shadow-md">
        <div className="flex justify-center">
          <img className="h-12 w-auto sm:h-16" src={logo} alt="Logo" />
        </div>
        <h2 className="mt-6 text-center text-2xl sm:text-3xl font-extrabold text-gray-900">
          Thank You for Your Enquiry
        </h2>
        <p className="mt-2 text-center text-sm sm:text-base text-gray-600">
          We appreciate your interest in our {propsToSend.roomName || 'room'}. Our team will review your request and contact you soon.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/')}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm sm:text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThankYouPage;