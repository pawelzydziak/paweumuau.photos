'use client'; //client component

import { useState } from 'react';
import Image from 'next/image';
import styled from 'styled-components';

interface Photo {
    src: string;
    alt: string;
    full: string;
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

export default function AlbumGallery({ photos, albumName }: { photos: Photo[]; albumName: string }) {
    const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

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

    return (
        <GalleryContainer onKeyDown={handleKeyDown} tabIndex={0}>
            <Title>{albumName}</Title>
            <Grid>
                {photos.map((photo, index) => (
                    <PhotoContainer key={photo.src} onClick={() => setActivePhotoIndex(index)}>
                        <Image src={photo.src} alt={photo.alt} fill className="object-cover rounded-lg"/>
                    </PhotoContainer>
                ))}
            </Grid>

            {activePhotoIndex !== null && (
                <Overlay onClick={closePhoto}>
                    <Button onClick={(e) => { e.stopPropagation(); showPrevPhoto(); }}>←</Button>
                    <Button onClick={(e) => { e.stopPropagation(); showNextPhoto(); }}>→</Button>
                    <FadeInImage src={photos[activePhotoIndex].full} alt={photos[activePhotoIndex].alt} fill />
                </Overlay>
            )}
        </GalleryContainer>
    );
}