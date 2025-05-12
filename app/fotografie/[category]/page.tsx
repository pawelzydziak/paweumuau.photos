import Image from 'next/image';
import Link from 'next/link';
import { getAlbums } from './getAlbums';

interface PageProps {
    params: {
        category: string;
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const albums = await getAlbums(params.category);
    return (
        <div className="min-h-screen bg-[#222222] text-white p-10">
            <h1 className="text-4xl font-bold mb-8">{params.category}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {albums.map((album) => (
                    <Link
                        key={album.displayName}
                        href={`/fotografie/${params.category}/${album.name}`}
                        className="group relative block"
                    >
                        <Image
                            src={album.cover}
                            alt={album.name}
                            width={500}
                            height={300}
                            className="object-cover w-full rounded-md aspect-video"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-80 transition-all duration-500 rounded-md">
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                {album.displayName}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}