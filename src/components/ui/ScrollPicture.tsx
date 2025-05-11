'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const imageItems = [
  { src: '/img/intro1.avif', alt: 'Image 1' },
  { src: '/img/intro2.avif', alt: 'Image 2' },
  { src: '/img/intro3.avif', alt: 'Image 3' },
  { src: '/img/intro4.avif', alt: 'Image 4' },
  { src: '/img/intro5.avif', alt: 'Image 5' },
];

const ScrollPicture: React.FC = () => {
  const { scrollY } = useScroll();

  const rawX = useTransform(scrollY, [0, 1000], [0, -300]);
  const x = useSpring(rawX, { stiffness: 80, damping: 18 });

  return (
    <div className="px-4 py-8 w-full mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">AM PERFUME</h1>

      <div className="overflow-hidden">
        <motion.div
          style={{ x }}
          className="flex gap-4"
        >
          {imageItems.map((item, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-[300px] md:w-[500px] aspect-[5/8] overflow-hidden rounded-lg"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover object-center rounded-lg"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ScrollPicture;
