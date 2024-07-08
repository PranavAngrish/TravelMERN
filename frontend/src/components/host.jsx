import * as React from "react";

const HostProfile = ({ name, location, description, imageSrc, isReversed }) => (
  <section className={`relative px-3 sm:px-6 lg:px-16 mt-6 sm:mt-10 lg:mt-20 w-full rounded-xl bg-blue-950 bg-opacity-75 transition-all duration-300 hover:bg-opacity-90 hover:shadow-lg hover:shadow-teal-400/30`}>
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-4 sm:gap-6 py-4 sm:py-6 lg:py-8`}>
      <div className={`flex flex-col w-full lg:w-[70%] ${isReversed ? 'lg:items-end' : 'lg:items-start'}`}>
        <div className="flex relative z-10 flex-col grow">
          <h2 className={`text-xl sm:text-2xl lg:text-3xl font-semibold text-white ${isReversed ? 'lg:self-end' : 'lg:self-start'} transition-all duration-300 hover:text-teal-400`}>
            {name}, {location}
          </h2>
          <div className={`w-24 sm:w-36 lg:w-48 h-0.5 sm:h-1 bg-teal-400 mt-1 sm:mt-2 ${isReversed ? 'lg:self-end' : 'lg:self-start'} transition-all duration-300 hover:w-28 sm:hover:w-40 lg:hover:w-56`}></div>
          <p className="mt-3 sm:mt-4 lg:mt-6 text-sm sm:text-base lg:text-3xl font-bold text-zinc-500 transition-all duration-300 hover:text-zinc-300">
            {description}
          </p>
        </div>
      </div>
      <div className={`flex flex-col w-full lg:w-[30%] mt-4 lg:mt-0 ${isReversed ? 'lg:mr-5' : 'lg:ml-5'}`}>
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-full lg:h-0 lg:pb-[100%] mx-auto lg:mx-0 group">
          <div className="absolute inset-0 bg-teal-400 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105">
            <img src={imageSrc} alt={`${name} profile`} className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110" />
          </div>
          <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-yellow-300 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 group-hover:scale-125 group-hover:bg-yellow-400"></div>
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 bg-white rounded-full translate-x-1/4 translate-y-1/4 transition-all duration-300 group-hover:scale-110 group-hover:bg-teal-100"></div>
        </div>
      </div>
    </div>
  </section>
);

function Host() {
  const hosts = [
    {
      name: "Abhishek Taneja",
      location: "Kasol",
      description: "I am a B.Tech graduate in ECE with professional experience at Ericsson Global India, Noida (2014-2016). Since 2016, I have specialized in the tourism industry, developing and managing PAN India travel packages and operations for destinations such as Andaman, Kerala, Sikkim, Meghalaya, Himachal Pradesh, Uttarakhand, as well as international locations like Singapore, Maldives, Bali, and Dubai. In 2019, I founded and currently manage three hospitality properties in Himachal.",
      imageSrc: 'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082716/abhishek_xkuh44.png'
    },
    {
      name: "Sahil Bachan",
      location: "Manali",
      description: "I'm Sahil, a former engineer turned successful hospitality entrepreneur from Dobhi, Kullu, HP. After shifting from IT in 2014, I founded 'Camping Kona' in 2015, offering luxury camps. In 2018, I co-founded Mid Orchard, known for cottages, hostels, and hotels, where we're cherished as 'Host and Dost.' Combining technical expertise with local charm, I'm passionate about creating memorable stays in Himachal Pradesh.",
      imageSrc: 'https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082768/sahil_muo2cz.png'
    }
  ];

  return (
    <main className="flex flex-col justify-center bg-slate-800 bg-cover bg-center" style={{ backgroundImage: `url(/src/assets/bg_host.jpg)` }}>
      <div className="flex overflow-hidden relative flex-col px-3 sm:px-4 lg:px-6 pt-5 sm:pt-7 lg:pt-10 pb-10 sm:pb-12 lg:pb-16 w-full min-h-[600px] sm:min-h-[700px] lg:min-h-[800px]">
        <h1 className="relative self-center text-2xl sm:text-3xl lg:text-5xl font-semibold text-white text-center">
          Know more about your Hosts
        </h1>
        <img loading="lazy" src="https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082855/underline_hilihk.png" alt="" className="self-center max-w-full aspect-[8.33] fill-teal-400 w-[150px] sm:w-[200px] lg:w-[284px] mt-1 sm:mt-2 lg:mt-3 transition-all duration-300 hover:scale-110" />
        
        <HostProfile {...hosts[0]} isReversed={false} />
        <HostProfile {...hosts[1]} isReversed={true} />
      </div>
    </main>
  );
}

export default Host;