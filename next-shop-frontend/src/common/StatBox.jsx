import { e2p, sp } from "@/utils/replaceNumber";


function StatBox({icon,label,details,price=false}) {
    return (
        <div className="col-span-12 grid grid-rows-2 grid-cols-[5rem_1fr] sm:col-span-4 md:col-span-3 shadow-lg hover:shadow-input-focus rounded-md p-2 text-secondary-600 group hover:-translate-y-2 transition-all duration-300 ease-in-out cursor-pointer">
                            {icon}
            <span className="col-span-1 row-span-1 text-sm lg:text-md font-bold group-hover:text-primary-700 flex justify-center">{label}</span>
                            <span className="col-span-1 row-span-1 text-xs sm:text-sm font-light text-secondary-500 group-hover:text-primary-600 flex justify-center mt-2">{price ? `${sp(details)} تومان` : e2p(details)}</span>
                        </div>
    );
}

export default StatBox;