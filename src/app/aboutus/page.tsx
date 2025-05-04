"use client";
import Image from "next/image";
import { motion } from "framer-motion"; // thêm framer-motion

export default function AboutUs() {
    return (
        <div className="font-sans">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="flex flex-col items-center justify-center h-screen text-center text-red-500"
            >
                <h3 className="text-6xl md:text-9xl font-serif tracking-wide">HISTORY OF</h3>
                <h3 className="text-6xl md:text-9xl font-serif tracking-wide">AM PERFUME</h3>
            </motion.div>

            {/* Intro section */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col md:flex-row justify-between items-start p-8 gap-8"
            >
                {/* Left content */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="md:w-1/3 space-y-4"
                >
                    <p className="italic text-sm ">exclusive fragrance</p>
                    <h1 className="text-5xl md:text-6xl font-black leading-none">
                        AMOUR <br /> PARFUM
                    </h1>
                    <p>
                        Discover the essence of luxury with Am Perfume. Crafted from the rarest flowers and spices, our scents
                        embody sophistication and timeless elegance. A fragrance that lingers, a memory that stays.
                    </p>
                    <button className="px-6 py-3 font-bold uppercase border transition">Buy Now!</button>
                </motion.div>

                {/* Middle image */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="md:w-1/3 flex justify-center"
                >
                    <Image
                        width={400}
                        height={400}
                        src="/img/dior.png"
                        alt="Perfume Bottle"
                        className="max-h-[400px] object-contain drop-shadow-xl"
                    />
                </motion.div>

                {/* Right info box */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="md:w-1/3 border p-8 md:p-12 space-y-6 rounded-lg shadow-lg"
                >
                    <div>
                        <p className="uppercase font-bold ">NOTES</p>
                        <p className="text-sm ">Top, heart, base</p>
                        <div className="flex items-start justify-between border-b pb-2 gap-4">
                            <span className="text-4xl font-bold ">Floral</span>
                            <p className="text-sm max-w-xs">
                                Featuring jasmine, rose, and sandalwood blended into a harmonious scent trail.
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="uppercase font-bold ">LONGEVITY</p>
                        <p className="text-sm ">Duration on skin</p>
                        <div className="flex items-start justify-between border-b pb-2 gap-4">
                            <span className="text-4xl font-bold ">8 Hrs</span>
                            <p className="text-sm max-w-xs">
                                Stays with you from morning till night with elegant fading transitions.
                            </p>
                        </div>
                    </div>
                    <div>
                        <p className="uppercase font-bold ">OCCASION</p>
                        <p className="text-sm ">Perfect moments</p>
                        <div className="flex items-start justify-between pb-2 gap-4">
                            <span className="text-4xl font-bold ">Evening</span>
                            <p className="text-sm max-w-xs">
                                Ideal for romantic dinners, special events, and unforgettable evenings.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Overview section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="flex flex-col md:flex-row items-start justify-center gap-10 p-10"
            >
                {/* Left: Video/Photo */}
                <motion.div
                    initial={{ x: -100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/3 md:pr-6 md:border-r md:border-gray-300"
                >
                    <Image
                        src="/img/history.jpg"
                        alt="Master Perfumer"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-md object-cover"
                    />
                    <h2 className="mt-4 text-3xl font-bold">Hear it from our</h2>
                    <h2 className="text-3xl font-bold">Master Perfumer</h2>
                    <h2 className="text-3xl font-bold">Amélie Moreau</h2>
                </motion.div>

                {/* Right: Description */}
                <motion.div
                    initial={{ x: 100, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1 }}
                    className="w-full md:w-1/3 md:pl-6"
                >
                    <p className="text-lg leading-relaxed mb-4">
                        Every drop of AM Perfume is an ode to beauty and grace. Inspired by the timeless romance of Parisian
                        gardens, it captures the delicate balance between light florals and sensual depth.
                    </p>
                    <h3 className="text-2xl font-bold mb-2">STYLE</h3>
                    <p className="text-lg leading-relaxed mb-4">
                        Crafted for modern elegance, blending tradition and innovation. Suitable for both casual and formal wear.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Indulge in a signature scent that enhances your natural charm and leaves a lasting impression wherever you
                        go.
                    </p>
                </motion.div>
            </motion.div>

            {/* Video */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full flex justify-center p-4"
            >
                <iframe
                    className="w-full md:w-[80%] h-72 md:h-[515px] rounded-lg shadow-lg"
                    src="https://www.youtube.com/embed/8DL7LqVPlp0?si=-RLq_EkkZBny7hoM"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                ></iframe>
            </motion.div>

            {/* Map */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="w-full flex justify-center mt-10 p-4"
            >
                <iframe
                    className="w-full md:w-[90%] h-72 md:h-[450px] rounded-lg shadow-lg"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2427.4504799936117!2d13.395979712137137!3d52.52528323572197!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851e6e4d7096b%3A0x25eb7ff988325f6e!2sThe%20Different%20Scent%20Perfumery!5e0!3m2!1svi!2s!4v1746337080958!5m2!1svi!2s"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </motion.div>
        </div>
    );
}
