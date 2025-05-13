import Image from 'next/image';

export default function Music() {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <div className="w-full md:w-1/2 max-h-screen">
                <Image
                    src="/photos/meta/muzyka-cover.jpg"
                    alt="cover"
                    className="object-cover w-full h-full"
                    width={500}
                    height={500}
                />
            </div>

            <div className="flex flex-col w-full md:w-1/2 bg-[#222222] justify-center items-center p-10 space-y-8">
                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 w-full">
                    <iframe
                        className="flex-1"
                        allow="autoplay *; encrypted-media *;"
                        frameBorder="0"
                        height="450"
                        sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                        src="https://embed.music.apple.com/pl/artist/paweu/1576606683"
                        loading="lazy"
                    ></iframe>

                    <iframe
                        className="flex-1"
                        src="https://open.spotify.com/embed/artist/5z98sbiLC9ZDmYWZFyC6Fk?utm_source=generator&theme=0"
                        width="100%"
                        height="450"
                        frameBorder="10"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    ></iframe>
                </div>

                {/* YouTube Embed */}
                <div className="w-full">
                    <iframe
                        className="w-full"
                        height="450"
                        src="https://www.youtube.com/embed/xMkdNgOh9eg?si=LciUF_6wyn6zFffF"
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}
