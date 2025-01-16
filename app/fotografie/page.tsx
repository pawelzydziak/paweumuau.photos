import AlbumGrid from "./AlbumGrid";

export default function Fotografie() {
    const categories = ["polskie", "zagraniczne", "inne"];

    return (
        <div className="min-h-screen p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Fotografie</h1>
    {categories.map((category) => (
        <div key={category} className="mb-12">
    <h2 className="text-2xl font-semibold mb-4 capitalize">{category}</h2>
        <AlbumGrid category={category} />
    </div>
    ))}
    </div>
);
}
