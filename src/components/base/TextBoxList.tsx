'use client';
import React, { useEffect, useRef } from 'react';
import { Truck, Percent, RefreshCw, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const texts = [
  {
    text: 'Free ship cho tất cả đơn hàng',
    icon: <Truck className="w-6 h-6 mr-4 text-blue-500" />
  },
  {
    text: 'Giảm giá 5% cho bill trên 2 triệu',
    icon: <Percent className="w-6 h-6 mr-4 text-green-500" />
  },
  {
    text: 'Hoàn trả trong 7 ngày',
    icon: <RefreshCw className="w-6 h-6 mr-4 text-orange-500" />
  },
  {
    text: 'Cam kết chính hãng 100%',
    icon: <Shield className="w-6 h-6 mr-4 text-red-500" />
  }
];

const TextPageSections: React.FC = () => {
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    sectionsRef.current.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto py-20 px-4 grid grid-cols-1 md:grid-cols-2 gap-10">
      {texts.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            if (el) {
              sectionsRef.current[index] = el;
            }
          }}
          className="p-8 rounded-xl shadow-xl text-xl text-center flex items-center border"
        >
          {item.icon}
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default TextPageSections;
