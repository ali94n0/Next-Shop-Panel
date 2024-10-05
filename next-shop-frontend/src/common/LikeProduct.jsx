"use client"
import { useLikeProduct } from '@/hooks/useProduct';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

function LikeProduct({ product }) {
    const router=useRouter()
    const {mutate:likeProduct , isPending}=useLikeProduct()
    
    const handleLikeProduct = async (id) => {
        try {
            await likeProduct(id, {
                onSuccess: ({ statusCode }) => {
                    if (statusCode === 200) {
                        router.refresh()
                    }
                }
            })
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
    }
    return (
        <div className='p-2 text-error/70 flex w-full items-center gap-x-2'>
                        <button onClick={()=>handleLikeProduct(product._id)} className={isPending ? "opacity-10 blur-md" : ""} disabled={isPending}>
                            {product?.isLiked ? <HiHeart className='w-5 h-5 fill-current' /> : <HiOutlineHeart className='w-5 h-5 stroke-current' /> }
                        </button>
                    </div>
    );
}

export default LikeProduct;