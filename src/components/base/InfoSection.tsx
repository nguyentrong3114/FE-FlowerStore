"use client";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Crown,
  CreditCard,
  Star,
  LogIn,
  Banknote,
} from "lucide-react";
import { motion } from "framer-motion";

const leftToCenter = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

const rightToCenter = {
  hidden: { opacity: 0, x: 100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export default function InfoSection() {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 py-10 max-w-6xl mx-auto">
      {/* VIP Section */}
      <motion.div
        variants={leftToCenter}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-lg p-4 text-center space-y-4 border border-neutral-200 dark:border-zinc-700 shadow-md h-[300px] flex flex-col justify-between"
      >
        <Crown className="mx-auto h-10 w-10" />
        <h2 className="text-xl font-bold">{t("becomeVip")}</h2>
        <p className="text-sm">{t("vipDescription")}</p>
        <Link
          href="/auth/signup"
          className="px-4 bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition text-sm"
        >
          {t("signUp")}
        </Link>
        <div className="mt-2 flex items-center justify-center gap-2 text-sm">
          <LogIn size={16} />
          <Link href="#" className="underline font-medium">
            {t("alreadyVip")}
          </Link>
        </div>
      </motion.div>

      {/* Payment Options */}
      <motion.div
        variants={rightToCenter}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-lg p-4 text-center space-y-2 border border-neutral-200 dark:border-zinc-700 shadow-md h-[300px] flex flex-col justify-between"
      >
        <CreditCard className="mx-auto h-8 w-8" />
        <h3 className="text-base font-bold">{t("flexiblePayment")}</h3>
        <p className="text-sm">{t("interestFree")}</p>
        <div className="text-sm">
          <p className="font-bold">Klarna</p>
          <p>{t("klarnaText")}</p>
        </div>
      </motion.div>

      {/* Trustpilot */}
      <motion.div
        variants={leftToCenter}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-lg p-4 text-center space-y-2 border border-neutral-200 dark:border-zinc-700 shadow-md h-[300px] flex flex-col justify-between"
      >
        <div className="flex items-center justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-5 w-5" />
          ))}
        </div>
        <h3 className="text-base font-bold">{t("trustTitle")}</h3>
        <p className="text-sm font-semibold">★★★★★</p>
        <p className="text-xs">{t("trustRating")}</p>
      </motion.div>

      {/* Real Perfume Partner Section */}
      <motion.div
        variants={rightToCenter}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="rounded-lg p-4 text-center space-y-2 border border-neutral-200 dark:border-zinc-700 shadow-md h-[300px] flex flex-col justify-between"
      >
        <Banknote className="mx-auto h-8 w-8" />
        <h3 className="text-base font-bold">{t("realPerfumePartner")}</h3>
        <p className="text-sm">{t("realPerfumeDescription")}</p>
      </motion.div>
    </section>
  );
}
