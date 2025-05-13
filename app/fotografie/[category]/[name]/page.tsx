import fs from 'fs/promises';
import path from 'path';
import AlbumGallery from './AlbumGallery';
import { notFound } from 'next/navigation';

interface Photo {
    src: string;
    alt: string;
    full: string;
}

interface PageProps {
    params: {
        category: string;
        name: string;
    };
}

async function getPhotos(category: string, name: string): Promise<Photo[]> {
    const albumDirectory = path.join(process.cwd(), 'public', 'photos', category, name);
    const thumbsPath = path.join(process.cwd(), 'public', 'thumbs', category, name);

    try {
        await fs.access(albumDirectory);
        await fs.access(thumbsPath);
    } catch (error) {
        notFound();
    }

    const files = (await fs.readdir(thumbsPath))
        .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));

    const photos: Photo[] = files.map((file) => ({
        src: `/thumbs/${category}/${name}/${file}`,
        alt: file,
        full: `/photos/${category}/${name}/${file}`
    }));

    return photos;
}

export default async function Album({ params }: PageProps) {
    const { category, name } = params;
    const photos = await getPhotos(category, name);

    return <AlbumGallery photos={photos} albumName={name} />;
}
