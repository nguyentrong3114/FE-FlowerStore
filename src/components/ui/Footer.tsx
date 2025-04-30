import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="mx-4 border shadow-md px-8 py-10 my-10 rounded-md">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 text-sm">
        {/* Subscription */}
        <div className="md:col-span-1">
          <h2 className="font-serif text-lg mb-3">
            Get the latest news and exclusive offers from AM PERFUME
          </h2>
          <form className="flex flex-col gap-2">
            <input
              type="email"
              placeholder="*E-mail"
              className="border border-red-500 px-3 py-2 rounded focus:outline-none"
              required
            />
            <p className="text-red-500 text-xs">E-mail is required</p>
            <button className="bg-gray-800 text-white px-4 py-2 rounded w-fit">Subscribe</button>
          </form>

          {/* Accessibility */}
          <div className="mt-4 flex items-center gap-2">
            <span className="text-xs">Accessibility : Better contrast</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-gray-600 transition-all duration-300"></div>
            </label>
          </div>
        </div>

        {/* AM PERFUME Stores */}
        <div>
          <h3 className="font-semibold mb-2">AM PERFUME Stores</h3>
          <ul className="space-y-1 text-gray-500">
            <li><Link href="/store/storelocator" className="hover:underline">Store Locator</Link></li>
            <li><Link href="/store/fragranceconsultants" className="hover:underline">Fragrance Consultants</Link></li>
          </ul>
        </div>

        {/* Client Services */}
        <div>
          <h3 className="font-semibold mb-2">Client Services</h3>
          <ul className="space-y-1 text-gray-500">
            <li><Link href="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link href="/shipping-returns" className="hover:underline">Shipping & Returns</Link></li>
            <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>

        {/* About AM PERFUME */}
        <div>
          <h3 className="font-semibold mb-2">About AM PERFUME</h3>
          <ul className="space-y-1 text-gray-500">
            <li><Link href="/about" className="hover:underline">Our Story</Link></li>
            <li><Link href="/sustainability" className="hover:underline">Sustainability</Link></li>
            <li><Link href="/careers" className="hover:underline">Careers</Link></li>
          </ul>
        </div>

        {/* Legal Information */}
        <div>
          <h3 className="font-semibold mb-2">Legal Information</h3>
          <ul className="space-y-1 text-gray-500">
            <li><Link href="/terms" className="hover:underline">Terms & Conditions</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link href="/return-policy" className="hover:underline">Return Policy</Link></li>
            <li><Link href="/sitemap" className="hover:underline">Site Map</Link></li>
          </ul>
        </div>
      </div>

      {/* Social & Region */}
      <div className="max-w-screen-xl mx-auto mt-10 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
          <span>Follow Us</span>
          <Link href="https://www.instagram.com/">Instagram</Link>
          <Link href="https://www.facebook.com/">Facebook</Link>
          <Link href="https://www.tiktok.com/vi-VN">TikTok</Link>
          <Link href="https://www.pinterest.com/">Pinterest</Link>
          <Link href="https://www.youtube.com/">YouTube</Link>
        </div>
        <div className="mt-4 md:mt-0 flex items-center gap-2">
          <span className="font-medium text-gray-700">34 Nguyễn Sáng</span>
        </div>
      </div>

      {/* AM PERFUME logo */}
      <div className="text-center mt-6 text-2xl font-serif">AM PERFUME</div>
    </footer>
  );
};

export default Footer;
