'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Album {
    name: string;
    displayName: string;
    cover: string;
}

interface CategoryGridProps {
    albums: Album[];
    category: string;
}

export default function CategoryGrid({ albums, category }: CategoryGridProps) {
    const router = useRouter();
    const [loadingAlbum, setLoadingAlbum] = useState<string | null>(null);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, albumName: string) => {
        e.preventDefault();
        setLoadingAlbum(albumName);
        router.push(`/photos/${category}/${albumName}`);
    };

    return (
        <div className="min-h-screen bg-[#222222] text-white p-10">
            <h1 className="text-4xl font-bold mb-8 capitalize">{category}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {albums.map(({ name, displayName, cover }) => (
                    <Link
                        key={displayName}
                        href={`/photos/${category}/${name}`}
                        onClick={(e) => handleClick(e, name)}
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

                        {/* Loading spinner */}
                        {loadingAlbum === name && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-md">
                                <div className="h-8 w-8 border-4 border-white border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}