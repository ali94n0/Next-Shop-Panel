"use client"

import { useParams } from "next/navigation";

function page() {
    const {id}=useParams()
    return (
        <div>
            edit user with id : {id}
        </div>
    );
}

export default page;