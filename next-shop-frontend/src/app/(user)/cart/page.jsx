"use client"

import CartItem from "@/common/CartItem";
import Loader from "@/common/Loader";
import { useCreatePayment } from "@/hooks/usePayment";
import { useUserProfile } from "@/hooks/useUser";
import { sp } from "@/utils/replaceNumber";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function page() {
    const router =useRouter()
    const currentPath = window.location.pathname;
    const { isLoading, data } = useUserProfile()
    const {mutate:payment ,isPending}=useCreatePayment()
    const { user, cart } = data || {}
    


    const handlePayment = async () => {
        try {
            await payment(null, {
                onSuccess: () => {
                    router.push("/products")
                }
            })
        } catch (error) {
            toast.error(error?.message)
        }
    }
    
    
    return (
        <>
            {isLoading ? <Loader width={60} height={30} /> : !user ? <div className="flex flex-col gap-y-4 p-4 items-center justify-center">
                <p className="text-secondary-600 text-sm md:text-md">برای مشاهده سبد خرید، لطفا ابتدا وارد حساب کاربری خود شوید.</p>
                <Link href={`/auth?redirect=${encodeURIComponent(currentPath)}`} className="btn btn__primary">ورود به حساب کاربری</Link>
            </div> : user?.cart?.products.length <= 0 ? <div className="flex flex-col gap-y-4 p-4 items-center justify-center">
                <p className="text-secondary-600 text-sm md:text-md">سبد خرید شما خالی است</p>
                <Link href={"/products"} className="btn btn__primary">سفارش محصول</Link>
            </div> : <div className="grid grid-cols-4 gap-x-4 px-4">
                        <div className="col-span-3">
                            <h2 className="p-2 mb-4 text-secondary-800 text-base md:text-xl font-bold border-b border-secondary-50/50">سبد خرید</h2>
                            <div className="flex flex-col gap-y-4 p-2">
                                {cart?.productDetail.map(item => <CartItem key={item._id} item={item}/>)}
                            </div>
                    </div>
                        <div className="col-span-1">
                            <div className="flex flex-col rounded-lg shadow-lg shadow-secondary-50/50 p-2 mt-16">
                                <div className="flex flex-col gap-y-2">
                                    <div className="flex items-center justify-between px-4 py-2 mb-2">
                                        <span className="text-secondary-700 text-sm md:text-md">جمع کل :</span>
                                        <span className="text-secondary-600 text-xs sm:text-sm">{sp(cart.payDetail.totalGrossPrice)}&nbsp;تومان</span>
                                    </div>
                                    <div className="flex items-center justify-between px-4 py-2 mb-2">
                                        <span className="text-secondary-700 text-sm md:text-md">تخفیف :</span>
                                        <span className="text-secondary-500 text-xs sm:text-sm">{sp(cart.payDetail.totalOffAmount)}&nbsp;تومان&nbsp;-</span>
                                    </div>
                                    <div className="flex items-center justify-between px-4 py-2 mb-2 border-t border-secondary-50/20">
                                        <span className="text-secondary-700 text-sm md:text-md font-bold">قابل پرداخت :</span>
                                        <span className="text-success text-sm sm:text-md font-bold">{sp(cart.payDetail.totalPrice)}&nbsp;تومان</span>
                                    </div>
                                </div>
                                {isPending ? <Loader width={50} height={25}/> : <button onClick={()=>handlePayment()} className="btn btn__primary w-full">پرداخت</button>}
                            </div>
            </div>
        </div>}
        </>
        
    );
}

export default page;