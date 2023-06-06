import { Swiper, SwiperSlide } from "swiper/react";
import { FC } from 'react'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, Autoplay } from "swiper";
import ImgPage from "./img-page";
import { useSwiper } from 'swiper/react';

interface props {
    data: any,
    isDesktop: boolean,
    isMobile: boolean
}

const DynamicSliderGrid: FC<props> = ({ data, isDesktop, isMobile }) => {

    if (isDesktop === false && isMobile === false) {
        return <></>
    }

    return <>

        {data.settings.show_section_title ?
            <div className="text-lg text-center my-3">{data.section_title}</div>
            : ""}
        <Swiper
            slidesPerView={isDesktop ? data.settings.desktop.column : data.settings.mobile.column}
            pagination={data.settings.show_pagination === true ? { dynamicBullets: true } : false}
            navigation={data.settings.navigation}
            modules={[Pagination, Navigation, Autoplay]}
            autoplay={data.settings.autoplay ? true : false}
            spaceBetween={20}
            className={"max-w-[1440px]"}
        >

            {data.section_data_array.map((sec_data: any) => (
                (isDesktop && sec_data.desktop.image_url || isMobile && sec_data.mobile.image_url) &&

                <SwiperSlide>
                    <ImgPage sectionData={sec_data} isDesktop={isDesktop} isMobile={isMobile} m_height={0} m_width={0} />
                </SwiperSlide>

            ))}
        </Swiper>
    </>

}

export default DynamicSliderGrid;