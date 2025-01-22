import Link from "next/link";

const categories = [
    { name: 'polska', label: 'WYCIECZKI PO POLSCE' },
    { name: 'zagraniczne', label: 'WYCIECZKI ZAGRANICZNE' },
    { name: 'inne', label: 'INNE' },
];

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
                <div className="text-white   text-5xl  font-bold font-sans text-center text-nowrap">Portfolio</div>
                <text
                    className="text-white text-opacity-70 py-3  mb-10 font-light font-sans text-center">Poniżej znajdują
                    się przyciski odsyłające do stron z albumami.
                </text>

                {/*items-center for having the buttons different sizes - more like on adobe portfolio*/}
                <div className="flex flex-col items-stretch space-y-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/fotografie/${category.name}`}
                            className="bg-stone-50 py-3 px-10 rounded-3xl shadow-md font-semibold text-center"
                        >
                            {category.label}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

}
