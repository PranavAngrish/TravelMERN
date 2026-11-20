// Single source of truth for the Kasol rooms.
// Used by RoomInfo, RoomEnquiry, the Kasol landing page and the router.
export const LOGO = "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720082755/logo_qf2djj.png";
export const BRANCH = "Kasol";

export const rooms = [
  {
    slug: "sd",
    title: "Super Deluxe Room",
    subtitle: "Balcony & Mountain View",
    price: "₹2,400",
    infoPath: "/kasol-mountain-view-hotel",
    enquiryPath: "/deluxe-room-booking",
    enquiryHeading: ["Super Deluxe Room With", "Balcony & Mountain View"],
    enquiryBackground: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img4_sw27x9.jpg",
    cardImage: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720770731/sd_yrzjmq.png",
    cardTitle: "Super Deluxe Room With Balcony & Mountain View",
    description: "Indulge in luxury with our Super Deluxe Room, featuring a private balcony that opens up to breathtaking mountain vistas. Immerse yourself in comfort with spacious accommodations, contemporary design, and top-notch amenities. Elevate your stay with panoramic views, ensuring a memorable escape in the heart of nature's beauty.",
    images: [
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081764/img1_h90jde.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img2_h82llu.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img3_wcox61.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785911/img6_fkvs2s.png",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img4_sw27x9.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081774/img6_mpykvx.jpg"
    ],
  },
  {
    slug: "lux",
    title: "Luxury Room",
    subtitle: "Balcony & River View",
    price: "₹2,900",
    infoPath: "/kasol-river-view-hotel",
    enquiryPath: "/river-view-booking",
    enquiryHeading: ["Luxury Room With", "Balcony & River View"],
    enquiryBackground: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img3_wcox61.jpg",
    cardImage: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5459_wtnxap.jpg",
    cardTitle: "Luxury Room With Balcony & River View",
    description: "Indulge in opulence with our Luxury Room featuring a private balcony and mesmerizing river views. Immerse yourself in unparalleled comfort, surrounded by lavish furnishings and modern amenities. Bask in the serenity of nature while relishing the exquisite experience of our premium accommodations, where luxury meets the tranquility of a scenic riverside retreat.",
    images: [
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786537/img5_yap8bg.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5455_qs0np0.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192241/IMG_5453_qrvoly.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786539/img4_jj5dzv.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5459_wtnxap.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786539/img3_nk8x77.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720786560/img8_fypqic.png",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192232/IMG_5449_zv2vcw.jpg"
    ],
  },
  {
    slug: "fam",
    title: "Family Suite",
    subtitle: "Balcony & River View",
    price: "₹3,800",
    infoPath: "/kasol-family-hotel",
    enquiryPath: "/family-hotel-booking",
    enquiryHeading: ["Family", "Suite"],
    enquiryBackground: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720081763/img3_wcox61.jpg",
    cardImage: "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img7_do0ndv.jpg",
    cardTitle: "Family Suite With Balcony & River View",
    description: "Discover our Family Suite, where luxury meets panoramic views from your private balcony. Perfectly designed for comfort and relaxation, this spacious retreat offers modern amenities and plush furnishings for an unforgettable stay. Whether you're admiring sunrise vistas or unwinding together, our suite promises a luxurious experience for the whole family.",
    images: [
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785415/img1_tpd6df.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img2_qqdoj2.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img7_do0ndv.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785416/img3_l9xlll.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785911/img6_fkvs2s.png",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1720785415/img5_mgih6e.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192238/IMG_5462_kzkz0z.jpg",
      "https://res.cloudinary.com/dgtt3iwmv/image/upload/v1751192231/IMG_5454_hguvm7.jpg"
    ],
  },
];

export const getRoom = (slug) => rooms.find((r) => r.slug === slug);
