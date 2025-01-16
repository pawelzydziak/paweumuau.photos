"use client";
import Link from "next/link";

export default function AlbumGrid({ category }: { category: string }) {
    const basePath = `/photos/${category}`;
    const albums = getAlbums(basePath); // Replace with real fetching logic

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {albums.map((album) => (
                    <Link
                        key={album.name}
                href={`/fotografie/album/${album.name}`}
    className="relative group"
    >
    <img
        src={`${basePath}/${album.name}/cover.jpg`}
    alt={album.name}
    className="w-full h-48 object-cover rounded-lg shadow-md"
    />
    <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-lg text-white font-semibold">
        {album.name}
        </div>
        </Link>
))}
    </div>
);
}

function getAlbums(path: string) {
    // Mock data: Replace this with real server-side or dynamic fetching logic
    return [
        { name: "norwegia" },
        { name: "berlin" },
        { name: "wlochy" },
    ];
}
