"use client";

import { useRouter } from "next/navigation";

export default function PhotoViewer({ photo }: { photo: string }) {
    useRouter();
    return (
        <div
            className="fixed inset-0 bg-black flex items-center justify-center"
        >
            <img src={photo} alt="Full View" className="max-w-full max-h-full" />
        </div>
    );
}
