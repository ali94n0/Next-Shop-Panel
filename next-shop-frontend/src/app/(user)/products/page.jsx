import React from 'react';
import FilterSidebar from './FilterSidebar';
import queryString from 'query-string';
import { getCategoriesApi } from '@/services/categotyService';
import { getProductsApi } from '@/services/productService';
import ProductsList from './ProductsList';
import { cookies } from 'next/headers'
import { createCookieStr } from '@/utils/createCookieStr';

export const dynamic = 'force-dynamic';

async function page({searchParams}) {

    const cookieStore = cookies()
    const categoryData = getCategoriesApi()
    const productsData = getProductsApi(queryString.stringify(searchParams),createCookieStr(cookieStore))

    // Initiate both requests in parallel
    const [{categories}, {products}] = await Promise.all([categoryData, productsData])

    
    
    

    return (
        <div className='grid grid-cols-4 gap-x-4 mt-24'>
            <FilterSidebar categories={categories} />
            <ProductsList products={products}/>
        </div>
    );
}

export default page;