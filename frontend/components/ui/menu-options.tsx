import { BadgePlus, LibraryBig } from "lucide-react";
import Link from "next/link";

export default function MenuOptions() {
    return (
        <>
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <BadgePlus className="h-4 w-4" />
                Create Script
            </Link>
            <Link
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
                <LibraryBig className="h-4 w-4" />
                Generated Scripts
            </Link>
        </>
    );
}