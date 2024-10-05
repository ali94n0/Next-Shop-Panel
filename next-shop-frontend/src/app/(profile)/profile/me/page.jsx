"use client"

import Loader from '@/common/Loader';
import TextField from '@/common/TextField';
import { useUserProfile, useUserUpdate } from '@/hooks/useUser';
import { includesObj } from '@/utils/objectUtils';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import * as Yup from "yup"


const inputInfo = {
    "name": "نام و نام‌خانوادگی",
    "email": "ایمیل",
    "phoneNumber": "شماره موبایل",
    "biography":"بیوگرافی",
}
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{3,}$/
const mobileRegex = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig

function page() {
    const { data ,isLoading} = useUserProfile()
    const { user } = data || {};
    const{mutate:updateUser,isPending:isUpdatingUser}=useUserUpdate()
    const includesKey = ["biography", "email", "phoneNumber", "name"];

    useEffect(() => {
        if (user) formik.setValues(includesObj(user, includesKey))
        
    },[user])
    
    const formik = useFormik({
            initialValues: {phoneNumber:"",name:"",email:"",biography:""} ,
            validationSchema: Yup.object({
                name: Yup.string().required("نام و نام خانوادگی الزامی است").matches(nameRegex, "نام و نام خانوادگی وارد شده نامعتبر است" ).min(6,"طول عبارت وارد شده کمتر از حد مجاز است"),
                email: Yup.string().required("ایمیل الزامی است").matches(emailRegex, "ایمیل وارد شده نامعتبر است"),
                phoneNumber: Yup.string().required("شماره موبایل الزامی است").matches(mobileRegex, { message: "شماره موبایل صحیح نیست" }),
                biography: Yup.string()
            }),
            onSubmit:null,
    })
    
    
    const handleEdit = async(e) => {
        e.preventDefault()
        try {
            await updateUser(formik.values)
        } catch (error) {
            toast.error(error?.message)
        }
        
    }

    

    return (
        <div className="container max-w-md">
            {isLoading ? <Loader width={60} height={30}/> : <div className='flex flex-col gap-y-4 p-2 rounded-md shadow-lg sm:mt-8'>
                <h3 className='my-2 text-secondary-600 text-md sm:text-lg font-bold'>اطلاعات کاربری</h3>
                <form className='flex flex-col gap-y-6 flex-col-reverse mt-4 px-2 sm:px-4'>
                    {Object.keys(includesObj(user, includesKey)).map(key => <TextField key={key} label={inputInfo[key]} name={key} id={key} formik={formik} dir={(key === "email" || key==="phoneNumber") && "dir__ltr" } />)}
                </form>
                {isUpdatingUser ? <Loader width={50} height={25}/> : <button className='btn btn__primary mb-2 mx-2 sm:mx-4' onClick={(e) => handleEdit(e)}>ویرایش</button>}
            </div>}
            
        </div>
    );
}

export default page;