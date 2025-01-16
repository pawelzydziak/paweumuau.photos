import Link from "next/link";

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-300">
            <div className="flex-1 flex justify-center items-center">
                <img
                    src="/photos/asdf.jpg"
                    alt="Main Cover"
                    className="object-cover w-full max-w-md shadow-md"
                />
            </div>
            <div className="flex-1 flex flex-col gap-6 items-center">
                <Link
                    href="/fotografie"
                    className="bg-white py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 text-xl font-semibold"
                >
                    Fotografie
                </Link>
                <Link
                    href="/muzyka"
                    className="bg-white py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 text-xl font-semibold"
                >
                    Muzyka
                </Link>
                <Link
                    href="/kontakt"
                    className="bg-white py-4 px-8 rounded-lg shadow-md hover:bg-gray-200 text-xl font-semibold"
                >
                    Kontakt
                </Link>
            </div>
        </div>
    );
}
