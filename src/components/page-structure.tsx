import { useState, useEffect, FC } from "react";
import { useRouter } from 'next/router';

import DynamicSliderGrid from "./dynamic-slider-grid";
import DynamicGrid from "./dynamic-grid";
import dynamic from "next/dynamic";


interface compProps {
    data: any
    lang: string
    children: any
    setLoading: boolean
}

const PageStructure: FC<compProps> = ({ data, lang, children, setLoading }) => {

    const router = useRouter()

    return (
        <>

            {
                data.section_type === "dynamic_slider_grid" ?
                    <>
                        <div className="min-[566px]:hidden block">
                            <DynamicSliderGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                        </div>

                        <div className="max-[565px]:hidden block  px-[10px] mx-auto">
                            <DynamicSliderGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                        </div>
                    </>
                    : null
            }

            <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]">
                {
                    data.section_type === "dynamic_grid" ?
                        <>
                            <div className={`min-[566px]:hidden block`} style={{ background: data.settings.background_value }}>
                                <DynamicGrid data={data} isDesktop={false} isMobile={!data.settings.hide_in_mobile_web || data.settings.hide_in_mobile_web === false} />
                            </div>
                            <div className="max-[565px]:hidden block" style={{ background: data.settings.background_value }}>
                                <DynamicGrid data={data} isDesktop={!data.settings.hide_in_desktop_web || data.settings.hide_in_desktop_web === false} isMobile={false} />
                            </div>
                        </>
                        : ""
                }
                {
                    data.section_type === "product_grid" && (data.is_section_visible || data.is_enabled) ?
                        <>
                            {data.settings.show_section_title ?
                                <div className="flex justify-between my-5 mx-4">
                                    <h4 className="md:text-2xl text-sm  font-bold flex-1">{data.section_title}</h4>
                                    <button onClick={() => { router.push(`/products?collections=${data.section_data_object.slug}`) }} className="bg-[#39f] px-2 text-white text-xs">View All</button>
                                </div>
                                : null}
                            <div style={{ background: data.settings.background_value }}>
                                {children}
                            </div></>

                        : null
                }
            </div>
        </>
    )
}

export default PageStructure;