import Link from "next/link";

export default function Album({ params }: { params: { id: string } }) {
    const photos = getPhotos(`/photos/zagraniczne/${params.id}`); // Replace with actual fetching

    return (
        <div className="min-h-screen p-8">
            <h1 className="text-2xl font-bold mb-6 capitalize">{params.id}</h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                    <Link key={index} href={`/fotografie/album/${params.id}/photo/${index}`}>
                        <img
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg shadow-md"
                        />
                    </Link>
                ))}
            </div>
        </div>
    );
}

function getPhotos(path: string) {
    // Replace with dynamic fetching logic
    return ["/photo1.jpg", "/photo2.jpg", "/photo3.jpg"];
}
