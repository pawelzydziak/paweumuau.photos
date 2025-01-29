import fs from 'fs';
import path from 'path';
import AlbumGallery from './AlbumGallery';
import {notFound} from "next/navigation";

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
    return <AlbumGallery photos={photos} albumName={params.name} />;
}