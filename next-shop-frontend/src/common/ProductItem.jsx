import { e2p, sp } from '@/utils/replaceNumber';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartBtn from './AddToCartBtn';
import LikeProduct from './LikeProduct';

function ProductItem({ product }) {
    

    
    
    return (
        <div className=" mb-16">
            <div className="flex flex-col bg-secondary-50/10 w-full p-2 rounded-lg gap-y-2 shadow-lg relative ">
                <Link href={`/products/${product.slug}`}>
                <div className="absolute left-0 right-0 -top-20 rounded-lg overflow-hidden mx-2 my-4 shadow-md shadow-secondary-50/30">

                        <Image
                            src={`/images/${product.imageLink}`}
                            width={1080}
                            height={800}
                            alt={product.description}
                            priority
                            />
                </div>
                            </Link>
                <div className="flex flex-col gap-y-2 bg-secondary-0 rounded-md p-2 mt-20">
                    <div className="min-h-28">
                        <Link href={`/products/${product.slug}`} className="flex items-center justify-between">
                        <h3 className="font-bold text-md sm:text-lg text-secondary-700 mt-4">{product.title}</h3>
                        {!!product.discount && <span className="bg-error px-2 py-0.5 text-white rounded-lg text-xs">{e2p(product.discount)}٪</span>}
                        </Link>
                        <div className="flex items-center justify-between m-2">
                            <div className="flex flex-wrap items-center gap-2">
                                {product?.tags.map(t => <span key={t} className="bg-secondary-50 text-white text-xs font-light px-2 py-0.5 rounded-lg text-nowrap">{t}</span>)}
                            </div>
                            <span className="text-xs sm:text-sm text-secondary-200 font-light border border-secondary-100 rounded-lg px-2 py-0.5">{product.brand}</span>
                        </div>
                    </div>
                        <div className="flex items-center gap-x-1 text-secondary-500 my-2">
                            <p className="text-xs sm:text-sm">قیمت : </p>
                            <p className={`${!!product.discount ? "line-through text-error/50 ml-2 text-xs" : "font-bold text-success"}`}>{sp(product.price)}</p>
                            {!!product.discount && 
                                <p className="font-bold text-success ml-2">{sp(product.offPrice)}</p>
                                
                            }
                    </div>
                    <LikeProduct product={product} />
                </div>
                <div className='flex'>
                    <AddToCartBtn id={product._id} />
                </div>
            </div>
        </div>
    );
}

export default ProductItem;