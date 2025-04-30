"use client";

import { motion } from "framer-motion";

interface CommentProps {
  name: string;
  username: string;
  message: string;
}

export default function Comment({ name, username, message }: CommentProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.3 }}
      className="bg-white rounded-xl shadow-sm p-6 text-left border border-gray-100 hover:shadow-md transition"
    >
      <p className="text-gray-700 mb-4">&quot;{message}&quot;</p>
      <div className="text-sm text-gray-500 font-medium">
        — {name} <span className="text-gray-400">{username}</span>
      </div>
    </motion.div>
  );
}
