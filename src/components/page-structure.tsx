import { useState, useEffect, FC } from "react";
import { useWindowSize } from '@react-hook/window-size'
import Products from "./products";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const DynamicSliderGrid = dynamic(() => import('./dynamic-slider-grid'), {
    loading: () => <p>Loading...</p>,
  });
  const DynamicGrid = dynamic(() => import('./dynamic-grid'), {
    loading: () => <p>Loading...</p>,
  });
interface compProps {
    data: any
    lang: string
    children: any
    setLoading: boolean
}

const PageStructure: FC<compProps> = ({ data, lang, children, setLoading }) => {

    const [domLoaded, setDomLoaded] = useState(false);
    const [width, height] = useWindowSize();
    const router = useRouter()

    useEffect(() => {
        setDomLoaded(true);
    }, []);

    // function getProductsDatas(catName) {
    //     getProductsData(lang, catName).then(res => setProData(res.data.products)
    //      )

    //     return proDatas
    // }
    return (
     
            <div >
                {
                    data.section_type === "dynamic_slider_grid" ?
                        width <= 565 ?
                            <DynamicSliderGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                            :
                            <DynamicSliderGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                        : ""
                }
                {
                    data.section_type === "dynamic_grid" ?
                        width <= 565 ?
                            <DynamicGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                            : <DynamicGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                        : ""
                }
                {
                    data.section_type === "product_grid" && (data.is_section_visible || data.is_enabled) ?
                        <>
                            <div className="flex justify-center my-5">
                                <h4 className="md:text-xl text-sm text-center font-bold flex-1">{data.section_title}</h4>
                                <button onClick={() => { router.push(`/products?collections=${data.section_data_object.slug}`) }} className="bg-[#39f] px-2 text-white text-xs">View All</button>
                            </div>
                            {children}
                        </>
                        : ""
                }
            </div>
          
    )
}

export default PageStructure;