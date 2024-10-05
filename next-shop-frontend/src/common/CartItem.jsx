"use client"

import { useAddToCart, useRemoveItem } from "@/hooks/useCart";
import { e2p, sp } from "@/utils/replaceNumber";
import Image from "next/image";
import toast from "react-hot-toast";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineTrash } from "react-icons/hi";

function CartItem({ item }) {
    const { mutate: increase, isPending: isIncreasing } = useAddToCart()
    const { mutate: decrease, isPending: isDecreasing}=useRemoveItem()


    
    
    const handleIncrease = async() => {
        try {
            await increase(item._id)
        } catch (error) {
            toast.error(error?.message)
        }
    }

    const handleDecrease = async() => {
        try {
            await decrease(item._id)
        } catch (error) {
            toast.error(error?.message)
        }
    }
    
    return (
        <div className="flex items-center justify-between rounded-md shadow-lg shadow-secondary-50/60 p-2 bg-secondary-0 border border-secondary-50/20 ">
            <div className="flex items-center gap-x-8">
                <div className="flex items-center justify-center rounded-md overflow-hidden w-24 h-16 border border-secondary-50/50">
                    <Image src={`/images/${item.imageLink}`} width={1024} height={800} alt={item.title} priority/>
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex items-center gap-x-8 mb-4">
                        <h3 className="text-secondary-600 text-sm md:text-md">{item.title}</h3>
                        {!!item.discount && <span className="px-2 py-0.5 rounded-lg bg-error/70 text-white text-xs sm:text-sm">{e2p(item.discount)}٪</span>}
                    </div>
                    <div className="flex items-center gap-x-2">
                        <button onClick={()=>handleIncrease()} className={`btn border border-secondary-50/50 shadow-md shadow-secondary-50/20 hover:shadow-input-focus py-1.5 px-1 text-secondary-600 ${isIncreasing && "blur-md opacity-50"}`}>
                            <HiOutlinePlus className="w-3 h-3 stroke-current" />
                        </button>
                            <span className="text-xs md:text-sm text-primary-800 m-x-2">{e2p(item.quantity)}</span>
                        {item.quantity <= 1 ? <span onClick={() => handleDecrease()} className={`text-error/80 ${isDecreasing && "blur-md opacity-50"}`}>
                                <HiOutlineTrash className="w-5 h-5 stroke-current" />
                        </span> : <button onClick={() => handleDecrease()} className={`btn border border-secondary-50/50 shadow-md shadow-secondary-50/20 hover:shadow-input-focus py-1.5 px-1 text-secondary-600 ${isDecreasing && "blur-md opacity-50"}`}>
                            <HiOutlineMinus className="w-3 h-3 stroke-current" />
                        </button>}
                            
                    </div>
                </div>
            </div>
            <div>
                <div className="flex items-center gap-x-6 px-4">
                    <span className={`${!!item.discount ? "text-secondary-200 text-xs md:text-sm line-through" : "text-success font-bold text-sm md:text-md"}`}>{sp(item.price * item.quantity)}&nbsp;تومان</span>
                    {!!item.discount && <span className="text-success font-bold text-sm md:text-md">{sp(item.offPrice * item.quantity)}&nbsp;تومان</span>}
                </div>
            </div>

            
        </div>
    );
}

export default CartItem;