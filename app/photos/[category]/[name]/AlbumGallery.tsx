'use client'; //client component

import {useEffect, useState} from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface Photo {
    src: string;
    alt: string;
    full: string;
    blurDataURL: string;
}

const GalleryContainer = styled.div`
    min-height: 100vh;
    background-color: #222222;
    color: white;
    padding: 10px;
`;

const Title = styled.h1`
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 2rem;
    text-align: center;
    text-transform: capitalize;
`;

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 1rem;

    @media (min-width: 640px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: 768px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media (min-width: 1024px) {
        grid-template-columns: repeat(4, 1fr);
    }
`;

const Spinner = styled.div`
    border: 6px solid rgba(255, 255, 255, 0.2);
    border-top: 6px solid white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
    position: absolute;
    z-index: 52;

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
`;

const PlaceholderImage = styled(Image)`
    position: absolute;
    inset: 0;
    object-fit: contain;
    z-index: 1;
    filter: blur(20px);
    transform: scale(1.05);
`;

const PhotoContainer = styled.div`
    position: relative;
    aspect-ratio: 1;
    cursor: pointer;
`;

const Overlay = styled.div`
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 50;
`;

const Button = styled.button`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 2rem;
    z-index: 50;

    &:first-of-type {
        left: 1rem;
    }

    &:last-of-type {
        right: 1rem;
    }
`;

const FadeInImage = styled(Image)`
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
    animation: fade-in 0.3s ease-in-out;

    @keyframes fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const LoadingText = styled.div`
    position: absolute;
    color: white;
    font-size: 1.5rem;
    z-index: 51;
`;

export default function AlbumGallery({ photos, albumName }: { photos: Photo[]; albumName: string }) {
    const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(false);


    const showPrevPhoto = () => {
        if (activePhotoIndex === null) return;
        setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
    };

    const showNextPhoto = () => {
        if (activePhotoIndex === null) return;
        setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
    };

    const closePhoto = () => setActivePhotoIndex(null);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closePhoto();
        if (e.key === 'ArrowLeft') showPrevPhoto();
        if (e.key === 'ArrowRight') showNextPhoto();
    };

    useEffect(() => {
        if (activePhotoIndex !== null) {
            setIsImageLoading(true);
        }
    }, [activePhotoIndex]);

    return (
        <GalleryContainer onKeyDown={handleKeyDown} tabIndex={0}>
            <Title>{albumName}</Title>
            <Grid>
                {photos.map((photo, index) => (
                    <PhotoContainer key={photo.src} onClick={() => setActivePhotoIndex(index)}>
                        <Image src={photo.src}
                               alt={photo.alt}
                               fill
                               className="object-cover rounded-lg"
                               placeholder="blur"
                               blurDataURL={photo.blurDataURL}
                        />
                    </PhotoContainer>
                ))}
            </Grid>

            {activePhotoIndex !== null && (
                <Overlay onClick={closePhoto}>
                    <Button onClick={(e) => { e.stopPropagation(); showPrevPhoto(); }}>←</Button>
                    <Button onClick={(e) => { e.stopPropagation(); showNextPhoto(); }}>→</Button>

                    {/* Placeholder background */}
                    <PlaceholderImage
                        src={photos[activePhotoIndex].src}
                        alt="Blurred placeholder"
                        fill
                        placeholder="blur"
                        blurDataURL={photos[activePhotoIndex].blurDataURL}
                    />

                    {/* Spinner while loading */}
                    {isImageLoading && <Spinner />}

                    {/* Full image */}
                    <FadeInImage
                        src={photos[activePhotoIndex].full}
                        alt={photos[activePhotoIndex].alt}
                        fill
                        onLoad={() => setIsImageLoading(false)}
                        onLoadingComplete={() => setIsImageLoading(false)}
                        style={{ zIndex: isImageLoading ? 2 : 3 }}
                    />
                </Overlay>
            )}
        </GalleryContainer>
    );
}