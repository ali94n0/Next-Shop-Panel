import ProductItem from "@/common/ProductItem";
import { e2p, sp } from "@/utils/replaceNumber";
import Image from "next/image";


function ProductsList({ products }) {
    
    return (
        <div className='col-span-3 px-2'>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 ">
                {products.map(product => <ProductItem key={product._id} product={product} />)}
            </div>
        </div>
    );
}

export default ProductsList;