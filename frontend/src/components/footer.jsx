import React from "react";
import { FaPhone, FaEnvelope, FaInstagram } from "react-icons/fa";

const ContactInfo = ({ icon: Icon, text, href, label }) => (
  <a 
    href={href}
    className="flex gap-3 items-center transition-transform transform hover:scale-105 hover:text-teal-400 group"
    aria-label={label}
  >
    <Icon className="w-5 h-5 text-teal-400 group-hover:text-teal-300" />
    <span className="text-slate-300 group-hover:text-teal-400">{text}</span>
  </a>
);

const LegalLink = ({ text, targetId }) => (
  <a 
    href={`/midorchard-policy?section=${targetId}`}
    className="text-slate-400 hover:text-teal-400 transition-colors duration-300 block py-1"
  >
    {text}
  </a>
);

const Footer = () => {
  const contactInfo = [
    { 
      icon: FaPhone, 
      text: "+91 9317900124 (Enquiries)", 
      href: "tel:+919317900124",
      label: "Call for enquiries"
    },
    { 
      icon: FaPhone, 
      text: "+91 9876543210 (Reservations)", 
      href: "tel:+918894000274",
      label: "Call for reservations"
    },
    { 
      icon: FaEnvelope, 
      text: "midorchardcottage@gmail.com", 
      href: "mailto:midorchardcottage@gmail.com",
      label: "Send email"
    },
    { 
      icon: FaInstagram, 
      text: "@midorchard", 
      href: "https://instagram.com/midorchard",
      label: "Visit Instagram profile"
    },
  ];

  const legalLinks = [
    { text: "Terms & Conditions", targetId: "terms" },
    { text: "Payment Policy", targetId: "payment" },
    { text: "Cancellation Policy", targetId: "cancellation" },
    { text: "Provisional Bookings", targetId: "provisional" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black text-white overflow-hidden">
      <div className="container mx-auto px-6 py-12 lg:py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-8">
          
          {/* Contact Section */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-white">
              Contact Us
            </h2>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <ContactInfo 
                  key={index} 
                  icon={info.icon} 
                  text={info.text} 
                  href={info.href}
                  label={info.label}
                />
              ))}
            </div>
          </div>

          {/* Legal Links Section */}
          <div className="lg:col-span-1">
            <h3 className="text-xl font-semibold mb-6 text-white">
              Policies
            </h3>
            <nav className="space-y-2">
              {legalLinks.map((link, index) => (
                <LegalLink key={index} text={link.text} targetId={link.targetId} />
              ))}
            </nav>
          </div>

          {/* Branding Section */}
          <div className="lg:col-span-1 flex flex-col justify-center items-start">
            <h3 className="text-2xl font-bold mb-4 text-teal-400">
              Mid Orchard
            </h3>
            <p className="text-slate-300 leading-relaxed">
              Experience luxury and comfort in the heart of nature. Your perfect getaway awaits.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 pt-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <p className="text-slate-400 text-sm">
              © 2025 Mid Orchard. All rights reserved.
            </p>
            <div className="text-slate-400 text-sm max-w-xs md:max-w-none mx-auto">
              <div className="mb-1">Developed and Managed by</div>
              <div className="space-x-1">
                <a 
                  href="https://www.linkedin.com/in/mohin-gupta-3bb267305" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  Mohin Gupta
                </a>
                <span>and</span>
                <a 
                  href="https://www.linkedin.com/in/pranav-angrish-2b3693252" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-teal-400 hover:text-teal-300 transition-colors font-medium"
                >
                  Pranav Angrish
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Extra spacing for mobile to avoid image overlap */}
        <div className="h-16 md:h-0"></div>
      </div>

      {/* Decorative Image */}
      <img
        loading="lazy"
        src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082751/footer_bbuezx.png"
        alt="Person sitting"
        className="absolute bottom-0 right-0 w-24 md:w-32 lg:w-40 xl:w-48 opacity-80"
      />
    </footer>
  );
};

export default Footer;