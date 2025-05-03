"use client";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";

type StatsCardProps = {
  end: number;
  suffix?: string;
  label: string;
};

export default function StatsCard({ end, suffix = "", label }: StatsCardProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });
  const [start, setStart] = useState(false);

  useEffect(() => {
    if (inView) {
      setStart(true);
    }
  }, [inView]);

  return (
    <div ref={ref} className="p-6 border rounded-xl shadow-md text-center w-48">
      <div className="text-3xl font-bold">
        {start ? <CountUp end={end} duration={2} suffix={suffix} /> : "0"}
      </div>
      <div className="mt-2 text-sm">{label}</div>
    </div>
  );
}
