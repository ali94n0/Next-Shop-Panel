"use client"

import Loader from "@/common/Loader";
import { useCheckOtp } from "@/hooks/useOtp";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineBackspace, HiOutlinePencilAlt } from "react-icons/hi";
import OtpInput from 'react-otp-input';
import { useRouter } from 'next/navigation'

const routesByRoles = {
    "USER": "profile",
    "ADMIN":"admin"
}



const resendTime = 10
function CheckOtpForm({responseData,onStep,onResendOtp}) {
    const [otp, setOtp] = useState('');
    const [time, setTime] = useState(responseData.expiresIn / 1000 || resendTime)
    const {mutate:checkOtp,isPending:isCheckingOtp}=useCheckOtp()
    const router = useRouter()

    useEffect(() => {
        const timer = time > 0 && setInterval(() => {
            setTime(t=>t-1)
        }, 1000)
        
        return () => {
            if(timer) clearInterval(timer)
        }
    }, [time])
    
    const handleCheckOtp = async () => {
        try {
            await checkOtp({ phoneNumber: responseData.phoneNumber.toString(), otp }, {
                onSuccess: ({data:{user},statusCode}) => {
                    if (statusCode === 200) {
                        if (!user.isActive) {
                            router.push("/complete-profile")
                        }
                        else {
                            router.push(`/${routesByRoles[user.role]}`)
                        }
                    }
                    
                }
            })
        } catch (error) {
            toast.error(error?.message)
        }
    }

    return (
        <div className="p-4 sm:rounded-md sm:shadow-lg">
            <div className="flex flex-col gap-y-4">
                <button className='btn btn__secondary flex items-center gap-x-2 text-error w-fit' onClick={()=>onStep(1)}>
                    <HiOutlineBackspace className="rotate-180 w-5 h-5 stroke-current stroke-2" />
                    بازگشت
                </button>
                <div className="flex items-center bg-secondary-50/20 rounded-md justify-between p-2 text-xs text-secondary-500">
                    <p>{responseData.message}</p>
                    <button className="text-primary-700" onClick={()=>onStep(1)}>
                        <HiOutlinePencilAlt className="w-6 h-6 stroke-current stroke-2"/>
                    </button>
                </div>
                <div className="px-2">
                    <span className="text-xs text-secondary-500">کد را وارد کنید :</span>
                    <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span className="text-xxs text-secondary-300">-</span>}
                        renderInput={(props) => <input type="number" {...props} />}
                        inputType={"tel"}
                        containerStyle={"flex flex-row-reverse item-center justify-center w-full gap-x-1  text-secondary-300 mt-2"}
                        inputStyle={"textField__style !w-8 !h-8 sm:!w-10 sm:!h-10"}
                    />
                </div>
                <div className="p-2">
                    {time > 0 ? <span className="flex items-center justify-center p-2 bg-warning/10 text-warning text-xs sm:text-sm font-light rounded-md">{time} ثانیه تا ارسال مجدد کد تائید</span> : <button onClick={(e) => {
                        e.preventDefault()
                        onResendOtp()
                        setOtp("")
                        setTime(responseData.expiresIn/1000)
                    }} className="btn btn__secondary text-success/80 w-full p-1.5">ارسال مجدد کد تائید</button>}
                </div>
                {isCheckingOtp ? <Loader width={50} height={25} /> : <button onClick={(e) => {
                    e.preventDefault()
                    handleCheckOtp()
                }} className='btn btn__primary' disabled={otp === "" || time <= 0}>ارسال</button>}
            </div>
        </div>
    );
}

export default CheckOtpForm;