import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // v9+ uses `modules` path


interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="relative w-full h-full p-20">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView={1}
        className="rounded overflow-hidden"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={`http://milotec.com.ua/pictures/${src}`}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-contain bg-white"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;