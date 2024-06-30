import * as React from "react";
import { useLocation } from 'react-router-dom';

const PolicySection = ({ title, content, id }) => (
  <section id={id} className="mt-36 max-md:mt-10 max-md:max-w-full scroll-mt-32">
    <h2 className="text-6xl font-semibold text-white max-md:text-4xl hover:text-teal-300 transition-colors duration-300">
      {title}
    </h2>
    <p className="mt-6 text-3xl text-white max-md:max-w-full leading-relaxed hover:text-gray-300 transition-colors duration-300">
      {content}
    </p>
  </section>
);

const NavItem = ({ text, targetId, isActive, onClick }) => (
  <button
    onClick={() => onClick(targetId)}
    className={`text-2xl ${isActive ? 'text-teal-400' : 'text-white'} 
                hover:text-teal-300 transition-all duration-300 ease-in-out
                transform hover:scale-105`}
  >
    {text}
  </button>
);

function MidOrchardTerms() {
  const [activeSection, setActiveSection] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const section = searchParams.get('section');
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = ["terms", "payment", "cancellation", "provisional"];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (targetId) => {
    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = document.querySelector('nav').offsetHeight;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <main className="flex flex-col min-h-screen bg-slate-800 bg-opacity-95 relative">
      <div 
        className="fixed inset-0 bg-cover bg-center z-0 opacity-30" 
        style={{ backgroundImage: "url('/src/assets/bg_legal.png')" }}
      ></div>
      <div className="relative z-10">
        <header className="w-full max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col items-center justify-center">
            <div className="overflow-visible h-32 flex items-center mb-12">
              <img 
                loading="lazy" 
                src="/src/assets/logo.png" 
                alt="Mid Orchard logo" 
                className="w-48 h-auto object-contain transition-all duration-300 transform hover:scale-110"
              />
            </div>
            <h1 className="text-7xl font-semibold text-white max-md:text-4xl hover:text-teal-300 transition-colors duration-300 mb-16">
              MID ORCHARD
            </h1>
          </div>
        </header>
        <nav className="sticky top-0 z-20 bg-slate-800 bg-opacity-95 shadow-md">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex justify-between items-center space-x-8 max-md:flex-wrap max-md:space-x-4 max-md:space-y-2">
              <NavItem text="Terms & Conditions" targetId="terms" isActive={activeSection === "terms"} onClick={scrollToSection} />
              <NavItem text="Payment Policy" targetId="payment" isActive={activeSection === "payment"} onClick={scrollToSection} />
              <NavItem text="Cancellation Policy" targetId="cancellation" isActive={activeSection === "cancellation"} onClick={scrollToSection} />
              <NavItem text="Provisional Bookings" targetId="provisional" isActive={activeSection === "provisional"} onClick={scrollToSection} />
            </div>
          </div>
        </nav>
        <article className="max-w-7xl mx-auto px-6 py-16">
          <PolicySection
            id="terms"
            title="Terms & Conditions"
            content="All bookings are subject to availability, and reservations are confirmed based on room availability at the time of booking. Standard check-in time is scheduled for 13:00, and guests are requested to check out by 11:00 on the day of departure. We accommodate early check-in and late check-out requests based on room availability, and guests are encouraged to contact our Reservations Team in advance to arrange these options."
          />
          <PolicySection
            id="payment"
            title="Payment Policy"
            content="For your convenience, our booking process accommodates both online reservations and bookings made through our dedicated Reservations Team. For online bookings, we require full payment at the time of reservation. Alternatively, when booking through our Reservations Team, a deposit equivalent to 25% of the total booking fee is due upon reservation request. The remaining 75% of the fee is to be settled no later than 10 days prior to the scheduled reservation date. Bookings made less than 7 days in advance through our Reservations Team necessitate full payment at the time of booking. This structured approach ensures smooth handling of reservations and enhances our ability to provide you with exceptional service."
          />
          <PolicySection
            id="cancellation"
            title="Cancellation Policy"
            content="Cancellation of reservations must adhere to our policy for efficient management. No refunds will be provided for cancellations made less than 7 days prior to the scheduled arrival date. A 50% refund of the total booking amount will be granted for cancellations made between 7 and 15 days prior to the arrival date. Reservations cancelled more than 15 days prior to the arrival date are eligible for a full refund of the booking fee. Refunds will be processed in the original form of payment within 21 working days from the receipt of a written cancellation request. Please note that the timing of funds appearing in your account is subject to the policies and procedures of your financial institution."
          />
          <PolicySection
            id="provisional"
            title="Provisional Bookings"
            content="For reservations during Standard Season, bookings will be held provisionally for up to 4 days pending confirmation. During Peak Season, bookings will be held for a maximum of 2 days before confirmation is required. During Festive Season, a minimum stay of two nights is mandatory. Please note, check-ins and check-outs are not available on Republic Day, Independence Day, Dussehra, Diwali, Holi, Christmas Day, and New Year's Day. Group and Buyout rates for run-of-house bookings are available upon request. For contract rates or further inquiries, please contact us via email at midorchardcottage@gmail.com. All rates are subject to change."
          />
        </article>
      </div>
    </main>
  );
}

export default MidOrchardTerms;