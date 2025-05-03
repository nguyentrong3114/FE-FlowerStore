'use client';

interface IntroVideoProps {
  videoUrl: string;
}

const IntroVideo: React.FC<IntroVideoProps> = ({ videoUrl }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={videoUrl}
        autoPlay
        muted
        loop
        playsInline
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default IntroVideo;
