import { getAlbums } from './getAlbums';
import CategoryGrid from './CategoryGrid';

interface PageProps {
    params: {
        category: string;
    };
}

export default async function CategoryPage({ params }: PageProps) {
    const { category } = params;
    const albums = await getAlbums(category);

    return <CategoryGrid albums={albums} category={category} />;
}
