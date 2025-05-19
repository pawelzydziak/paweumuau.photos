'use client'; //client component

import {useEffect, useState} from 'react';
import { useSwipeable } from 'react-swipeable';
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

const CloseButton = styled.button`
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 50%;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 51;

    &:hover {
        background: rgba(255, 255, 255, 0.8);
        color: black;
    }
`;

// const PlaceholderImage = styled(Image)`
//     position: absolute;
//     inset: 0;
//     object-fit: contain;
//     z-index: 1;
//     filter: blur(20px);
//     transform: scale(1.05);
// `;

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

const Button = styled.button<{ position: 'left' | 'right' }>`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: white;
    font-size: 2rem;
    z-index: 50;

    ${({ position }) =>
            position === 'left' ? 'left: 1rem;' : 'right: 1rem;'}
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

// const LoadingText = styled.div`
//     position: absolute;
//     color: white;
//     font-size: 1.5rem;
//     z-index: 51;
// `;

export default function AlbumGallery({ photos, albumName }: { photos: Photo[]; albumName: string }) {
    const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
    const [isImageLoading, setIsImageLoading] = useState(false);
    const [loadedPhotos, setLoadedPhotos] = useState<Photo[]>([]);

    const openPhoto = (index: number) => {
        setActivePhotoIndex(index);
        setIsImageLoading(true)
        blockScroll();
        window.history.pushState({ photoOpen: true }, '');
    };

    const showPrevPhoto = () => {
        if (activePhotoIndex === null) return;
        setActivePhotoIndex((prev) => {
            const newIndex = (prev! - 1 + photos.length) % photos.length;
            setIsImageLoading(true);
            return newIndex;
        });
    };

    const showNextPhoto = () => {
        if (activePhotoIndex === null) return;
        setActivePhotoIndex((prev) => {
            const newIndex = (prev! + 1) % photos.length;
            setIsImageLoading(true);
            return newIndex;
        });
    };

    const closePhoto = () => {
        setActivePhotoIndex(null);
        unblockScroll();
        if (window.history.state?.photoOpen) {
            window.history.back();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        const overlayWidth = e.currentTarget.clientWidth;
        const clickX = e.clientX;

        if (clickX < overlayWidth / 2) {
            showPrevPhoto(); // Left half
        } else if (clickX > overlayWidth / 2) {
            showNextPhoto(); // Right half
        }
    };
    function blockScroll() {
        document.body.style.overflow = 'hidden';
    }

    function unblockScroll() {
        document.body.style.overflow = '';
    }
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') closePhoto();
        if (e.key === 'ArrowLeft') showPrevPhoto();
        if (e.key === 'ArrowRight') showNextPhoto();
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: showNextPhoto,
        onSwipedRight: showPrevPhoto,
        trackTouch: true,
        trackMouse: false,
    });

    useEffect(() => {
        const handlePopState = () => {
            if (activePhotoIndex !== null) {
                closePhoto();
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [activePhotoIndex, closePhoto]);

    useEffect(() => {
        const loadPhotos = async () => {
            for (const photo of photos) {
                setLoadedPhotos((prev) => {
                    if (!prev.some((p) => p.src === photo.src)) {
                        return [...prev, photo];
                    }
                    return prev;
                });
                await new Promise((resolve) => setTimeout(resolve, 50));
            }
        };
        loadPhotos();
    }, [photos]);

    return (
        <GalleryContainer onKeyDown={handleKeyDown} tabIndex={0}>
            <Title>{albumName}</Title>
            <Grid>
                {loadedPhotos.map((photo, index) => ( // Changed to use loadedPhotos
                    <PhotoContainer key={photo.src} onClick={() => openPhoto(index)} className="relative aspect-video overflow-hidden rounded-lg">
                        {/* Blurred background */}
                        <Image
                            src={photo.src}
                            alt=""
                            fill
                            className="object-cover blur-xl scale-110 brightness-75"
                            aria-hidden="true"
                        />

                        {/* Actual photo */}
                        <div className="absolute inset-0 flex items-center justify-center">

                                <Image
                                    src={photo.src}
                                    alt={photo.alt}
                                    fill
                                    className="object-contain"
                                    placeholder="blur"
                                    blurDataURL={photo.blurDataURL}
                                />

                        </div>
                    </PhotoContainer>
                ))}
            </Grid>

            {loadedPhotos.length < photos.length && ( // Added spinner for loading thumbnails
                <Spinner />
            )}

            {activePhotoIndex !== null && (
                <Overlay {...swipeHandlers} onClick={
                    (e) => {
                        e.stopPropagation();
                        handleOverlayClick(e);
                    }
                }>
                    <CloseButton onClick={(e) => {
                        e.stopPropagation();
                        closePhoto();
                    }}>
                        ×
                    </CloseButton>

                    <Button position="left" onClick={(e) => { e.stopPropagation(); showPrevPhoto(); }}>←</Button>
                    <Button position="right" onClick={(e) => { e.stopPropagation(); showNextPhoto(); }}>→</Button>

                    {isImageLoading && <Spinner />}

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