import fs from 'fs';
import path from 'path';

interface Album {
    name: string;
    cover: string;
}

export async function getAlbums(category: string): Promise<Album[]> {
    const categoryPath = path.join(process.cwd(), 'public', 'photos', category);
    return fs
        .readdirSync(categoryPath, {withFileTypes: true})
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => ({
            name: dirent.name,
            cover: `/photos/${category}/${dirent.name}/meta/cover.jpg`,
        }));
}