import Image from "next/image";
import { Poppins } from "next/font/google";

import {cn} from '@/lib/utils'
import Link from "next/link";

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800']
});

export const Logo = () => { 
    return (
        <Link href="/">
            <div className="flex items-center gap-x-4 hover:opacity-75">
                <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shirnk">
                    <div className="bg-white rounded-full p-1">
                    <Image src="/ghost.svg" alt="Logo" width={32} height={32} />
                </div>
            </div>
            <div className={cn(font.className, "hidden lg:flex flex-col")}>
                <p className="text-xl font-semibold">
                    coiner
                </p>
                <p className="text-xs text-muted-foreground">
                    let&apos;s play the game
                </p>
            </div>
            </div>
        </Link>
    )
}