"use client";
import Link from "next/link";
import {FaLinkedin, FaFacebook, FaInstagram, FaYoutube} from "react-icons/fa";

export default function Home() {
    return (<div className="flex flex-col md:flex-row h-screen">
            <div className="flex flex-col w-full md:w-1/2 bg-[#222222] justify-center items-center p-10 space-y-8">
                <div className="flex flex-col max-w-xs">
                    <div className="text-white py-3  text-5xl  font-bold font-sans  text-nowrap">Paweł Żydziak</div>
                    <text
                        className="text-white text-opacity-70 py-3  mb-10 font-light font-sans text-center">Inspirujący
                        cytat.
                    </text>
                    <Link
                        href="/fotografie"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md text-2xl font-semibold font-mono text-center mb-8"
                    >
                        Fotografie
                    </Link>
                    <Link
                        href="/muzyka"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md text-2xl font-semibold font-mono mb-8 text-center"
                    >
                        Muzyka
                    </Link>
                    <Link
                        href="/kontakt"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md text-2xl font-semibold font-mono mb-12 text-center"
                    >
                        Kontakt
                    </Link>

                    <div className="w-full flex py-5 bg-[#222222] text-white">
                        {/* Social Links */}
                        <div className="flex space-x-5">
                            <Link href="https://www.linkedin.com/in/pawelzydziak/" aria-label="LinkedIn">
                                <FaLinkedin size={24} className="hover:text-gray-400"/>
                            </Link>
                            <Link href="https://www.facebook.com/kakejas" aria-label="Facebook">
                                <FaFacebook size={24} className="hover:text-gray-400"/>
                            </Link>
                            <Link href="https://www.instagram.com/paweumuauu/" aria-label="Instagram">
                                <FaInstagram size={24} className="hover:text-gray-400"/>
                            </Link>
                            <Link href="https://www.youtube.com/@paweumuauu" aria-label="YouTube">
                                <FaYoutube size={24} className="hover:text-gray-400"/>
                            </Link>
                        </div>

                        {/* KAWA? Button */}
                        <div>
                            <Link
                                href="https://buycoffee.to/paweu"
                                className=" text-white py-2 px-6  font-bold shadow-md ml-20"
                            >
                                KAWA?
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/2 max-h-screen">
                <img
                    className="object-cover w-full h-full"
                    src="/photos/meta/mainpage-cover.jpg"
                    alt="cover"
                />
            </div>
        </div>
    );
}
