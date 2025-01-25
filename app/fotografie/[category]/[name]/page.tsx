export default function Album({ params }: { params: { name: string } }) {
    return (
        <div className="flex items-center justify-center bg-[#222222] w-full h-screen">
            <div className="bg-white w-2/3 h-1/3 flex items-center justify-center text-center">
                <div> ALBUM TO BE: </div>
                <div className="bg-emerald-500">{params.name}</div>
            </div>
        </div>
    );
}