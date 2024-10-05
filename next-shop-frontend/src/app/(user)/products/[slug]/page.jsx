import AddToCartBtn from "@/common/AddToCartBtn";
import { getProductsApi, getSingleProductApi } from "@/services/productService";
import { e2p, sp } from "@/utils/replaceNumber";
import Image from "next/image";

export const dynamic = 'force-static'
export const dynamicParams = false

async function page({ params }) {
    const { slug } = params
    const {product} =await getSingleProductApi(slug)
    
    
    return (
        <div className='grid grid-cols-3 gap-x-4 px-2 sm:px-4'>
            <div className="col-span-1">
                <div className=" rounded-lg overflow-hidden shadow-lg shadow-secondary-50/50">
                    <Image src={`/images/${product.imageLink}`} width={1080} height={800} alt={product.description} />
                </div>
            </div>
            <div className="col-span-2">
                <div className="flex flex-col gap-y-4 rounded-lg shadow-lg shadow-secondary-50/50 p-4">
                    <div className="flex items-center gap-x-8">
                        <h1 className="text-md sm:text-base md:text-xl font-black text-secondary-700">{product.title}</h1>
                        {!!product.discount && <span className="px-3 py-1 text-white bg-error rounded-lg">{e2p(product.discount)}٪</span>}
                    </div>
                    <div className="flex items-center justify-between m-2">
                            <div className="flex flex-wrap items-center gap-2">
                                {product?.tags.map(t => <span key={t} className="bg-secondary-50 text-white text-xs font-light px-2 py-0.5 rounded-lg text-nowrap">{t}</span>)}
                            </div>
                            <span className="text-xs sm:text-sm text-secondary-200 font-light border border-secondary-100 rounded-lg px-2 py-0.5">{product.brand}</span>
                    </div>
                    <div className="px-2 w-full">
                        <p className="text-secondary-600 text-xs sm:text-sm lg:text-md whitespace-break-spaces">
                            {product.description}
                        </p>
                    </div>
                    <div className="flex items-center gap-x-1 text-secondary-500 my-2">
                            <p className="text-sm sm:text-base font-bold">قیمت : </p>
                            <p className={`${!!product.discount ? "line-through text-error/50 ml-2 text-xs" : "text-lg font-bold text-success"}`}>{sp(product.price)}</p>
                            {!!product.discount && 
                            <p className="font-bold text-lg text-success ml-2">{sp(product.offPrice)}</p>  
                            }
                    </div>
                    <div className="flex">
                    <AddToCartBtn id={product._id} width="w-1/3"/>
                </div>

                </div>

            </div>
        </div>
    );
}

export default page;

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const {products} = await getProductsApi()
 
  return products.map((product) => ({
    slug: product.slug,
  }))
}