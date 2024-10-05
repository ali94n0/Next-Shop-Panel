"use client"
import CheckBox from "@/common/CheckBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { HiOutlineChevronUp } from "react-icons/hi";


function CategoryFilter({categories}) {
    const [isOpen, setIsOpen] = useState(true)
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const [selectedCategories, setSelectedCategories] = useState(searchParams.get("category")?.split(",") || [])

    


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

        if (selectedCategories.includes(value)) {
            const newCategories = selectedCategories.filter(c => c !== value)
            setSelectedCategories(newCategories)
            router.push(pathname + "?" + createQueryString("category",newCategories))

        } else {
            setSelectedCategories([...selectedCategories, value])
            router.push(pathname + "?" + createQueryString("category",[...selectedCategories,value]))
        }
        
    }
    return (
        <div className='flex flex-col rounded-lg shadow-lg'>
            <div className='flex items-center justify-between py-2 px-4 w-full text-secondary-600'>
                <p className="text-sm md:text-md font-bold">دسته بندی‌ها</p>
                <HiOutlineChevronUp className={`w-5 h-5 stroke-current cursor-pointer transition-all duration-500 ease-in-out ${!isOpen && "rotate-180"}`} onClick={()=>setIsOpen(prev=>!prev)} />
            </div>
            <div className={`flex ${!isOpen && "hidden"} transition-all duration-500 ease-in-out border-t border-secondary-50/10`}>
                <ul className="flex flex-col gap-y-2 py-2 px-4">
                    {/* map on categoris that we get on Api */}
                    {!!categories && categories.map(category => <CheckBox key={category._id} label={category.title} value={category.englishTitle} name={"category"} id={category.englishTitle} onChange={handleChange} checked={selectedCategories.includes(category.englishTitle)} />)}
                                
                </ul>
            </div>
        </div>
    );
}

export default CategoryFilter;