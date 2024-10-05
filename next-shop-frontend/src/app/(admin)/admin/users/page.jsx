"use client"

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useRemoveUser, useUsersList } from '@/hooks/useUsersAdmin';
import Loader from '@/common/Loader';
import { useEffect, useState } from 'react';
import { arrOfObjtoNewArrOfObj } from '@/utils/objectUtils';
import Link from 'next/link';
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { HiOutlineTrash } from 'react-icons/hi';
import toast from 'react-hot-toast';


 

function page() {
    const { data, isLoading } = useUsersList()
    const {users} = data || {}
    console.log(users);
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([
        { field: "name", headerName: "نام" },
        {
            field: "phoneNumber", headerName: "شماره موبایل", cellClass: (params) => {
                return params.data.isVerifiedPhoneNumber ? "bg-success/50 text-secondary-500" : "bg-secondary-50/50 text-error"
            } },
        { field: "email", headerName: "ایمیل" },
        {
            field: "role", headerName: "نقش", cellClass: (params) => {
            switch (params.data.role) {
                case "USER":
                    return "bg-secondary-50/20"
                case "ADMIN":
                    return "bg-primary-100/50"
                default:
                    break;
            }
            }, valueGetter: (params) => {
                switch (params.data.role) {
                    case "USER":
                        return "کاربر"
                    case "ADMIN":
                        return "ادمین"
                    default:
                        break;
                }
        }},
        {field:"createdAt",headerName:"تاریخ عضویت",// Use valueFormatter to format the date
            valueFormatter: (params) => {
                const date = new Date(params.value);
                return date.toLocaleString('fa-IR'); // Example using Persian locale (you can adjust it)
            },
        },
        {
            headerName: "عملیات", cellRenderer: props => {
                return <ActionCellRenderer id={props.data._id} />
            }
        }])

    useEffect(() => {
        if (users) {
            const newUsersArr = arrOfObjtoNewArrOfObj(users, ["name", "phoneNumber", "isVerifiedPhoneNumber", "email", "role", "createdAt","_id"])
        setRowData(newUsersArr)
        }
    },[users])

    return (
        <div className="container max-w-screen-lg p-2">
            <h3 className="text-sm md:text-lg text-secondary-700 font-bold px-4 py-2 mb-4">لیست کاربران</h3>
            {isLoading ? <Loader width={60} height={30} /> :
                <div className="ag-theme-material h-screen p-4">
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

const ActionCellRenderer = ({ id }) => {
    const {isPending,mutate:removeUser}=useRemoveUser()

    const handleRemove = async (id) => {
        console.log(`we dont have api route for this action,user id is ${id}`);
        
        // try {
        //     await removeUser(id)
        // } catch (error) {
        //     toast.error(error?.response?.data?.message)
        // }
        
    }
    
    return (
        <div className='flex items-center gap-x-4 p-2'>
            <Link className='text-primary-700 ' href={`/admin/users/edit/${id}`}>
                <HiOutlinePencilSquare className="w-5 h-5 stroke-current" />
            </Link>
            <button className={`text-error ${isPending ? "opacity-20 blur-md" : ""}`} onClick={() => handleRemove(id)} disabled={isPending}>
                <HiOutlineTrash className='w-5 h-5  stroke-current' />
            </button>
            
        </div>
    )
}