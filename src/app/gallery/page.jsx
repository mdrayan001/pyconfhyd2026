'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ASSETS } from '@/conference';
import { Heading, Paragraph } from '@/components/Typography';
import Icon from '@/components/Icon';

export default function GalleryPage() {
    const galleryData = ASSETS.galleryPageImages || {};
    const editions = Object.keys(galleryData).sort().reverse();
    const [activeEdition, setActiveEdition] = useState(editions[0]);
    const [selectedImage, setSelectedImage] = useState(null);

    const activeImages = galleryData[activeEdition] || [];

    return (
        <main className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-12">
                    <Heading tagLevel={1} level={1} className="text-primary-600 dark:text-primary-400 mb-4">
                        PyConf Hyderabad Gallery
                    </Heading>
                    <Paragraph level={2} className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        A visual journey through our previous editions. Relive the moments of learning, networking, and community building.
                    </Paragraph>
                </header>

                {/* Tabs / Folder Selection */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {editions.map((edition) => (
                        <button
                            key={edition}
                            onClick={() => setActiveEdition(edition)}
                            className={`px-8 py-3 rounded-xl font-heading text-lg transition-all duration-300 shadow-md ${activeEdition === edition
                                ? 'bg-primary-600 text-white scale-105'
                                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                                }`}
                        >
                            {edition}
                        </button>
                    ))}
                </div>

                {/* Status Message if Empty */}
                {activeImages.length === 0 && (
                    <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <Paragraph level={2} className="text-gray-400">
                            Stay tuned! Images for the {activeEdition} edition are being uploaded.
                        </Paragraph>
                    </div>
                )}

                {/* Gallery Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {activeImages.map((src, index) => (
                        <div
                            key={index}
                            onClick={() => setSelectedImage(src)}
                            className="group relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border-2 border-primary-500/10 hover:border-primary-500/40 cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={`PyConf Hyderabad ${activeEdition} - Image ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                            {/* Overlay on hover */}
                            <div className="absolute inset-0 bg-primary-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <div className="bg-white/20 backdrop-blur-md p-4 rounded-full border border-white/30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    <Icon name="ArrowCircleRight" className="text-white" size={24} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox / Pop-up */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-6 right-6 text-white hover:text-primary-500 transition-colors p-2 z-60"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <Icon name="Close" size={40} />
                    </button>

                    <div className="relative w-full max-w-6xl h-[80vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={selectedImage}
                            alt="Full Screen View"
                            fill
                            className="object-contain"
                            priority
                        />
                    </div>
                </div>
            )}
        </main>
    );
}
