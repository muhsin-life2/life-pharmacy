import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaRegStar, FaStarHalfAlt, FaMinus, FaPlus } from 'react-icons/fa';
import { useLanguage } from "@/hooks/useLanguage";

const SingleProductsContent = ({ pro_data }: { pro_data: any }) => {

    const [selectedImg, setSelectedImg] = useState(0);
    const [noOfProducts, setNoOfProducts] = useState(1);
    const [addedToCart, addToCart] = useState(false);
    const [cartValue, setCartValue] = useState(1);
    const [readMorClick, setReadMoreCLick] = useState(false)
    const [FeaturedImage, setFeaturedImage] = useState("https://www.lifepharmacy.com/images/default-product-image.png")

    const { locale } = useLanguage();

    useEffect(() => {
        setFeaturedImage(pro_data.images.featured_image);
    }, [])

    function cartItemAdded() {
        setTimeout(() => {
            addToCart(false)
        }, 1500)

        addToCart(true)
    }

    function addButtonClick() {
        setNoOfProducts(pro => pro + 1);
    }
    function minusButtonClick() {
        if (noOfProducts != 1) {
            setNoOfProducts(pro => pro - 1);
        }
    }

    function calculateRating(rating: number) {
        const fullStars = Math.round(rating);
        const halfStars = Math.round((rating - fullStars) * 2);

        const stars = new Array(5).fill(<FaRegStar className="text-amber-500 w-4 h-4" />);
        stars.fill(<FaStar className="text-amber-500 w-4 h-4" />, 0, fullStars);
        if (halfStars === 1) {
            stars[fullStars] = <FaStarHalfAlt className="text-amber-500 w-4 h-4" />;
        }
        return stars;
    }
    // function classNames(...classes) {
    //     return classes.filter(Boolean).join(' ')
    // }


    return (
        <>
            <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]  md:text-sm sm:text-xs md:bg-white bg-slate-50 py-5 ">
                {pro_data ?
                    <div>
                        <div className="mx-auto flex flex-wrap ">
                            <div className="hidden md:block">
                                {pro_data.images && pro_data.images.gallery_images[0] ?
                                    <div className="mr-4">
                                        {pro_data.images.gallery_images.map((gal_img: any, indx: number) => (
                                            <Image className={`lg:max-w-[4.5rem] mb-3 rounded-lg cursor-pointer ${selectedImg === indx ? "border-2 border-blue-400  " : ""}`} src={gal_img.thumbnail} height={80} width={80} onClick={() => {
                                                setSelectedImg(indx)
                                                setFeaturedImage(gal_img.full)
                                            }} alt="thumbnail-img" />
                                        ))}
                                    </div>
                                    :
                                    <div className="mr-4">
                                        <Image className={"border-2 border-blue-400 rounded-lg mb-3 w-full lg:max-w-[4.5rem]"} src={pro_data.images.featured_image} height={80} width={80} alt="thumbnail-img" />
                                    </div>
                                }
                            </div>

                            <div className="xl:w-1/4 lg:w-3/12 md:w-1/2 w-full  m-2 relative  bg-bottom">
                                <div className="w-full items-center object-cover object-center rounded-lg bg-white">
                                    <Image alt="ecommerce" className="w-full  " height={300} width={300} src={FeaturedImage} />
                                </div>
                                {pro_data.offers && pro_data.offers.value ?
                                    <div className="absolute right-3 top-3 bg-red-500 rounded-full text-white lg:text-xs text-[10px]  p-1 shadow-lg text-center w-[2.7rem]">{parseFloat(pro_data.offers.value).toFixed(0)}% OFF</div> : null}
                                {pro_data.label ? <div style={{ background: pro_data.label.color_code }} className={` skeleton-box absolute left-0 top-0 w-fit text-white px-5 rounded-tl-lg rounded-br-2xl py-1 text-sm`}>{pro_data.label.label_text}</div> : null}

                            </div>
                            <div className=" md:hidden block mx-auto">
                                {pro_data.images.gallery_images && pro_data.images.gallery_images[0] ?
                                    <div className="grid grid-flow-col">
                                        {
                                            pro_data.images.gallery_images.map((gal_img: any, indx: number) => (
                                                <Image className={`lg:max-w-[4.5rem] mr-4 rounded-lg ${selectedImg === indx ? "border-2 border-blue-400  " : ""}`} src={gal_img.thumbnail} height={80} width={80} onClick={() => {
                                                    setSelectedImg(indx)
                                                    setFeaturedImage(gal_img.full)
                                                }} alt="thumbnail-img" />
                                            ))}
                                    </div>
                                    : <div className="mr-4 ">
                                        <Image className={"border-2 border-blue-400 rounded-lg mb-3 w-full lg:max-w-[4.5rem]"} src={pro_data.images.featured_image} height={80} width={80} alt="thumbnail-img" />
                                    </div>
                                }
                            </div>

                            <div className="xl:w-5/12 lg:w-5/12 w-full lg:px-10 lg:py-6 mt-6 lg:mt-0">
                                <h1 className=" xl:text-2xl lg:text-xl  title-font font-bold mb-1 text-[#002579]">{pro_data.title}</h1>
                                <div className=" flex">
                                    <span className="flex items-center">
                                        {calculateRating(pro_data.rating).map(str => (
                                            str
                                        ))}
                                    </span>
                                    <span className="text-gray-600 ml-3">{pro_data.rating}</span>
                                </div>
                                <div className=" py-2 ">
                                    {pro_data.categories.map((cat_data: any) => (
                                        <Link href={`/products?categories=${cat_data.slug}`} className=" inline-flex mr-3 hover:text-white hover:bg-red-500 text-red-500  px-2 text-[10px] border border-red-500 rounded-md my-1">{cat_data.name}</Link>
                                    ))}
                                </div>
                                <div className="relative">
                                    <div className={`leading-relaxed text-gray-500 md:text-sm sm:text-sm text-xs ${readMorClick ? "from-white to-gray-200" : " overflow-y-hidden h-24 bg-gradient-to-b "}`} dangerouslySetInnerHTML={{ __html: pro_data.short_description }} />
                                    {readMorClick ?
                                        <button onClick={() => { setReadMoreCLick(false) }} className="text-blue-500 text-xs text-center mx-auto w-full">read less</button>
                                        :
                                        (pro_data.short_description).length > 300 ?
                                            <button onClick={() => { setReadMoreCLick(true) }} className="text-blue-500 text-xs text-center mx-auto w-full h-5 ">read more</button> : null

                                    }
                                </div>
                                <div className="border-slate-200 border rounded-lg mt-6">
                                    <div className="flex  items-center p-2  border-b-2 border-gray-100 justify-between">
                                        <div className="title-font font-medium text-2xl text-gray-900">
                                            {pro_data.prices ? pro_data.prices[0].price.offer_price != pro_data.prices[0].price.regular_price ?
                                                <div className="flex justify-between">
                                                    <div className="text-red-500 mr-3">
                                                        <span className="text-[8px] lg:text-xs">AED </span>
                                                        <span className="font-semibold text-2xl">{pro_data.sale_price}</span>
                                                    </div>
                                                    <div className="text-sky-500 text-xs my-auto">
                                                        <span ><del>AED {parseFloat(pro_data.filter_price).toFixed(2)}</del></span>
                                                    </div>
                                                </div> :
                                                <div className='text-blue-400' >
                                                    <span className="md:text-sm text-xs ">AED</span> <span className="lg:text-lg sm:text-base text-sm ">{pro_data.prices ? parseFloat(pro_data.prices[0].price.regular_price).toFixed(2) : null}</span>
                                                </div> : null}

                                        </div>
                                        <div className="flex   py-1 px-2 text-violet-800 rounded-full ">
                                            <Image className="my-auto" data-v-11f2193b="" src="https://www.lifepharmacy.com/images/express-nr.svg" width={20} height={22} alt={"delivery-spped"} />
                                            <span className="text-xs my-auto ml-3 ">1-3 HOURS</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-center h-fit p-3 bg-slate-100 space-x-2">
                                        <div className="flex">
                                            <button className="border  border-sky-600 text-white px-3 rounded-lg" onClick={() => cartValue > 1 ? setCartValue(value => value - 1) : null}>
                                                <FaMinus className="text-sky-600 h-[10px] " />
                                            </button>
                                            <input type="text" value={cartValue} min="1" max="20" className=" rounded rounded-r-none bg-slate-100 w-10 border-none text-center text-sm text-gray-500 " />
                                            <button className="border  bg-sky-500 text-white px-3 rounded-lg ">
                                                <FaPlus className="h-[10px]" onClick={() => setCartValue(value => value + 1)} />
                                            </button>
                                        </div>

                                        <button className="  text-white bg-sky-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded w-full ">
                                            <svg className="inline-block w-5 h-5 my-auto fill-white mr-2" fill="#000000" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M 4 7 C 3.449219 7 3 7.449219 3 8 C 3 8.550781 3.449219 9 4 9 L 6.21875 9 L 8.84375 19.5 C 9.066406 20.390625 9.863281 21 10.78125 21 L 23.25 21 C 24.152344 21 24.917969 20.402344 25.15625 19.53125 L 27.75 10 L 25.65625 10 L 23.25 19 L 10.78125 19 L 8.15625 8.5 C 7.933594 7.609375 7.136719 7 6.21875 7 Z M 22 21 C 20.355469 21 19 22.355469 19 24 C 19 25.644531 20.355469 27 22 27 C 23.644531 27 25 25.644531 25 24 C 25 22.355469 23.644531 21 22 21 Z M 13 21 C 11.355469 21 10 22.355469 10 24 C 10 25.644531 11.355469 27 13 27 C 14.644531 27 16 25.644531 16 24 C 16 22.355469 14.644531 21 13 21 Z M 16 7 L 16 10 L 13 10 L 13 12 L 16 12 L 16 15 L 18 15 L 18 12 L 21 12 L 21 10 L 18 10 L 18 7 Z M 13 23 C 13.5625 23 14 23.4375 14 24 C 14 24.5625 13.5625 25 13 25 C 12.4375 25 12 24.5625 12 24 C 12 23.4375 12.4375 23 13 23 Z M 22 23 C 22.5625 23 23 23.4375 23 24 C 23 24.5625 22.5625 25 22 25 C 21.4375 25 21 24.5625 21 24 C 21 23.4375 21.4375 23 22 23 Z"></path></g></svg>
                                            Add to Cart
                                        </button>

                                    </div>
                                </div>

                            </div>

                            <ul className="flex flex-col hidden lg:flex xl:w-1/6 max-w-fit flex-1 ml-auto justify-around my-5 py-4 px-5  border border-gray-200 rounded-lg ">
                                <li className="flex   lg:w-fit w-1/2 justify-center">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-gift.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">Free Delivery</h5>
                                        <div className="text-xs text-gray-400">For all orders over AED 29</div>
                                    </div>
                                </li>
                                <li className="flex lg:w-fit w-1/2 justify-center">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-return.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">Easy Return</h5>
                                        <div className="text-xs text-gray-400">Easy return and refund</div>
                                    </div>
                                </li>
                                <li className="flex lg:w-fit w-1/2  justify-center">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-shield.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">Secure Payments</h5>
                                        <div>
                                            <Image src={"https://www.lifepharmacy.com/images/payment-method.svg"} height={200} width={200} alt="free delivery" />
                                        </div>
                                    </div>
                                </li>
                                <li className="flex lg:w-fit w-1/2  justify-center">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-phone.svg"} height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col mx-6">
                                        <h5 className="text-indigo-900 text-sm font-semibold">24/7 Support</h5>
                                        <div className="text-xs text-gray-400">Dedicated Support</div>
                                    </div>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <ul className="grid sm:grid-cols-4 grid-cols-2  justify-around  lg:hidden mx-4 space-x-3 mb-4">
                                <li className="  mb-3 bg-slate-100 p-2 rounded-lg">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-gift.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">Free Delivery</h5>
                                        <div className="text-xs text-gray-400 text-center">For all orders over AED 29</div>
                                    </div>
                                </li>
                                <li className="  mb-3 p-2 rounded-lg bg-slate-100 ">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-return.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">Easy Return</h5>
                                        <div className="text-xs text-gray-400 text-center">Easy return and refund</div>
                                    </div>
                                </li>
                                <li className="  mb-3 p-2 rounded-lg bg-slate-100 ">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-shield.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">Secure Payments</h5>
                                        <div>
                                            <Image src={"https://www.lifepharmacy.com/images/payment-method.svg"} className="mx-auto mb-3 " height={150} width={150} alt="free delivery" />
                                        </div>
                                    </div>
                                </li>
                                <li className="  mb-3 p-2 rounded-lg bg-slate-100 ">
                                    <Image src={"https://www.lifepharmacy.com/images/svg/ecommerce-phone.svg"} className="mx-auto m-3" height={25} width={25} alt="free delivery" />
                                    <div className="flex flex-col ">
                                        <h5 className="text-indigo-900 text-xs font-semibold text-center">24/7 Support</h5>
                                        <div className="text-xs text-gray-400 text-center">Dedicated Support</div>
                                    </div>
                                </li>
                            </ul>
                        </div>



                        <div className="flex justify-between">
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-1.gif" width="48%" className="" />
                            <img src="https://lifeadmin-app.s3.me-south-1.amazonaws.com/mobile-app/homescreen/Product%20page%20banner/ppb-2.gif" width="48%" className="" />
                        </div>
                        <div className="py-4">
                            <h5 className="text-pink-700 text-xl font-semibold mb-2">Overview</h5>
                            <div dangerouslySetInnerHTML={{ __html: pro_data.short_description }} className="text-gray-500 md:text-sm text-xs leading-relaxed " />
                        </div>
                        <div className="py-4">
                            <h5 className="text-pink-700 text-xl font-semibold mb-2 details-sec">Details</h5>
                            <div dangerouslySetInnerHTML={{ __html: pro_data.description }} className="text-gray-500 md:text-sm text-xs leading-relaxed " />
                        </div>
                        <div className="py-4">
                            <h5 className="text-pink-700 text-xl font-semibold mb-2">More Info</h5>
                            <div className="text-gray-500">SKU: {pro_data.sku}</div>
                        </div>
                        <div className="lg:flex justify-between">
                            <div className="lg:w-3/12 w-full lg:px-0 px-6">
                                <div className="text-center">
                                    <h3 className="text-blue-500 font-semibold text-2xl p-2">Product Rating</h3>
                                    <h2 className=" font-semibold text-4xl p-5">{pro_data.rating}<span className="text-gray-600">/5</span></h2>
                                    <div className="lg:w-1/2 w-1/4 mx-auto flex justify-around">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>

                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-4 h-4">
                                            <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-gray-500 text-center py-3">Based on {pro_data.number_of_reviews} Ratings</div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '85%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '38%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '60%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '30%' }}></div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <div className="w-full bg-gray-200  h-3 className=">
                                            <div className="bg-yellow-400 h-3 " style={{ width: '10%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:w-7/12 w-full py-3  ">
                                <h3 className="font-semibold text-xl ">Reviews (5 of 36)</h3>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                                <div className="flex justify-start py-4">
                                    <div className="w-1/4">
                                        <h5 className="text-sm">Jaspreet singh</h5>
                                        <div className="w-1/2 flex justify-start py-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="orange" className="w-3 h-3">
                                                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clip-rule="evenodd" />
                                            </svg>
                                        </div>
                                        <div className="text-gray-400 text-sm">Feb 21,2023</div>
                                    </div>
                                    <div className="w-3/4">
                                        <div className="text-gray-500 text-sm"><i>No comment</i></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    :
                    <div className="block relative flex-grow lg:space-x-3 lg:flex">
                        <div className="flex w-full space-x-5">
                            <div className="flex max-h-[25rem] w-1/4 flex-col justify-between space-y-4">
                                <span className="skeleton-box relative inline-block h-24 max-w-[6rem] rounded-lg xl:max-w-[8rem]"></span>
                                <span className="skeleton-box relative inline-block h-24 max-w-[6rem] rounded-lg xl:max-w-[8rem]"></span>
                                <span className="skeleton-box relative inline-block h-24 max-w-[6rem] rounded-lg xl:max-w-[8rem]"></span>
                            </div>
                            <div className="flex w-full flex-col justify-between space-y-4 md:max-h-full">
                                <span className="skeleton-box relative inline-block h-full w-full rounded-xl"></span>
                            </div>
                        </div>
                        <div className="flex w-full flex-col space-y-5  py-5 xl:py-0">
                            <span className="skeleton-box relative inline-block h-7 w-full rounded-md"></span>
                            <span className="skeleton-box relative inline-block h-7 w-2/3 rounded-md"></span>
                            <span className="skeleton-box relative inline-block h-7 w-1/2 rounded-md"></span>
                            <span className="skeleton-box relative inline-block h-7 w-3/4 rounded-md"></span>
                            <span className="skeleton-box relative inline-block !mt-auto h-10 w-full rounded-md"></span>
                            <div className="flex space-x-4">
                                <span className="skeleton-box relative inline-block h-7 !mt-auto w-1/4 rounded-md"></span>
                                <span className="skeleton-box relative inline-block h-7 !mt-auto w-1/4 rounded-md"></span>

                            </div>
                        </div>
                    </div>
                }

            </div>
        </>
    )
}


export default SingleProductsContent;