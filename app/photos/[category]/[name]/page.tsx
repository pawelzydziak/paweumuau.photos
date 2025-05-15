import fs from 'fs/promises';
import path from 'path';
import AlbumGallery from './AlbumGallery';
import { notFound } from 'next/navigation';
import sharp from "sharp";

interface Photo {
    src: string;
    alt: string;
    full: string;
    blurDataURL: string;
}

interface PageProps {
    params: {
        category: string;
        name: string;
    };
}

async function generateBlurDataURL(imagePath: string): Promise<string> {
    const buffer = await sharp(imagePath)
        .resize(10) // Very low-res for placeholder
        .webp({ quality: 50 })
        .toBuffer();

    return `data:image/webp;base64,${buffer.toString('base64')}`;
}

async function getPhotos(category: string, name: string): Promise<Photo[]> {
    const albumDirectory = path.join(process.cwd(), 'public', 'photos', category, name);
    const thumbsPath = path.join(process.cwd(), 'public', 'thumbs', category, name);
    const optimizedPath = path.join(process.cwd(), 'public', 'optimized', category, name);

    try {
        await fs.access(albumDirectory);
        await fs.access(thumbsPath);
        await fs.access(optimizedPath);
    } catch{
        notFound();
    }

    const files = (await fs.readdir(thumbsPath))
        .filter((file) => /\.(jpe?g|png|gif|webp)$/i.test(file));

    const photos: Photo[] = await Promise.all(
        files.map(async (file) => {
            const fullPath = path.join(albumDirectory, file);
            const blurDataURL = await generateBlurDataURL(fullPath);
            const thumbnail = path.join(thumbsPath, file);
            const fullImageOptimized =  path.join(optimizedPath, file);

            return {
                src: thumbnail,
                alt: file,
                full: fullImageOptimized,
                blurDataURL,
            };
        })
    );

    return photos;
}

export default async function Album({ params }: PageProps) {
    const { category, name } = params;
    const photos = await getPhotos(category, name);

    return <AlbumGallery photos={photos} albumName={name} />;
}
