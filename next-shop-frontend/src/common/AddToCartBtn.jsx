"use client"

import { useAddToCart } from "@/hooks/useCart";
import Loader from "./Loader";
import toast from "react-hot-toast";
import { useUserProfile } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import Link from "next/link";

function AddToCartBtn({ width = "w-full", id }) {
    const router = useRouter()
    
    
    const { mutate: addToCart, isPending: isAddingToCart } = useAddToCart()
    const { data } = useUserProfile()
    const{user} = data || {}
    
    
    const handleAddToCart = async () => {
        if (!user) {
            toast.error("لطفا ابتدا وارد حساب کاربری خود شوید")
            const currentPath = window.location.pathname;
            router.push(`/auth?redirect=${encodeURIComponent(currentPath)}`);

        } else {
            try {
                await addToCart(id)
        } catch (error) {
                toast.error(error?.message)
        }
        }
    }

    const isInCart = (user, id) => {
        if (!user) return false;
        else {
            return user.cart?.products.some(item => item.productId === id)
        }
    }

    return (
        <>
        { isInCart(user,id) ? <Link href={"/cart"} className={`btn btn__secondary ${width} text-success text-sm`}>ادمه سفارش</Link> : isAddingToCart ? <Loader width={50} height={25}/> : <button onClick={handleAddToCart} className={`btn btn__primary ${width}`}>افزودن به سبد خرید</button>}
        </>
    );
}

export default AddToCartBtn;