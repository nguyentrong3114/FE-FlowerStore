import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";

export default function Light() {
    const { t } = useLanguage();

    return (
        <>
            <div className="relative mt-2 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none flex items-start justify-center z-0">
                    <div
                        className="w-[50vw] h-[40vh]"
                        style={{
                            background: `
                radial-gradient(
                    ellipse at center top,
                    rgba(255,255,255,0.6) 0%,
                    rgba(255,255,255,0.3) 40%,
                    rgba(255,255,255,0) 100%
                )
            `,
                            filter: "blur(160px)",
                            opacity: 1,
                        }}
                    />
                </div>



                <div className="absolute top-3 left-0 w-full z-10 flex justify-center items-center mt-2">
                    <div className="h-2 w-[50vw] bg-[#eeeeee] rounded-full blur-sm transition" />
                    <div className="absolute bg-[#eeeeee] blur-2xl opacity-100 rounded-full" />
                </div>

                {/* Nội dung chính */}
                <div className="relative z-20 flex flex-col items-center justify-center text-center min-h-screen px-4 animate-fade-in">
                    {/* Logo */}
                    <div className="relative w-96 h-96 mb-6 flex items-center justify-center">
                        {/* Ripple effect */}
                        <div className="absolute w-72 h-72 rounded-full border border-[#eeeeee] opacity-30 animate-ping-slow pointer-events-none" />
                        <div className="absolute w-72 h-72 rounded-full border border-[#eeeeee] opacity-30 animate-ping-slow pointer-events-none delay-1000" />



                        {/* Logo */}
                        <div className="relative w-96 h-96 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center z-10">
                            <Image
                                src="/img/logo.jpg"
                                alt="Logo"
                                width={350}
                                height={350}
                                className="object-cover rounded-full"
                            />
                        </div>
                    </div>


                    {/* Mô tả */}
                    <p className=" text-lg mb-2">
                        <span className="inline-flex items-center gap-2">
                            <span className="text-orange-400">★</span> {t("perfumeOverview")}
                        </span>
                    </p>

                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        {t("perfumeAtAGlance")}
                    </h1>

                    <p className="text-lg max-w-2xl">
                        {t("explorePerfumes")}
                    </p>
                </div>
            </div>

            <style jsx global>{`
            @keyframes fade-in {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            .animate-fade-in {
                animation: fade-in 0.7s ease-out forwards;
            }

            @keyframes ping-slow {
                0% {
                    transform: scale(1);
                    opacity: 1;
                }
                100% {
                    transform: scale(1.7);
                    opacity: 0;
                }
            }
            .animate-ping-slow {
                animation: ping-slow 3s ease-out infinite;
            }
            .delay-1000 {
            animation-delay: .7s;
            }
`}</style>

        </>
    );
}
