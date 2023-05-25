import React from 'react'
import { useEffect, useState } from 'react';
import ProductsPageData from './products-page-data';
import getProductsDataByCat from '@/lib/getProductsDataByCat';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import getCategoryData from '@/lib/getCategoryData';
import getBrandsData from '@/lib/getBrandsData';
import BreadCrumb from './breadcrumb';

export const ProductsPage = ({ filterPath, isSearchPage, categoryData, menuData, selectedBrands }: { categoryData: any, menuData: any, filterPath: string, isSearchPage: boolean, selectedBrands:string }) => {

    const [data, setData] = useState([{
    }])
    const [noOfProducts, setNoOfProducts] = useState(40)
    const [animateSpin, setAnimateSpin] = useState(false)
    const [showMoreProductsbtn, setShowMoreProductsbtn] = useState(true)
    const [catData, setCatData] = useState({})

    const [readMoreClick, setReadMoreClick] = useState(false)
    const { locale } = useLanguage();
    function typeGenerate(type: string) {
        switch (type) {
            case "Category":
                return "categories"
            case "Collection":
                return "collections"
        }
        return ""
    }

    function fetchData(query: any, noOfProducts: number, loadMoreData: boolean) {
        if (query === null) {
            getProductsDataByCat(filterPath, noOfProducts, true, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        setData([...data, ...proData.data.products])
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)

                    }
                }
            )
        }
        else {
            getProductsDataByCat(filterPath, noOfProducts, false, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        setData([...data, ...proData.data.products])
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)
                    }
                }
            )
        }

    }

    useEffect(() => {
        getCategoryData().then(cat_data => {
            setCatData(cat_data)
        })
    }, [])

    function loadMoreProducts() {
        setAnimateSpin(true)
        fetchData(typeGenerate(menuData[0]), noOfProducts, true)
        setNoOfProducts(c => c + 40)
    }



    return (
        <div className="mx-auto max-w-[1450px] px-[10px] ">
            {
                categoryData.filters && categoryData.filters.categories && categoryData.filters.categories[0] && categoryData.filters.categories[0].images.banner ?
                    <div className=''>
                        <Image src={categoryData.filters.categories[0].images.banner} height={500} width={1440} alt="headerimg" className=' object-cover lg:h-[20rem] md:h-[15rem] w-full mx-auto ' />
                        <BreadCrumb menuData={menuData} />
                        <div className="relative">
                            <p className={`text-sm text-gray-600 my-5  ${readMoreClick ? '' : 'overflow-y-hidden h-[7rem]'} text-ellipsis leading-7`} dangerouslySetInnerHTML={{ __html: categoryData.model_details.short_description }} />
                            <div className={`absolute -bottom-6 left-0 right-0 text-center ${readMoreClick ? '' : 'bg-gradient-to-b from-transparent to-white'} pt-16`}>
                                <button onClick={() => setReadMoreClick(!readMoreClick)} className=' rounded-full text-sm bg-white border border-slate-200 hover:bg-slate-100 hover:text-blue-500 p-1 px-2'>Read {readMoreClick ? 'Less' : 'More'}</button>
                            </div>
                        </div>
                    </div> :
                    <>
                        <div className=" h-[12em] px-[10px] grid items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y">
                            <div className='my-auto space-y-2'>
                                {menuData[0] ? <h1 className='text-4xl text-center capitalize'>{menuData[0]}</h1> : null}
                                <h1 className='text-2xl  text-center   capitalize text-blue-500'>{menuData[1] ? String(menuData[1]).toLowerCase().replace(/-/g, ' ') : " Products"} </h1>
                            </div>
                        </div>
                        <BreadCrumb menuData={menuData} />
                    </>

            }
            <ProductsPageData data={categoryData} cat_data={catData} isSearchPage={isSearchPage} selectedBrands={selectedBrands}/>
            {showMoreProductsbtn ?
                <div className='w-full flex justify-center'>
                    <button onClick={() => { loadMoreProducts() }} className='bg-[#39f] text-white px-3 py-2 flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={`w-6 h-6 ${animateSpin ? 'animate-spin' : ''}`}>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                        <p className='mx-3'>Load More Products</p> </button>
                </div>
                : null}
        </div>
    )
}