'use client';

interface IntroVideoProps {
  videoUrl: string;
  poster?: string;
  altText?: string;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ videoUrl }) => {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-lg">
      <video
        className="w-full h-auto"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
        controls
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntroVideo;
