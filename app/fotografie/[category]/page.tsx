import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import {log} from "node:util";

interface Album {
  name: string;
  cover: string;
}

async function getAlbums(category: string): Promise<Album[]> {
  const categoryPath = path.join(process.cwd(), 'public', 'photos', category);
  const albums = fs
      .readdirSync(categoryPath, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => ({
        name: dirent.name,
        cover: `/photos/${category}/${dirent.name}/meta/cover.jpg`,
}));
  log(albums.toString());
  return albums;
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const albums = await getAlbums(params.category);

  return (
      <div className="min-h-screen bg-[#222222] text-white p-10">
        <h1 className="text-4xl font-bold mb-8">{params.category}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {albums.map((album) => (
              <Link
                  key={album.name}
                  href={`/fotografie/${params.category}/${album.name}`}
                  className="group relative block"
              >
                <Image
                    src={album.cover}
                    alt={album.name}
                    width={300}
                    height={200}
                    className="object-cover w-full h-48 group-hover:blur-sm transition"
                />
                  {album.cover}
                <span className="absolute inset-0 flex justify-center items-center text-xl font-semibold bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition">
                    {album.name}
                </span>
              </Link>
          ))}
        </div>
      </div>
  );
}
