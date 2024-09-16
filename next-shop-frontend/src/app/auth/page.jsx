"use client"

import { useGetOtp } from "@/hooks/useOtp";
import GetOtpForm from "./GetOtpForm";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup"
import CheckOtpForm from "./CheckOtpForm";

const mobileRegex = /(0|\+98)?([ ]|-|[()]){0,2}9[1|2|3|4]([ ]|-|[()]){0,2}(?:[0-9]([ ]|-|[()]){0,2}){8}/ig


function page() {
    const [step,setStep] = useState(1)
    const { mutate: getOtp, isPending: isGettingOtp } = useGetOtp()
    const[responseData,setResponseData] = useState("")
    
    const formik =useFormik({
        initialValues: {
            phoneNumber:"",
        },
        validationSchema: Yup.object({
            phoneNumber:Yup.string().required("شماره موبایل الزامی است").matches(mobileRegex,{message:"شماره موبایل صحیح نیست"})
        }),
        onSubmit: (values) => {
            handleGetOtp(values)
            
        }
    })
    

    const handleGetOtp = async (data) => {
        try {
            await getOtp(data, {
                onSuccess: (res) => {
                    if (res.statusCode === 200) {
                        formik.resetForm()
                        setResponseData(res.data)
                        setStep(2)
                    }
                    
                }
            })
        } catch (error) {
            toast.error(error?.message)
        }
    }


    

    
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-sm ">
                {step === 1 ? <GetOtpForm formik={formik} isLoading={isGettingOtp} /> : step === 2 ? <CheckOtpForm responseData={responseData} onStep={setStep} onResendOtp={()=>handleGetOtp({phoneNumber:responseData.phoneNumber})
                } /> : null}
            </div>
        </div>
    );
}

export default page;