"use client";

import { motion } from "framer-motion";

import Image from "next/image";

export default function ContactPage() {
  const stores = [
    {
      name: "Flagship Store",
      image: "/img/store1.jpg", // thay link ảnh của bạn
      address: "123 Perfume St, Paris, France",
      description: "Our flagship store located in the heart of Paris.",
    },
    {
      name: "New York Store",
      image: "/img/store2.jpg", // thay link ảnh của bạn
      address: "456 Fragrance Ave, New York, USA",
      description: "Experience luxury fragrances at our NYC location.",
    },
    {
      name: "Tokyo Boutique",
      image: "/img/store3.jpg", 
      address: "789 Aroma Rd, Tokyo, Japan",
      description: "Visit our exclusive boutique in Tokyo.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow px-4 py-16 space-y-16">
        {/* Hero */}
        <section className="text-center space-y-4">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl font-bold"
          >
            Contact Us
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-xl mx-auto text-lg leading-relaxed"
          >
            We’re here to assist you. Reach out to us or visit one of our stores.
          </motion.p>
        </section>

        {/* Contact Form */}
        <section className="max-w-2xl mx-auto space-y-6">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center"
          >
            Send us a message
          </motion.h3>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium">Name</label>
              <input type="text" id="name" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" placeholder="Your Name" />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium">Email</label>
              <input type="email" id="email" className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium">Message</label>
              <textarea id="message" rows={4} className="w-full border rounded px-3 py-2 focus:outline-none focus:ring" placeholder="Your message..."></textarea>
            </div>
            <button type="submit" className="px-6 py-2 border rounded shadow hover:shadow-lg transition-shadow">
              Send Message
            </button>
          </form>
        </section>

        {/* Store Locations */}
        <section className="space-y-8">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-3xl font-bold text-center"
          >
            Our Stores
          </motion.h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {stores.map((store, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.8 }}
                className="border rounded-xl shadow hover:shadow-lg overflow-hidden"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={store.image}
                    alt={store.name}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-4">
                  <h4 className="text-xl font-semibold mb-1">{store.name}</h4>
                  <p className="text-sm italic mb-2">{store.address}</p>
                  <p className="text-base">{store.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
