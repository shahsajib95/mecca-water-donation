import { Card, CardContent } from "@/components/ui/card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import PremiumPopup from "./components/premium-popup";

export default function Home() {
  const banner = [
    "/images/banner.png",
    "/images/banner.png",
    "/images/banner.png",
    "/images/banner.png",
    "/images/banner.png",
    "/images/banner.png",
  ];

  const icons = [
    { icon: "/images/kaba.png", text: "مساجد مكة" },
    { icon: "/images/masjid.png", text: "مساجد مكة الأكثر حاجة" },
    { icon: "/images/food.png", text: "سقيا وإطعام الحرم" },
  ];
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Home</h1>

      {/* Carousel */}

      <div className="relative">
        {/* Custom Navigation Buttons */}
        <button
          className="swiper-button-prev absolute top-1/2 left-2 z-10 transform -translate-y-1/2 text-white bg-primary p-3 rounded-full shadow-md"
          id="custom-prev"
        ></button>
        <button
          className="swiper-button-next absolute top-1/2 right-2 z-10 transform -translate-y-1/2 text-white bg-primary p-3 rounded-full shadow-md"
          id="custom-next"
        ></button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={{
            prevEl: "#custom-prev",
            nextEl: "#custom-next",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2.25,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2.5,
              spaceBetween: 15,
            },
            1024: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          loop={true}
          speed={500}
          className="rounded-lg mb-12"
        >
          {banner?.map((i, index) => (
            <SwiperSlide key={index}>
              <img src={i} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center">
        <img src={"/images/live.png"} />
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {icons?.map((i, idx) => (
            <Card className="text-center rounded-2xl md:rounded-full" key={idx}>
              <CardContent className="p-10">
                <img
                  src={i?.icon}
                  alt={i?.text}
                  height={"100px"}
                  width={"100px"}
                />
                <p className="text-md text-purple-800">{i?.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Icon Cards Grid */}

      {/* Premium Box */}
      <PremiumPopup />
      <div
        className="fixed right-4 bottom-52 z-40 cursor-pointer"
        onClick={
          () => window.open("https://wa.me/8801234567890", "_blank") // Replace with your WhatsApp number
        }
      >
        <img src="/images/whatsapp.png" alt="whatsapp" className="w-12 md:w-14" />
      </div>
    </div>
  );
}
