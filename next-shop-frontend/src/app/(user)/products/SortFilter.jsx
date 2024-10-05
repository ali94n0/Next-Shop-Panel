"use client"

import RadioInput from "@/common/RadioInput";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { HiOutlineChevronUp } from "react-icons/hi";

const sortOption = [
    { id: 1, label: "جدیدترین", value: "latest" },
    { id: 2, label: "قدیمترین", value: "earliest" },
    {id:3,label:"محبوب ترین",value:"popular"},
]

function SortFilter() {
    const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
    const [isOpen, setIsOpen] = useState(true)
    const [sort, setSort] = useState("")


    useEffect(() => {
        setSort(searchParams.get("sort") || "")
    },[searchParams])

    const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
    
    const handleChange = (e) => {
        const value = e.target.value;
        setSort(value)
        router.push(pathname + "?" + createQueryString("sort",value))

    }

    return (
        <div className='flex flex-col rounded-lg shadow-lg mt-6 '>
            <div className='flex items-center justify-between py-2 px-4 w-full text-secondary-600'>
                <p className="text-sm md:text-md font-bold">مرتب سازی</p>
                <HiOutlineChevronUp className={`w-5 h-5 stroke-current cursor-pointer transition-all duration-500 ease-in-out ${!isOpen && "rotate-180"}`} onClick={()=>setIsOpen(prev=>!prev)} />
            </div>
            <div className={`flex ${!isOpen && "hidden"} transition-all duration-500 ease-in-out border-t border-secondary-50/10`}>
                <ul className="flex flex-col gap-y-2 py-2 px-4">
                    {/* map on sortObj that we get on Api */}
                    {sortOption.map(item => <RadioInput key={item.id} label={item.label} value={item.value} name={item.value} id={item.value} onChange={handleChange} checked={sort === item.value} />)}
                                
                </ul>
            </div>
        </div>
    );
}

export default SortFilter;