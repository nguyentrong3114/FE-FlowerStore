"use client";

import { motion } from "framer-motion";
import { gsap } from "gsap";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { FaPinterest, FaFacebookF, FaTwitter } from "react-icons/fa";

interface PerfumeDetail {
  id: string;
  name: string;
  brand: string;
  price: number;
  images: string[];
  description: string;
  category: string;
  notes: {
    top: string[];
    middle: string[];
    base: string[];
  };
  size: string;
  rating: number;
  reviews: number;
}

// Tách rating ra để tái sử dụng
const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <motion.svg
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
        whileHover={{ scale: 1.2 }}
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </motion.svg>
    ))}
  </div>
);

export default function PerfumeDetailPage() {
  const { id } = useParams();
  const [perfume, setPerfume] = useState<PerfumeDetail | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Fake fetch data by ID
  useEffect(() => {
    if (!id) return;

    // You can replace this with fetch(`/api/perfume/${id}`)
    setPerfume({
      id: id as string,
      name: "Bleu de Chanel",
      brand: "Chanel",
      price: 150,
      images: [
        "https://www.chanel.com/images//t_one//w_0.51,h_0.51,c_crop/q_auto:good,f_autoplus,fl_lossy,dpr_1.1/w_1020/bleu-de-chanel-eau-de-parfum-spray-3-4fl-oz--packshot-default-107360-9564894232606.jpg",
        "https://www.chanel.com/images//t_one/t_fnbedito//q_auto:good,f_auto,fl_lossy,dpr_1.1/w_1020/bleu-de-chanel-eau-de-parfum-spray-3-4fl-oz--packshot-alternative-v1-107360-9533808082974.jpg",
        "/img/perfume3.jpg"
      ],
      description:
        "A woody aromatic fragrance for the modern man. The scent opens with fresh citrus notes, followed by a heart of labdanum and a base of sandalwood and cedar.",
      category: "Eau de Parfum",
      notes: {
        top: ["Citrus", "Mint", "Pink Pepper"],
        middle: ["Labdanum", "Ginger", "Iso E Super"],
        base: ["Sandalwood", "Cedar", "Amber"]
      },
      size: "100ml",
      rating: 4.8,
      reviews: 1245
    });
  }, [id]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-content", {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      });

      gsap.from(".note-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5
      });
    });

    return () => ctx.revert();
  }, []);

  if (!perfume) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <Image
                src={perfume.images[selectedImage]}
                alt={perfume.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex gap-4 mt-4">
              {perfume.images.map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden cursor-pointer ${
                    selectedImage === index ? "ring-2 ring-primary" : ""
                  }`}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedImage(index)}
                >
                  <Image
                    src={image}
                    alt={`${perfume.name} - Image ${index + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold mb-2">{perfume.name}</h1>
            <p className="text-xl text-gray-600 mb-4">{perfume.brand}</p>

            <div className="flex items-center gap-2 mb-6">
              <StarRating rating={perfume.rating} />
              <span className="text-sm text-gray-600">
                ({perfume.reviews} reviews)
              </span>
            </div>

            <p className="text-2xl font-bold mb-6">${perfume.price}</p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-600">{perfume.description}</p>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border rounded-lg">
                <button
                  className="px-4 py-2 text-lg"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="px-4 py-2">{quantity}</span>
                <button
                  className="px-4 py-2 text-lg"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>
              <motion.button
                className="flex-1 bg-black text-white px-8 py-3 rounded-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Add to Cart
              </motion.button>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Size Guide</h3>
              <div className="flex gap-4">
                {["30ml", "50ml", "100ml"].map((size) => (
                  <button
                    key={size}
                    className={`px-4 py-2 border rounded-lg ${
                      perfume.size === size ? "border-black" : ""
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="p-2 rounded-full bg-gray-100">
                <FaFacebookF />
              </button>
              <button className="p-2 rounded-full bg-gray-100">
                <FaTwitter />
              </button>
              <button className="p-2 rounded-full bg-gray-100">
                <FaPinterest />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Notes Section */}
      <section className="py-12 ">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Fragrance Notes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {["Top", "Middle", "Base"].map((layer) => (
              <motion.div
                key={layer}
                className="note-item p-6 rounded-lg shadow-sm"
                whileHover={{ y: -5 }}
              >
                <h3 className="text-lg font-semibold mb-4">{layer} Notes</h3>
                <div className="flex flex-wrap gap-2">
                  {perfume.notes[layer.toLowerCase() as keyof typeof perfume.notes].map((note, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews & Related Products (Placeholder) */}
      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Customer Reviews</h2>
        <div className="space-y-6">{/* Review items */}</div>
      </section>

      <section className="py-12">
        <h2 className="text-3xl font-bold mb-8">Related Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">{/* Related grid */}</div>
      </section>
    </div>
  );
}
