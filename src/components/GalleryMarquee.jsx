'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ASSETS } from '@/conference';
import { Heading } from '@/components/Typography';

const GalleryMarquee = () => {
    const images = ASSETS.galleryImages || [];

    // Duplicate images for infinite loop effect
    const marqueeImages = [...images, ...images];

    return (
        <section id="gallery-highlights" className="py-12 overflow-hidden bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
            <div className="text-center mb-8 px-4">
                <Heading tagLevel={2} level={2} className="text-primary-600 dark:text-primary-400">
                    Previous Edition Highlights
                </Heading>
            </div>

            <div className="relative flex overflow-x-hidden group">
                <div className="flex animate-marquee whitespace-nowrap py-4">
                    {marqueeImages.map((src, index) => (
                        <div key={index} className="mx-4 flex-shrink-0 relative w-72 h-48 md:w-[450px] md:h-[300px] rounded-xl overflow-hidden shadow-lg border-2 border-primary-500/20">
                            <Image
                                src={src}
                                alt={`PyConf Hyderabad previous event ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 300px, 450px"
                            />
                        </div>
                    ))}
                </div>

                {/* Second set for seamless loop handled by animation */}
                <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap py-4">
                    {marqueeImages.map((src, index) => (
                        <div key={index} className="mx-4 flex-shrink-0 relative w-72 h-48 md:w-[450px] md:h-[300px] rounded-xl overflow-hidden shadow-lg border-2 border-primary-500/20">
                            <Image
                                src={src}
                                alt={`PyConf Hyderabad previous event ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 300px, 450px"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-10 text-center">
                <Link
                    href="/gallery"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 transition-colors"
                >
                    View Full Gallery
                </Link>
            </div>
        </section>
    );
};

export default GalleryMarquee;
