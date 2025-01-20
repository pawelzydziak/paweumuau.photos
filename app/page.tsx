"use client";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
    return (<div className="flex">

            <div className="min-h-screen w-1/2 bg-[#222222] flex justify-center items-center">
                <div className="flex flex-col max-w-xs">
                    <div className="text-white py-3  text-5xl  font-bold font-sans  text-nowrap">Paweł Żydziak</div>
                    <text className="text-white text-opacity-70 py-3  mb-10 font-light font-sans text-center">Inspirujący cytat.
                    </text>
                    <Link
                        href="/fotografie"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md text-2xl font-semibold font-mono mb-4 text-center"
                    >
                        Fotografie
                    </Link>
                    <Link
                        href="/muzyka"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md text-2xl font-semibold font-mono mb-4 text-center"
                    >
                        Muzyka
                    </Link>
                    <Link
                        href="/kontakt"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md text-2xl font-semibold font-mono text-center"
                    >
                        Kontakt
                    </Link>
                </div>

            </div>
            <div className="w-1/2 max-h-screen">
                <img className="object-cover w-full h-full" src="/photos/mainpage-cover.jpg" alt="cover"/>
            </div>
        </div>
    );
}
