"use client";
import Link from "next/link";

export default function InfoSection() {
  return (
    <section className="space-y-8 px-4 py-10">
      {/* Become a VIP */}
      <div className="grid md:grid-cols-2 gap-4 bg-red-600 text-white rounded-lg overflow-hidden">
        <div className="flex flex-col justify-center items-center text-center px-6 py-10">
          <h2 className="text-2xl font-bold mb-4">BECOME A VIP</h2>
          <p className="mb-6">
            Keep updated about new launches, fragrance tips and news, as well as receiving free delivery,
            exclusive offers and discounts on your favourite brands.
          </p>
          <button className="bg-white text-red-600 px-6 py-2 rounded font-semibold hover:bg-red-100">
            SIGN UP
          </button>
          <Link href="#" className="mt-4 underline text-white font-medium hover:text-red-200">
            Already a VIP? Log in
          </Link>
        </div>
        <div className="w-full h-60 md:h-auto">
          <img
            src="/images/vip-bottles.jpg" // 👈 thay bằng ảnh thật nếu có
            alt="Perfume Bottles"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Payment Options + Trustpilot */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Payment Options */}
        <div className="bg-gray-100 p-6 rounded-lg text-center">
          <h3 className="text-xl font-bold mb-2">FLEXIBLE PAYMENT OPTIONS</h3>
          <p className="mb-6">All interest free.</p>
          <div className="flex justify-center gap-6 flex-wrap">
            <div className="text-center">
              <div className="bg-pink-200 text-pink-800 px-4 py-1 rounded-full font-bold mb-2">Klarna.</div>
              <p>Pay in 3 instalments or up to 30 days later</p>
            </div>
            <div className="text-center">
              <div className="bg-green-200 text-green-800 px-4 py-1 rounded-full font-bold mb-2">clearpay</div>
              <p>Pay in 4 payments, payable every 2 weeks</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full font-bold mb-2">PayPal</div>
              <p>Pay in 3 instalments</p>
            </div>
          </div>
          <p className="mt-4 text-sm underline">Terms and conditions apply.</p>
        </div>

        {/* Trustpilot */}
        <div className="bg-[#000032] text-white p-6 rounded-lg text-center flex flex-col justify-center">
          <h3 className="text-xl font-bold mb-2">PEOPLE THINK WE ARE</h3>
          <p className="text-lg">
            Excellent{" "}
            <span className="inline-block align-middle ml-2">
              <img src="/images/trustpilot-stars.png" alt="Trustpilot stars" className="inline h-6" />
            </span>{" "}
            Trustpilot
          </p>
        </div>
      </div>
    </section>
  );
}
