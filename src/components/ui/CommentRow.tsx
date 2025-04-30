'use client';
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Comment from "./Comment";

interface CommentProps {
  name: string;
  username: string;
  message: string;
}

interface InfiniteCommentColumnProps {
  comments: CommentProps[];
  duration?: number;
}

export default function InfiniteCommentColumn({
  comments,
  duration = 10,
}: InfiniteCommentColumnProps) {
  const controls = useAnimation();

  useEffect(() => {
    const animate = async () => {
      while (true) {
        await controls.start({
          y: "-50%",
          transition: { duration, ease: "linear" },
        });
        controls.set({ y: "0%" });
      }
    };
    animate();
  }, [controls, duration]);

  return (
    <div className="overflow-hidden h-[300px]">
      <motion.div animate={controls} className="flex flex-col space-y-4">
        {[...comments, ...comments].map((c, i) => (
          <Comment
            key={i}
            name={c.name}
            username={c.username}
            message={c.message}
          />
        ))}
      </motion.div>
    </div>
  );
}
