import Image from "next/image"
import Link from "next/link"
import { FC } from "react";
interface pageProps {
    sectionData: any
    isDesktop: boolean
    isMobile: boolean
    m_width: number
    m_height: number
}

const generatePath = (type_key: string, slug: string, type_value: string) => {
    switch (type_key) {
        case "page":
            return `/${slug}`
        case "category":
            return `/products?categories=${slug}`
        case "collection":
            return `/products?collections=${slug}`
        case "brand":
            return `/products?brands=${slug}`
        case "link":
            return type_value
        default:
            return "#"
    }
}

const ImgPage: FC<pageProps> = ({ sectionData, isDesktop, isMobile, m_width, m_height }) => {

    return <>

        <Link href={generatePath(sectionData.type_key, sectionData.slug, sectionData.type_value)} >
            <Image src={isDesktop ? sectionData.desktop.image_url : sectionData.mobile.image_url} className={`mx-auto brightness-100 hover:brightness-105 transition-all duration-400 ${isDesktop ? 'max-w-full' : 'w-full'}`}
                height={isDesktop ? (sectionData.desktop.height ? sectionData.desktop.height : 109) : (sectionData.mobile.height ? sectionData.mobile.height : m_height ? m_height : 100)}
                width={isDesktop ? (sectionData.desktop.width ? sectionData.desktop.width : 390) : sectionData.mobile.width ? sectionData.mobile.width : m_width ? m_width : 100} alt={sectionData.slug} />
        </Link>
    </>

}

export default ImgPage