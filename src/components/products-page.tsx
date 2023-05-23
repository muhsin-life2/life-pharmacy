import React from 'react'
import { useEffect, useState } from 'react';
import ProductsPageData from './products-page-data';
import getProductsDataByCat from '@/lib/getProductsDataByCat';
import { useLanguage } from '@/hooks/useLanguage';
import Image from 'next/image';
import getCategoryData from '@/lib/getCategoryData';
import getBrandsData from '@/lib/getBrandsData';
export const ProductsPage = ({ cat, type }: { cat: any, type: any }) => {

    const [data, setData] = useState([{
    }])
    const [noOfProducts, setNoOfProducts] = useState(40)
    const [animateSpin, setAnimateSpin] = useState(false)
    const [showMoreProductsbtn, setShowMoreProductsbtn] = useState(true)
    const [catData, setCatData] = useState({})
    const [brandsData, setBrandsData] = useState({})
    const [readMoreClick, setReadMoreClick] = useState(false)
    const { locale } = useLanguage();
    const [filtersData, setfiltersData] = useState({
        categories: [{
            images: {
                banner: ""
            }
        }
        ]
    })
    const [modelDetails, setModelDetails] = useState({
        short_description: ""
    })
    // function getApiUrl(isProductsPage: boolean, cat: string, type: any, noOfProducts: number) {
    //     const url = `https://prodapp.lifepharmacy.com/api/web/products?${isProductsPage ? "" : cat != "" ? `${cat}=${type}&` : ""}order_by=popularity&type=cols&skip=${noOfProducts}&take=40&new_method=true&lang=`
    //     console.log(url);

    //     return url
    // }

    function typeGenerate(type: string) {
        switch (type) {
            case "categories":
                return "category"
            case "collections":
                return "collection"
        }
        return ""
    }

    function fetchData(query: any, noOfProducts: number, loadMoreData: boolean) {
        if (query === null) {
            getProductsDataByCat(query, type, noOfProducts, true, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        setData([...data, ...proData.data.products])
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)
                        setfiltersData(proData.data.filters)
                        setModelDetails(proData.data.model_details)
                    }
                }
            )
        }
        else {
            getProductsDataByCat(query, type, noOfProducts, false, locale).then(
                (proData: any) => {
                    if (loadMoreData) {
                        setData([...data, ...proData.data.products])
                        setAnimateSpin(false)
                        setShowMoreProductsbtn(false)
                    }
                    else {
                        setData(proData.data.products)
                        setfiltersData(proData.data.filters)
                        setModelDetails(proData.data.model_details)

                    }
                }
            )
        }
        getCategoryData().then(cat_data => {
            setCatData(cat_data)

        }
        )
        getBrandsData().then((brands_data: any) => {
            setBrandsData(brands_data)
        })


    }

    function loadMoreProducts() {
        setAnimateSpin(true)
        fetchData(cat, noOfProducts, true)
        setNoOfProducts(c => c + 40)
    }
    useEffect(() => {
        fetchData(cat, 0, false)

    }, [])


    return (
        <div className="mx-auto max-w-[1450px] px-[10px] ">

            {
                filtersData.categories[0].images.banner != "" ?
                    <div className=" h-[10rem] px-[10px] grid items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y">
                        <div className='my-auto space-y-2'>
                        {cat ? <h1 className='text-4xl text-center capitalize'>{typeGenerate(cat)}</h1> : null}
                        <h1 className='text-2xl  text-center   capitalize text-blue-500'>{type ? String(type).toLowerCase().replace(/-/g, ' ') : " Products"} </h1>
                        </div>

                    </div> :
                    <div className=''>
                        <Image src={filtersData.categories[0].images.banner} height={500} width={1440} alt="headerimg" className=' object-cover lg:h-[20rem] md:h-[15rem] w-full mx-auto ' />
                        <nav className="flex px-5 py-3 mb-5 text-gray-700   rounded-lg bg-gray-50 my-5" aria-label="Breadcrumb">
                            <ol className="inline-flex items-center space-x-1 md:space-x-3">
                                <li className="inline-flex items-center">
                                    <a href={`/`} className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 ">
                                        <svg aria-hidden="true" className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <div className="flex items-center">
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>
                                        <a className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 ">Products</a>
                                    </div>
                                </li>
                            </ol>
                        </nav>
                        <div className="relative">
                            <p className={`text-sm text-gray-600 my-5  ${readMoreClick ? '' : 'overflow-y-hidden h-[7rem]'} text-ellipsis leading-7`} dangerouslySetInnerHTML={{ __html: modelDetails.short_description }} />
                            <div className={`absolute -bottom-6 left-0 right-0 text-center ${readMoreClick ? '' : 'bg-gradient-to-b from-transparent to-white'} pt-16`}>
                                <button onClick={() => setReadMoreClick(!readMoreClick)} className=' rounded-full text-sm bg-white border border-slate-200 hover:bg-slate-100 hover:text-blue-500 p-1 px-2'>Read {readMoreClick ? 'Less' : 'More'}</button>
                            </div>
                        </div>
                    </div>

            }
            <ProductsPageData data={data} cat_data={catData} brands_data={brandsData} />
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