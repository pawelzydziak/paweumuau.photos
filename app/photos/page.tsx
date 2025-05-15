import Image from 'next/image';
import Link from "next/link";

const categories = [
    { name: 'polska', label: 'WYCIECZKI PO POLSCE' },
    { name: 'zagraniczne', label: 'WYCIECZKI ZAGRANICZNE' },
    { name: 'inne', label: 'INNE' },
];

export default function PhotosPage() {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full md:w-1/2 max-h-screen">
                <Image
                    src="/optimized/meta/fotografie-cover.webp"
                    alt="cover"
                    width={768}
                    height={1024}
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="flex flex-col w-full md:w-1/2 bg-[#222222] justify-center items-center p-10 space-y-8">
                <div className="text-white   text-5xl  font-bold font-sans text-center text-nowrap">Portfolio</div>
                <p
                    className="text-white text-opacity-70 py-3  mb-10 font-light font-sans text-center">Poniżej znajdują
                    się przyciski odsyłające do stron z albumami.
                </p>

                {/*items-center for having the buttons different sizes - more like on adobe portfolio*/}
                <div className="flex flex-col items-stretch space-y-6">
                    {categories.map((category) => (
                        <Link
                            key={category.name}
                            href={`/photos/${category.name}`}
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