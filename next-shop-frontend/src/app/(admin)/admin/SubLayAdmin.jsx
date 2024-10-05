"use client"

import { useState } from 'react';
import SideBarAdmin from './SideBarAdmin';

function SubLayAdmin({children}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    return (
        <div className="grid grid-cols-15 h-screen">
			<SideBarAdmin isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            <div className={`${isSidebarOpen ? "col-span-12" : "col-span-14"} overflow-y-scroll p-4 transition-all duration-700 ease-in-out`}>{children}
            </div>
		</div>
    );
}

export default SubLayAdmin;