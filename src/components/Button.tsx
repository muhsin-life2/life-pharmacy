import React, { useState } from 'react';
import { useRouter } from 'next/router';

export const BrandsButton = ({ selectedBrands, brandName }: { selectedBrands: string, brandName: any}) => {
    const router = useRouter()

    const [isInverted, setIsInverted] = useState(false);
    const brandsArray = selectedBrands.split(",")

    const brandsOnClick = (clickedBrand: any) => {
        if (selectedBrands.includes(clickedBrand)) {
            return router.asPath.replace(`${brandsArray.length === 1 ? "&brands=" + clickedBrand : "," + clickedBrand}`, "")
        }
        else {
            if (router.query.brands) {
                return `${router.asPath},${clickedBrand}`
            }
            else {
                return `${router.asPath}&brands=${clickedBrand}`
            }
        }
    }

    return (
        <a href={brandsOnClick(brandName.toLowerCase().replace(/[\s&]+/g, '-'))} onClick={()=>{setIsInverted(!isInverted)}} className={`${brandsArray.includes(brandName.toLowerCase().replace(/[\s&]+/g, '-')) ? "!bg-blue-500 !text-white" : ""} ${isInverted ? "!bg-blue-500 !text-white " : " "} cursor-pointer text-blue-500 border border-blue-500 px-2 py-1 text-center my-1 mr-2 rounded-full hover:bg-blue-500 hover:text-white inline-block text-xs`}>{brandName}</a>

    )
}
