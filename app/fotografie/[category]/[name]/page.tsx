import fs from 'fs';
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
    const thumbsPath = path.join(process.cwd(), 'public', 'photos', category, name, 'thumbs');
    if (!fs.existsSync(thumbsPath)) {
        notFound();
    }

    const files = fs
        .readdirSync(thumbsPath)
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/.test(file));

    return files.map((file) => ({
        src: `/photos/${category}/${name}/thumbs/${file}`,
        alt: file,
        full: `/photos/${category}/${name}/${file}`
    }));
}

export default async function Album({ params }: PageProps) {
    const photos = await getPhotos(params.category, params.name);
    return <AlbumGallery photos={photos} albumName={params.name} />;
}