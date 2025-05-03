"use client";

import { motion } from "framer-motion";

function Poster() {
  return (
    <div className="w-full py-10 flex justify-center">
      <motion.div
        className="text-center w-2/3 border p-6 rounded-tl-3xl rounded-br-3xl shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1 className="text-4xl font-bold mb-4">History of Perfume</h1>
        <p className="mb-6 text-lg">
          We are passionate about perfumes and dedicated to providing you with
          the best fragrance experience.
        </p>
        <motion.button
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition duration-300"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
        >
          Discover More
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Poster;
