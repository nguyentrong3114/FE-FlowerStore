"use client";

import { motion } from "framer-motion";

export default function Services() {
  const services = [
    { title: "Custom Fragrance", desc: "Create your signature scent with our master perfumers." },
    { title: "Fragrance Consultation", desc: "Get expert advice to find the perfect fragrance for any occasion." },
    { title: "Scent Workshops", desc: "Join our interactive workshops and explore the art of perfumery." },
    { title: "Gift Packaging", desc: "Beautifully wrap your fragrance gifts for any special event." },
    { title: "Refill Station", desc: "Eco-friendly refilling options for your favorite fragrances." },
    { title: "Scent Personalization", desc: "Engrave a name or message on your perfume bottle." },
    { title: "Fragrance Discovery Kit", desc: "Try mini samples before choosing your perfect scent." },
    { title: "Corporate Gifting", desc: "Tailored fragrance gifts for your clients or employees." },
    { title: "Event Scenting", desc: "Customize the fragrance environment for your event or venue." },
  ];

  const benefits = [
    { title: "Free Shipping", desc: "Enjoy free shipping on all orders as a valued member." },
    { title: "Exclusive Discounts", desc: "Access special discounts and members-only promotions." },
    { title: "Early Access", desc: "Be the first to discover and shop our latest fragrances." },
    { title: "Birthday Gift", desc: "Receive a complimentary gift every year on your birthday." },
    { title: "Loyalty Points", desc: "Earn points with every purchase to redeem for rewards." },
    { title: "VIP Event Invites", desc: "Get invitations to exclusive fragrance launch events." },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="w-full px-6 py-4 flex justify-between items-center border-b">
        <h1 className="text-2xl font-bold">Perfume Studio</h1>
        <nav className="space-x-4">
          <a href="#" className="hover:underline">Home</a>
          <a href="#" className="hover:underline">Services</a>
          <a href="#" className="hover:underline">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 space-y-6">
        <motion.h2
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl font-bold"
        >
          Discover Our Services
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="max-w-xl text-lg leading-relaxed"
        >
          We offer a wide range of bespoke fragrance services tailored to enhance your personal and professional scent journey.
        </motion.p>
      </section>

      {/* Services Section */}
      <main className="flex-grow px-4 pb-16 space-y-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * (index + 1), duration: 0.8 }}
              className="p-6 border rounded-xl shadow hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-semibold mb-2">{service.title}</h3>
              <p className="text-base">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Membership Benefits Section */}
        <section className="flex flex-col items-center justify-center text-center space-y-6">
          <motion.h2
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold"
          >
            Membership Benefits
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="max-w-xl text-lg leading-relaxed"
          >
            Become a member and enjoy exclusive perks curated just for you.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * (index + 1), duration: 0.8 }}
                className="p-6 border rounded-xl shadow hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-base">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

    </div>
  );
}
