"use client"

import Loader from '@/common/Loader';
import TextField from '@/common/TextField';
import { useCompleteProfile } from '@/hooks/useUser';
import { useFormik } from 'formik';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
import * as Yup from "yup"

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
const nameRegex = /^[a-zA-Z\u0600-\u06FF\s]{3,}$/
const routesByRoles = {
    "USER": "profile",
    "ADMIN":"admin"
}


function page() {
    const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
    const { mutate: completeProfile, isPending: isCompletingProfile } = useCompleteProfile()
    const router = useRouter()
    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("نام و نام خانوادگی الزامی است").matches(nameRegex, "نام و نام خانوادگی وارد شده نامعتبر است" ).min(6,"طول عبارت وارد شده کمتر از حد مجاز است"),
            email: Yup.string().required("ایمیل الزامی است").matches(emailRegex, "ایمیل وارد شده نامعتبر است" ),
        }),
        onSubmit: (values) => {
            handleCompleteProfile(values)
            
            
        }
    })
    
    const handleCompleteProfile = async(data) => {
        try {
            await completeProfile(data, {
                onSuccess: ({statusCode,data:{user}}) => {
                    if (statusCode) {
                        router.push(redirect ? redirect : `/${routesByRoles[user.role]}`)
                        
                    }

                    
                }
            })
        } catch (error) {
            toast.error(error?.message)
        }
    }
    

    return (
        <div className='flex justify-center'>
            <div className='w-full max-w-sm md:max-w-md'>
                <div className="p-4 sm:rounded-md sm:shadow-lg">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-y-6 w-full sm:px-4 my-4">
                    <TextField label={"نام و نام خانوادگی"} name={"name"} id={"name"} required={true} formik={formik} />
                        <TextField label={"ایمیل"} name={"email"} id={"email"} required={true} formik={formik} dir='dir__ltr' />
                        
                        {/* if we use radio input for choose Role */}
                        {/* <div className='flex items-center gap-x-8 text-secondary-600 font-light text-sm sm:text-md px-2'>
                            <label className="bg-secondary-0 text-xs sm:text-sm text-secondary-600 font-light ">نقش کاربری :&nbsp;<span className="text-error text-xxs sm:text-sm">*</span></label>
                            <RadioInput label={"کاربر"} name={"role"} id={"USER"} value={"USER"} onChange={formik.handleChange} checked={formik.values.role === "USER"}/>
                            <RadioInput label={"مدیر"} name={"role"} id={"ADMIN"} value={"ADMIN"} onChange={formik.handleChange} checked={formik.values.role === "ADMIN"}/>
                    </div>
                    {formik.touched.role && formik.errors.role ? (
                        <span className="block text-xxxs sm:text-xxs text-error">{formik.errors.role}</span>
                    ) : null} */}

                    {isCompletingProfile ? <Loader width={50} height={25}/> : <button type='submit' className="btn btn__primary w-full my-2" disabled={Object.keys(formik.errors).length || !formik.isValid || Object.values(formik?.values).includes("")}>ثبت اطلاعات</button>}
                </form>
            </div>
            
            </div>
        </div>
        
    );
}

export default page;