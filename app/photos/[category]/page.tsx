import Image from 'next/image';
import Link from 'next/link';
import { getAlbums } from './getAlbums';
// export const dynamicParams = true; // This allows runtime resolution
// export const dynamic = 'force-dynamic';

interface PageProps {
    params: {
        category: string;
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = await params;
    const albums = await getAlbums(category);

    return (
        <div className="min-h-screen bg-[#222222] text-white p-10">
            <h1 className="text-4xl font-bold mb-8 capitalize">{category}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {albums.map(({ name, displayName, cover }) => (
                    <Link
                        key={displayName}
                        href={`/photos/${category}/${name}`}
                        className="group relative block overflow-hidden"
                    >
                        <Image
                            src={cover}
                            alt={displayName}
                            width={500}
                            height={300}
                            className="object-cover w-full rounded-md aspect-video"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-500 rounded-md">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {displayName}
                            </div>
                        </div>

                        {/* Spinner visible while clicking */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none active:opacity-100 opacity-0 transition-opacity duration-150 bg-black/60 z-10">
                            <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
