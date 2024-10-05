"use client"

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useState } from 'react';
import { useUserProfile } from '@/hooks/useUser';

function page() {

    const { data } = useUserProfile()
    const { user, payments } = data || {}

    console.log(payments);
    
    

    const [rowData, setRowData] = useState([])
    const [colDefs, setColDefs] = useState([
        { field: "description" ,headerName:"توضیحات"},
        {
            field: 'invoiceNumber',
            headerName: 'شماره فاکتور',
            filter: 'agTextColumnFilter', // Text filter for invoice number
        },
        {
            field: 'products',
            headerName: 'محصولات',
            filter: 'agTextColumnFilter', // Text filter for products
        },
        { field: "amount" ,headerName:"هزینه"},
        { field: "createdAt",headerName:"تاریخ" },
        {
            field: 'status',
            headerName: 'وضعیت',
            filter: 'agSetColumnFilter', // Use Set Filter for status
            filterParams: {
                values: ['COMPLETED', 'PENDING', 'FAILED'], // Optional: predefined status values
            }
        },
        
    ])
    
    

    useEffect(() => {
        if (payments) {
            const paymentDetailsInTable = payments.map((item) => {
                const productsTitle = item.cart.productDetail.map((i) => { return i.title }).join(" - ")

                
                return {
                    description: item.description,
                    invoiceNumber: item.invoiceNumber,
                    products: productsTitle,
                    amount: item.amount,
                    createdAt: new Date(item.createdAt).toLocaleString("fa-ir"),
                    status: item.status
                }
            });
            setRowData(paymentDetailsInTable);
        }
    }, [payments]); // Add `payments` to dependency array

    return (
        <div className="container max-w-screen-lg p-2">
            <h3 className="text-sm md:text-lg text-secondary-700 font-bold px-4 py-2 mb-4">سفارشات من</h3>
            {!!payments && <div className="ag-theme-quartz h-screen p-4">
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    enableRtl={true}
                    domLayout="autoHeight" // Optional: for auto-sizing the grid
                    
                />
            </div>}
        </div>
    );
}

export default page;