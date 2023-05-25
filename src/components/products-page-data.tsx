import { SingleProductData } from "./single-product-data"
import { ProductsSkeleton } from "./productsSkeleton"
import React, { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { AccordionTrigger, AccordionContent, AccordionItem } from "./accordion-radix";
import { BrandsButton } from "./Button";
import * as Slider from '@radix-ui/react-slider';
const ProductsPageData = ({ data, cat_data, isSearchPage, selectedBrands }: { data: any, cat_data: any, isSearchPage: boolean, selectedBrands: string }) => {

    const skeletonArray = Array(12).fill(<ProductsSkeleton />)
    const [rangeSliderValue, setRangeSliderValue] = useState([50])


    function slugify(text: string) {
        return text.toLowerCase().replace(/[\/\s&]+/g, '-');
    }

    function generatePath(grand_p: string, parent: string, child: string) {
        return `category/${slugify(grand_p)}/${parent}/${slugify(child)}`
    }

    const rangeSliderValueChange = (newValue: number[]) => {
        setRangeSliderValue(newValue)
    }

    return (
        <div className='py-5 max-w-[1450px]  mx-auto'>
            {!isSearchPage ?
                <div className="flex justify-end  py-2">

                    <div className="flex items-center">
                        <div className="relative inline-block text-left group/sort-menu">
                            <div>
                                <button type="button" className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900" id="menu-button"  >
                                    Sort
                                    <svg className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" >
                                        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"></path>
                                    </svg>
                                </button>
                            </div>

                            <div className="group-hover/sort-menu:scale-100 scale-0 top-4 absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                                <div className="py-1">
                                    <a href="#" className="font-medium text-gray-900 block px-4 py-2 text-sm">Most Popular</a>
                                    <a href="#" className="text-gray-500 block px-4 py-2 text-sm" >Best Rating</a>
                                    <a href="#" className="text-gray-500 block px-4 py-2 text-sm" >Newest</a>
                                    <a href="#" className="text-gray-500 block px-4 py-2 text-sm" >Price: Low to High</a>
                                    <a href="#" className="text-gray-500 block px-4 py-2 text-sm" >Price: High to Low</a>
                                </div>
                            </div>
                        </div>

                        <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                            <span className="sr-only">View grid</span>
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M4.25 2A2.25 2.25 0 002 4.25v2.5A2.25 2.25 0 004.25 9h2.5A2.25 2.25 0 009 6.75v-2.5A2.25 2.25 0 006.75 2h-2.5zm0 9A2.25 2.25 0 002 13.25v2.5A2.25 2.25 0 004.25 18h2.5A2.25 2.25 0 009 15.75v-2.5A2.25 2.25 0 006.75 11h-2.5zm9-9A2.25 2.25 0 0011 4.25v2.5A2.25 2.25 0 0013.25 9h2.5A2.25 2.25 0 0018 6.75v-2.5A2.25 2.25 0 0015.75 2h-2.5zm0 9A2.25 2.25 0 0011 13.25v2.5A2.25 2.25 0 0013.25 18h2.5A2.25 2.25 0 0018 15.75v-2.5A2.25 2.25 0 0015.75 11h-2.5z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                        <button type="button" className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden">
                            <span className="sr-only">Filters</span>
                            <svg className="h-5 w-5" aria-hidden="true" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z" clip-rule="evenodd"></path>
                            </svg>
                        </button>
                    </div>
                </div> : null}

            <div aria-labelledby="products-heading" className="pb-24 pt-6">
                <h2 id="products-heading" className="sr-only">Products</h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                    {!isSearchPage ?
                        <form className="hidden lg:block divide-y space-y-4">
                            {cat_data.data ?
                                <>
                                <div ></div>
                                    <Accordion.Root
                                        className=""
                                        type="single"
                                        defaultValue="item-1"
                                        collapsible>
                                        <AccordionItem className="" value="item-1">
                                            <AccordionTrigger className="font-bold">Category</AccordionTrigger>
                                            {cat_data.data.map((item: any) => (
                                                <AccordionContent className="" >
                                                    <Accordion.Root
                                                        className="ml-2"
                                                        type="single"
                                                        collapsible>
                                                        <AccordionItem className="" value="item-1">
                                                            <AccordionTrigger className="font-semibold text-gray-600" >{item.name}</AccordionTrigger>
                                                            {item.children.map((child: any) => (
                                                                <AccordionContent className="" >
                                                                    <Accordion.Root
                                                                        className="ml-2"
                                                                        type="single"
                                                                        collapsible>
                                                                        <AccordionItem className="" value="item-1">
                                                                            <AccordionTrigger className="" >{child.name}</AccordionTrigger>
                                                                            {child.sections.map((sec_data: any) => (
                                                                                <AccordionContent className="ml-2" >
                                                                                    <a className="text-blue-500 block my-2" href={generatePath(item.name, child.slug, sec_data.name)}>
                                                                                        {sec_data.name}
                                                                                    </a>
                                                                                </AccordionContent>
                                                                            ))}
                                                                        </AccordionItem>
                                                                    </Accordion.Root>
                                                                </AccordionContent>
                                                            ))}
                                                        </AccordionItem>
                                                    </Accordion.Root>
                                                </AccordionContent>
                                            ))}
                                        </AccordionItem>
                                    </Accordion.Root>

                                    <Accordion.Root
                                        className=""
                                        type="single"
                                        defaultValue="item-1"
                                        collapsible>
                                        <AccordionItem className="" value="item-1">
                                            <AccordionTrigger className="font-bold">Brands</AccordionTrigger>
                                            <AccordionContent className="" >
                                                {data.brands ?
                                                    data.brands.map((brand: any) => (
                                                        brand.featured ?
                                                            <BrandsButton selectedBrands={selectedBrands} brandName={brand.name} />
                                                            : null
                                                    ))
                                                    : null}
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion.Root>
                                </>
                                : null}

                            <Accordion.Root
                                className=""
                                type="single"
                                defaultValue="item-1"
                                collapsible
                            >
                                <AccordionItem className="" value="item-1">
                                    <AccordionTrigger className="font-bold">Price</AccordionTrigger>

                                    <AccordionContent className="" >
                                        <div className="justify-between flex">
                                            <div>Range: AED 0 — AED {rangeSliderValue}</div>
                                            <button className=" bg-slate-200 hover:bg-slate-300 text-sm w-fit px-2 p-1 rounded-full">Filter</button>
                                        </div>
                                        <Slider.Root
                                            className="relative flex items-center select-none touch-none w-full h-5 mt-5"
                                            defaultValue={[0]}
                                            onValueChange={rangeSliderValueChange}
                                            value={rangeSliderValue}
                                            max={10000}
                                            step={100}
                                        >
                                            <Slider.Track className="bg-blackA10 relative grow rounded-full h-[3px]">
                                                <Slider.Range className="absolute bg-gray-400 rounded-full h-full" />
                                            </Slider.Track>
                                            <Slider.Thumb
                                                className="block w-5 h-5 bg-gray-700   rounded-[10px]  focus:outline-none  "
                                                aria-label="Volume"
                                            />
                                        </Slider.Root>
                                    </AccordionContent>
                                </AccordionItem>
                            </Accordion.Root>
                        </form>
                        : null}
                    <div className={`${isSearchPage ? ' col-span-full' : "col-span-3"}`}>
                        <div className={`grid ${isSearchPage ? "xl:grid-cols-6 lg:grid-cols-4  md:grid-cols-3" : "xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2"}  min-[300px]:grid-cols-2 grid-cols-1 sm:gap-3 gap-1`}>
                            {data.products.length > 1 ? data.products.map((pro_data: any) => (
                                <SingleProductData pro_data={pro_data} />
                            )) : <div className="w-full col-span-3">
                                <h1 className="text-blue-500 text-center py-2">No Products Found</h1>
                            </div>
                            }
                        </div>
                    </div>

                </div>
            </div>

        </div >


    )
}

export default ProductsPageData