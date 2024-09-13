import Link from "next/link";


function Header() {
    return (
        <header className="bg-secondary-0 sticky top-0 right-0 left-0 shadow-xl px-2 mb-8">
            <nav className="flex items-center py-2">
                <ul className="flex items-center gap-x-8 w-full text-secondary-700">
                    <li className="cursor-pointer p-2 hover:text-primary-800">
                        <Link href={"/"}>خانه</Link>
                    </li>
                    <li className="cursor-pointer p-2 hover:text-primary-800">
                        <Link href={"/auth"}>ورود</Link>
                    </li>
                    <li className="cursor-pointer p-2 hover:text-primary-800">
                        <Link href={"/profile"}>پروفایل</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;