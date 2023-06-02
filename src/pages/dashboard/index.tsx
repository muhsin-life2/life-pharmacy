import { ShopNowButton } from "@/components/Button"
import { FaArrowRight, FaCalendarCheck, FaComment, FaEdit, FaFileMedical, FaHeart, FaLocationArrow, FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapMarkerAlt, FaMapPin, FaPlus, FaPowerOff, FaUser, FaWallet } from "react-icons/fa"
import { useState } from "react"
import TransitionComp from "@/components/transition"
import { useSession } from "next-auth/react"
export default function DashboardPage({ }) {

    const [dashBoardVisibility, setDashBoardVisibility] = useState(true)
    const [ordersVisibility, setOrdersVisibility] = useState(false)
    const [returnOrdersVisibility, setreturnOrdersVisibility] = useState(false)
    const [addressesVisibility, setAddressesVisibility] = useState(false)
    const [accountDetails, setaccountDetailsVisibility] = useState(false)
    const [walletDetails, setWalletVisibility] = useState(false)
    const [appointments, setappointments] = useState(false)
    const [wishlist, setWishlist] = useState(false)
    const [chatWithUs, setChatWithUs] = useState(false)
    const [Logout, setLogOut] = useState(false)
    const [Prescription, setPrescription] = useState(false)
    const [selectedMenu, setSelectedMenu] = useState("dashboard")
    const session = useSession()

    const setMenuItemVisiblity = (menuName: string, setVisibility: boolean) => {
        if (setVisibility) {
            setMenuItemVisiblity(selectedMenu, false)
            setSelectedMenu(menuName)
        }
        debugger

        switch (menuName) {
            case "dashboard":
                setDashBoardVisibility(setVisibility)
                break

            case "orders":
                setOrdersVisibility(setVisibility)
                break

            case "returnOrders":
                setreturnOrdersVisibility(setVisibility)
                break

            case "prescrpition":
                setPrescription(setVisibility)
                break

            case "addresses":
                setAddressesVisibility(setVisibility)
                break

            case "accountDetails":
                setaccountDetailsVisibility(setVisibility)
                break

            case "wallet":
                setWalletVisibility(setVisibility)
                break

            case "appointments":
                setappointments(setVisibility)
                break

            case "wishlist":
                setWishlist(setVisibility)
                break

            case "chatWithUs":
                setChatWithUs(setVisibility)
                break

            case "Logout":
                setLogOut(setVisibility)
                break
        }

    }
    console.log(session);

    return (
        session.data && session.data.token ?

            <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px] min-h-fit flex space-x-10 pt-5">
                {/* <button data-drawer-target="separator-sidebar" data-drawer-toggle="separator-sidebar" aria-controls="separator-sidebar" type="button" className="ml-3 mt-2 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600 sm:hidden">
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                </svg>
            </button> */}
                <aside id="separator-sidebar" className="   w-80 -translate-x-full transition-transform sm:translate-x-0 " aria-label="Sidebar">
                    <div className=" overflow-y-auto px-1 rounded-md  py-1   ">
                        <ul className="space-y-2 font-medium ">
                            <li>
                                <input type="radio" className="hidden peer" id="dashboard" name="dashboard-menu" value="dashboard" defaultChecked={true} />
                                <label htmlFor="dashboard" onClick={() => setMenuItemVisiblity("dashboard", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 ">
                                        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                                        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                                    </svg>
                                    <span className="ml-3">Dashboard</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="orders" name="dashboard-menu" value="orders" />
                                <label htmlFor="orders" onClick={() => setMenuItemVisiblity("orders", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 ">
                                        <path fillRule="evenodd" d="M7.502 6h7.128A3.375 3.375 0 0118 9.375v9.375a3 3 0 003-3V6.108c0-1.505-1.125-2.811-2.664-2.94a48.972 48.972 0 00-.673-.05A3 3 0 0015 1.5h-1.5a3 3 0 00-2.663 1.618c-.225.015-.45.032-.673.05C8.662 3.295 7.554 4.542 7.502 6zM13.5 3A1.5 1.5 0 0012 4.5h4.5A1.5 1.5 0 0015 3h-1.5z" clipRule="evenodd" />
                                        <path fillRule="evenodd" d="M3 9.375C3 8.339 3.84 7.5 4.875 7.5h9.75c1.036 0 1.875.84 1.875 1.875v11.25c0 1.035-.84 1.875-1.875 1.875h-9.75A1.875 1.875 0 013 20.625V9.375zM6 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V12zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 15a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V15zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75zM6 18a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75H6.75a.75.75 0 01-.75-.75V18zm2.25 0a.75.75 0 01.75-.75h3.75a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Orders</span>
                                    <span className="ml-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 ">3</span>

                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="returnOrders" name="dashboard-menu" value="returnOrders" />
                                <label htmlFor="returnOrders" onClick={() => setMenuItemVisiblity("returnOrders", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 ">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 ">
                                        <path fillRule="evenodd" d="M9.53 2.47a.75.75 0 010 1.06L4.81 8.25H15a6.75 6.75 0 010 13.5h-3a.75.75 0 010-1.5h3a5.25 5.25 0 100-10.5H4.81l4.72 4.72a.75.75 0 11-1.06 1.06l-6-6a.75.75 0 010-1.06l6-6a.75.75 0 011.06 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="ml-3 flex-1 whitespace-nowrap">Return Orders</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="prescription" name="dashboard-menu" value="prescription" />
                                <label htmlFor="prescription" onClick={() => setMenuItemVisiblity("prescrpition", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaFileMedical className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-3 flex-1 whitespace-nowrap">Prescrpition</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="addresses" name="dashboard-menu" value="addresses" />
                                <label htmlFor="addresses" onClick={() => setMenuItemVisiblity("addresses", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaMapMarkerAlt className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-3 flex-1 whitespace-nowrap">Addresses</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="accountDetails" name="dashboard-menu" value="accountDetails" />
                                <label htmlFor="accountDetails" onClick={() => setMenuItemVisiblity("accountDetails", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaUser className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-3 flex-1 whitespace-nowrap">Account Details</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="wallet" name="dashboard-menu" value="wallet" />
                                <label htmlFor="wallet" onClick={() => setMenuItemVisiblity("wallet", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaWallet className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-3 flex-1 whitespace-nowrap">Wallet</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="appointments" name="dashboard-menu" value="appointments" />
                                <label htmlFor="appointments" onClick={() => setMenuItemVisiblity("appointments", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaCalendarCheck className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-4">Appointments</span>
                                </label>
                            </li>
                        </ul>
                        <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium ">
                            <li>
                                <input type="radio" className="hidden peer" id="wishlist" name="dashboard-menu" value="wishlist" />
                                <label htmlFor="wishlist" onClick={() => setMenuItemVisiblity("wishlist", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaHeart className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-3">Wishlist</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="chatWithUs" name="dashboard-menu" value="chatWithUs" />
                                <label htmlFor="chatWithUs" onClick={() => setMenuItemVisiblity("chatWithUs", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaComment className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-3">Chat with us</span>
                                </label>
                            </li>
                            <li>
                                <input type="radio" className="hidden peer" id="Logout" name="dashboard-menu" value="Logout" />
                                <label htmlFor="Logout" onClick={() => setMenuItemVisiblity("Logout", true)} className="peer-checked:bg-gray-200 flex cursor-pointer items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100   ">
                                    <FaPowerOff className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900  " />
                                    <span className="ml-3">Logout</span>
                                </label>
                            </li>
                        </ul>
                    </div>
                </aside>
                <div className="w-full">
                    {dashBoardVisibility ?
                        <TransitionComp setTransition={dashBoardVisibility}>
                            <div className="py-4 w-full space-y-4 ">
                                <div className="w-full py-5 px-3 rounded-lg border-slate-200 border text-sm space-y-4">
                                    <div>
                                        <span>Hello </span><span className="font-semibold">{session.data && session.data.user ? session.data?.user.name : "Helo"} !</span>
                                    </div>
                                    <div>
                                        From your account dashboard you can view your recent orders, manage your shipping and billing addresses, and edit your account details.
                                    </div>
                                </div>
                                <h1 className="font-semibold">Recent Purchases</h1>
                                <div className="w-full py-5 px-3 rounded-lg border-slate-200 border text-sm space-y-4">
                                    <i>
                                        You don't have any product yet!
                                    </i>
                                </div>
                            </div>
                        </TransitionComp>
                        : null
                    }

                    {ordersVisibility ?
                        <TransitionComp setTransition={ordersVisibility}>
                            <div className="py-4 w-full space-y-4 ">
                                <div>
                                    No order has been made yet.
                                </div>
                                <ShopNowButton classNames="">
                                    <div className="flex space-x-2 text-sm px-10 py-3 items-center">
                                        <p className=''>GO SHOP</p>
                                        <FaArrowRight className="w-5 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}

                    {returnOrdersVisibility ?
                        <TransitionComp setTransition={returnOrdersVisibility}>
                            <div className="py-4 w-full space-y-4 ">
                                <div>
                                    No return order has been made yet.
                                </div>
                                <ShopNowButton classNames="">
                                    <div className="flex space-x-2 text-sm px-10 py-3 items-center">
                                        <p className=''>GO SHOP</p>
                                        <FaArrowRight className="w-5 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}


                    {Prescription ?
                        <TransitionComp setTransition={Prescription}>
                            <div className="py-4 w-full space-y-5 ">
                                <div className="space-y-3">
                                    <h5 className="font-semibold text-2xl">Prescriptions</h5>
                                    <p className="text-sm">No prescription has been made yet.</p>
                                </div>
                                <ShopNowButton classNames="" >
                                    <div className="flex space-x-2 text-sm px-10 py-3 items-center">
                                        <p className=''>ADD PRESCRIPTION</p>
                                        <FaArrowRight className="w-5 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp>
                        : null}

                    {addressesVisibility ?
                        <TransitionComp setTransition={addressesVisibility}>
                            <div className="py-4 w-full space-y-5 ">
                                <div className="space-y-3">
                                    <div className="text-sm">
                                        The following addresses will be used on the checkout page by default.
                                    </div>
                                    <div className="flex space-x-2 items-center">
                                        <FaMapMarkerAlt className="" />
                                        <h5 className="text-[#002579] font-bold">Addresses</h5>
                                    </div>
                                </div>
                                <ShopNowButton classNames=" py-5 px-10 w-1/2 !border-slate-200 text-center">
                                    <div className="flex space-x-2 text-sm py-3 items-center w-fit mx-auto">
                                        <FaEdit className="w-3 " />
                                        <p className=''>New Address</p>
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}

                    {accountDetails ?
                        <TransitionComp setTransition={accountDetails}>
                            <div className=" w-full px-4 py-5 border border-slate-200 rounded-lg h-fit">
                                <form className="space-y-6 " >
                                    <div className="w-full space-y-2">
                                        <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">Full Name <span className="text-red-500 ml-1">*</span></label>
                                        <input type="text" name="state" defaultValue={session.data.token.name ? session.data.token.name : ""} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"  focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder="Full Name *" required />
                                        <p className="text-xs">Here is shown your first and last name.</p>
                                    </div>

                                    <div className="w-full space-y-2">
                                        <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">{session.data.token.email ? 'Email Address' : 'Phone Number'}<span className="text-red-500 ml-1">*</span></label>
                                        <input type="text" name="state" defaultValue={session.data.token.email ? session.data.token.email : session.data.token.phone} onBlur={(e) => { e.target.value === "" ? e.target.classList.add("border-red-500") : e.target.classList.remove("border-red-500") }} className={"  focus:outline-none block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 formTextBox"} placeholder={session.data.token.email ? "Email Address *" : "Phone Number *"} required />
                                    </div>

                                    <div className="w-full space-y-2">
                                        <label className=" text-sm block mb-2 font-medium text-gray-90 file: ">Gender (optional)<span className="text-red-500">*</span></label>
                                        <ul className="flex space-x-3">
                                            <li>
                                                <input type="radio" className="hidden peer" id="gender-selection-male" name="gender" value="male" />
                                                <label htmlFor="gender-selection-male" className="inline-flex items-center justify-between  py-2 px-10 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer   hover:text-gray-600 hover:bg-gray-100   peer-checked:border-blue-600 peer-checked:text-blue-600">
                                                    <div className="block">
                                                        <div className="w-full">Male</div>
                                                    </div>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" className="hidden peer" id="gender-selection-female" name="gender" value="female" />
                                                <label htmlFor="gender-selection-female" className="inline-flex items-center justify-between  py-2 px-10 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer   hover:text-gray-600 hover:bg-gray-100  peer-checked:border-blue-600 peer-checked:text-blue-600 ">
                                                    <div className="block">
                                                        <div className="w-full">Female</div>
                                                    </div>
                                                </label>
                                            </li>
                                            <li>
                                                <input type="radio" className="hidden peer" id="gender-selection-other" name="gender" value="other" />
                                                <label htmlFor="gender-selection-other" className="inline-flex items-center justify-between  py-2 px-10 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer   hover:text-gray-600 hover:bg-gray-100   peer-checked:border-blue-600 peer-checked:text-blue-600">
                                                    <div className="block">
                                                        <div className="w-full">Other</div>
                                                    </div>
                                                </label>
                                            </li>
                                        </ul>
                                    </div>
                                </form>
                                <ShopNowButton classNames="mt-5">
                                    <div className="flex space-x-2 text-sm py-3 items-center w-fit mx-auto px-5">
                                        <p className=''>SAVE CHANGES</p>
                                        <FaArrowRight className="w-3 h-3" />
                                    </div>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}

                    {walletDetails ?
                        <TransitionComp setTransition={walletDetails}>
                            <div className="space-y-3 w-full ">
                                <div className="bg-[#f4f7ff] p-3 rounded-lg w-full space-x-1">
                                    <span className="font-bold">Wallet Balance: </span>
                                    <span className="text-[#002579] font-semibold "> {session.data?.token.wallet_balance}.00</span>
                                    <span className="font-semibold text-xs"> AED</span>
                                </div>
                                <div className="border border-slate-200 rounded-lg p-5 space-y-3">
                                    <div>
                                        <i className="text-sm textslate-300">No transactions has been made yet.</i>
                                    </div>
                                    <ShopNowButton classNames="mt-5 ">
                                        <div className="flex space-x-2 text-sm py-3 items-center w-fit mx-auto px-10">
                                            <p className=''>GO SHOP</p>
                                            <FaArrowRight className="w-3 h-3" />
                                        </div>
                                    </ShopNowButton>
                                </div>
                            </div>
                        </TransitionComp> : null}

                    {appointments ?
                        <TransitionComp setTransition={appointments}>
                            <div className="py-4 w-full  flex justify-between ">
                                <div className="space-y-5">
                                    <div className="space-y-5">
                                        <h5 className="font-semibold text-2xl">Appointments</h5>
                                        <p className="text-sm">No appointment has been made yet.</p>
                                    </div>
                                    <ShopNowButton classNames="" >
                                        <div className="flex space-x-2 text-sm px-10 py-3 items-center">
                                            <p className=''>BOOK HOME PCR TEST</p>
                                            <FaArrowRight className="w-5 h-3" />
                                        </div>
                                    </ShopNowButton>
                                </div>
                                <ShopNowButton classNames="h-fit flex items-center py-2 px-3 space-x-3" >
                                    <FaPlus className="w-2 h-3" />
                                    <p >Appointment</p>
                                </ShopNowButton>
                            </div>
                        </TransitionComp> : null}
                </div>
            </div>
            : null
    )

}

export async function getStaticProps({ }) {
    return {
        props: {

        }
    }


}