import Image from "next/image";
import { Poppins } from "next/font/google";

import {cn} from '@/lib/utils'

const font = Poppins({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700', '800']
});

export const Logo = () => { 
    return (
        <div className="flex flex-col items-center gap-y-2">
            <div className="bg-white rounded-full p-1">
                <Image src="/ghost.svg" alt="Logo" width={80} height={80} />
            </div>
            <div className="flex flex-col items-center">
                <p className={cn("text-2xl font-semibold", font.className)}>
                    coiner
                </p>
                <p className={cn("text-sm text-muted-foreground", font.className)}>
                    Lets play the game 
                </p>
            </div>
        </div>
    )
}