"use client"

import Loader from "@/common/Loader";
import StatBox from "@/common/StatBox";
import { useUserProfile } from "@/hooks/useUser";
import { e2p } from "@/utils/replaceNumber";
import { HiOutlineAnnotation, HiOutlineClipboardList, HiOutlineCreditCard, HiOutlineShoppingBag } from "react-icons/hi";

const statIconStyle="w-10 h-10 md:w-6 md:h-6 lg:w-10 lg:h-10 stroke-current col-span-1 row-span-2 group-hover:text-primary-700 mr-8 sm:mr-4"

const statArray = [
    { id: 1, label: 'تیکت ها',details:1, icon: <HiOutlineAnnotation className={statIconStyle} /> },
    { id: 2, label: 'سفارشات', details:4,icon: <HiOutlineShoppingBag className={statIconStyle} /> },
    { id: 3, label: 'تراکنش ها', details:5,icon: <HiOutlineClipboardList className={statIconStyle} /> },
    { id: 4, label: 'کیف پول', details:1250000,icon: <HiOutlineCreditCard className={statIconStyle} />,price:true },
]



function page() {
    const { data,isLoading:isUserLoading } = useUserProfile()
    const {user} = data || {}
    
    
    
    

    return (
        <div className="container max-w-screen-lg p-2">
            {isUserLoading ? <Loader width={60} height={30}/> : <div >
                <div className="flex flex-col gap-y-4 text-sm sm:text-md text-secondary-600 font-light">
                <p>😍 {user?.name} عزیز، به نکست شاپ خوش امدید.</p>
                <span className="text-xs sm:text-sm text-secondary-400 font-light px-4">تاریخ پیوستن:&nbsp; {new Date(user.createdAt).toLocaleDateString("fa-ir")}</span>
                </div>
                <div className="mt-8">
                    <h3 className="my-4 text-lg font-bold text-secondary-600">خلاصه وضعیت :</h3>
                    <div className="grid grid-cols-12 gap-4 px-2 py-4">
                        
                        {statArray.map(item => <StatBox key={item.id} label={item.label} icon={item.icon} details={item.details} price={item?.price} />)}
                        
                    </div>
                </div>
            </div>}
        </div>
    );
}

export default page;