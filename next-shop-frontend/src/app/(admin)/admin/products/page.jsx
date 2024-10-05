"use client"

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import Loader from '@/common/Loader';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { HiOutlinePlusSm, HiOutlineTrash } from 'react-icons/hi';
import { arrOfObjtoNewArrOfObj } from '@/utils/objectUtils';
import { useAllProducts, useRemoveProduct } from '@/hooks/useProductAdmin';
import { e2p, sp } from '@/utils/replaceNumber';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import toast from 'react-hot-toast';

function page(props) {
    const { data, isLoading } = useAllProducts()
    const {products} = data || {}
    const [rowData,setRowData] = useState([])
    const [colDefs, setColDefs] = useState([
        {
            headerName: "ردیف", // Persian for "Index"
            valueGetter: "node.rowIndex + 1",  // Displays row index starting from 1
            cellClass: "text-center", // Center-align the text
            width: 90,  // Set width to keep it small
            suppressMovable: true // Prevent moving the column
        },
        { field: "title", headerName: "نام محصول" },
        { field: "description", headerName: "توضیحات" },
        { field: "category", headerName: "دسته بندی",valueGetter: (params)=>{return params.data.category.title} },
        { field: "price", headerName: "قیمت" ,valueGetter: (params)=>{return sp(params.data?.price)}},
        { field: "offPrice", headerName: "قیمت با تخفیف" ,valueGetter: (params)=> !!params.data?.discount ? sp(params.data?.offPrice) : "_"},
        { field: "discount", headerName: "تخفیف", valueGetter: (params) => !!params.data?.discount ? e2p(params.data?.discount) : "_" } ,
        {
            field: "tags", headerName: "تگ ها", cellRenderer: (params) => {
                return <div className='flex gap-1 w-full items-center h-full' >
                    {params.data.tags.map((i, index) => <span key={index} className='bg-secondary-50 text-xs text-secondary-500 rounded-md leading-none px-3 py-1.5 whitespace-nowrap'>{i}</span>)}
            </div>
        }},
        {
            field: "countInStock", headerName: "موجودی", cellClass: (params) => {
            switch (true) {
                case params.data.countInStock === 1:
                    return "bg-warning/30 text-secondary-500"
                case params.data.countInStock<=0:
                    return "bg-error/30 text-secondary-500"
                
                default:
                    break;
            }
            }
        },
        {
            headerName: "عملیات", cellRenderer: props => {
                return <ActionCellRenderer id={props.data._id} />
            }
        }
        
    ])

    useEffect(() => {
        if (products) {
            setRowData(arrOfObjtoNewArrOfObj(products,["title","description","category","price","offPrice","discount","tags","countInStock","_id"]))
        }
    },[products])
    
    return (
        <div className='container max-w-screen-lg p-2'>
            <div className=''>
                <div className='flex items-center px-2 justify-between mb-8'>
                <h3 className="text-sm md:text-lg text-secondary-700 font-bold px-4 py-2 mb-4">محصولات</h3>
                <Link href={"/admin/products/add"} className='btn btn__primary'>
                    <HiOutlinePlusSm className='w-5 h-5 stroke-current' />
                    افزودن محصول جدید
                </Link>
                </div>
                {
                    isLoading ? <Loader width={60} height={30}/> : <div className="ag-theme-material h-screen p-4">
                        <AgGridReact
                            rowData={rowData}
                            columnDefs={colDefs}
                            enableRtl={true}
                            domLayout="autoHeight"
                        />
                    </div>
                }
            </div>
            

            
        </div>
    );
}

export default page;


const ActionCellRenderer = ({ id }) => {
    const {mutate:removeProduct,isPending}=useRemoveProduct()


    const handleRemove = async (id) => {
        try {
            await removeProduct(id)
        } catch (error) {
            toast.error(error?.response?.data?.message)
        }
        
    }

    return (
        <div className='flex items-center leading-none p-2 gap-x-4'>
            <Link className='text-primary-700 ' href={`/admin/products/edit/${id}`}>
                <HiOutlinePencilSquare className="w-5 h-5 stroke-current" />
            </Link>
            <button className={`text-error ${isPending ? "opacity-20 blur-md" : ""}`} onClick={() => handleRemove(id)} disabled={isPending}>
                <HiOutlineTrash className='w-5 h-5  stroke-current' />
            </button>
        </div>
    )
}