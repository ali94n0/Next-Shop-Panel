"use client"

import Loader from '@/common/Loader';
import { useLogout } from '@/hooks/useUser';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { HiOutlineChevronRight, HiOutlineCollection, HiOutlineHome, HiOutlineIdentification, HiOutlineLogout, HiOutlineViewGrid } from 'react-icons/hi';


const sidebarRoutes = [
    {id:1, label: "صفحه اصلی", url: "/",smallIcon : <HiOutlineHome className='w-4 h-4 stroke-current' />,bigIcon:<HiOutlineHome className='w-4 h-4 md:w-6 md:h-6 stroke-current ' /> },
    {id:2, label: "داشبورد", url: "/profile", smallIcon: <HiOutlineViewGrid className='w-4 h-4 stroke-current' />,bigIcon: <HiOutlineViewGrid className='w-6 h-6 stroke-current ' /> },
    {id:3, label: "اطلاعات کاربری", url: "/profile/me", smallIcon: <HiOutlineIdentification className='w-4 h-4 stroke-current' />,bigIcon: <HiOutlineIdentification className='w-6 h-6 stroke-current ' /> },
    {id:4, label: "سفارشات", url: "/profile/payment", smallIcon: <HiOutlineCollection className='w-4 h-4 stroke-current' />,bigIcon: <HiOutlineCollection className='w-6 h-6 stroke-current ' /> },
]

function SideBar({isSidebarOpen,setIsSidebarOpen}) {
    const{mutate:logOut,isPending:isLogouting}=useLogout()
    const path = usePathname()
    const router=useRouter()

    const handleLogout = async () => {

        
        try {
            await logOut()
            router.push("/",{replace:true})
        } catch (error) {
            toast.error(error?.message)
        }
    }
    
    
    
    return (
        <div className={` ${isSidebarOpen ? "col-span-3" : "col-span-1"} p-2 lg:p-4 border-l border-secondary-50/30 transition-all duration-700 ease-in-out`}>
            <div className='relative h-full transition-all duration-700 ease-in-out'>
            <ul className='flex flex-col text-secondary-500 text-xs lg:text-md transition-all duration-700 ease-in-out'>
                {sidebarRoutes.map(item => <li key={item.id} >
                    <Link href={item.url} className={`flex items-center gap-x-2 px-3 py-2 rounded-md transition-all duration-300 ease-in-out ${isSidebarOpen ? "hover:bg-primary-500 hover:text-white" : "hover:text-primary-500" } ${path === item.url ? "text-primary-500"  :""}`}>
                        {isSidebarOpen ? <>{item.smallIcon} {item.label}</> : item.bigIcon}
                        </Link>
                </li>)}
                    {isLogouting ? <Loader width={40} height={20}/> : <button onClick={()=>handleLogout()} className='flex justify-start items-center gap-x-2 px-3 py-2 rounded-md text-error/70 hover:bg-error/70 hover:text-white transition-all duration-300 ease-in-out'>
                        {isSidebarOpen ? <><HiOutlineLogout className='w-4 h-4 stroke-current' />
                    خروج</> : <HiOutlineLogout className='w-6 h-6 stroke-current' /> }
                    </button>}
            </ul>
            
            <span onClick={() => setIsSidebarOpen(prev => !prev)} className={`flex w-6 h-6 rounded-full items-center justify-center bg-secondary-0 text-secondary-400 border border-secondary-400 absolute -left-7 top-1/2 z-10 transition-all duration-500 ease-in-out cursor-pointer ${!isSidebarOpen ? "rotate-180" : ""} `}>
                <HiOutlineChevronRight className='w-4 h-4 stroke-current stroke-2'/>
                </span>
            
            </div>
        </div>
        
    );
}

export default SideBar;