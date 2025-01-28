import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Photo {
    src: string;
    alt: string;
}

async function getPhotos(category: string, name: string): Promise<Photo[]> {
    const photoPath = path.join(process.cwd(), 'public', 'photos', category, name);
    if (!fs.existsSync(photoPath)) {
        notFound();
    }

    const photos = fs
        .readdirSync(photoPath)
        .filter((file) => /\.(jpg|jpeg|png|gif)$/.test(file))
        .map((file) => ({
            src: `/photos/${category}/${name}/${file}`,
            alt: file,
        }));

    return photos;
}

export default async function Album({ params }: { params: { category: string; name: string } }) {
    const photos = await getPhotos(params.category, params.name);

    return (
        <div className="min-h-screen bg-[#222222] text-white p-10">
            <h1 className="text-4xl font-bold mb-8">{params.name}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo) => (
                    <div key={photo.src} className="relative aspect-square">
                        <Image
                            src={photo.src}
                            alt={photo.alt}
                            fill
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}