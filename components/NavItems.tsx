'use client';


import { cn } from "@/lib/utils";
import Link from "next/link"
import { usePathname } from "next/navigation"

const navItems = [
    { lable: 'Home', href: '/' },
    { lable: 'Companions', href: '/companions' },
    { lable: 'My Journey', href: 'my-journey' },
]



const NavItems = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({lable,href}) =>(
                <Link href={href} key={lable} className={ cn(pathname === href && 'text-primary font-semibold' )}>
                    {lable}
                </Link>
            )
            
            )}

        </nav>
        
    )
}

export default NavItems