import Link from "next/link";
export default function Fotografie() {
    return (
        <div className="flex flex-col md:flex-row h-screen">

            <div className="w-full md:w-1/2 max-h-screen">
                <img
                    className="object-cover w-full h-full"
                    src="/photos/meta/fotografie-cover.jpg"
                    alt="cover"
                />
            </div>
            <div className="flex flex-col w-full md:w-1/2 bg-[#222222] justify-center items-center p-10 space-y-8">
                <div className="flex flex-col max-w-xs">
                    <div className="text-white py-3  text-5xl  font-bold font-sans text-center text-nowrap">Portfolio</div>
                    <text
                        className="text-white text-opacity-70 py-3  mb-10 font-light font-sans text-center">Poniżej znajdują się przyciski odsyłające do stron z albumami.
                    </text>
                    <Link
                        href="/fotografie/polska"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md  font-semibold font-mono text-center mb-8"
                    >
                        WYCIECZKI PO POLSCE
                    </Link>
                    <Link
                        href="/fotografie/zagranica"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md font-semibold font-mono mb-8 text-center"
                    >
                        WYCIECZKI ZAGRANICZNE
                    </Link>
                    <Link
                        href="/fotografie/inne"
                        className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md font-semibold font-mono mb-12 text-center"
                    >
                        INNE
                    </Link>





                </div>
            </div>
        </div>
    );

}
