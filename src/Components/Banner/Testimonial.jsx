import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaBuilding, FaStar } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    position: "HR Manager, TechCorp",
    feedback:
      "AssetVerse transformed our asset tracking. Real-time visibility keeps our team accountable and organized.",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Sara Smith",
    position: "Operations Lead, FinSoft",
    feedback:
      "The request-approval workflow is seamless. Employees can request assets and everything is tracked properly.",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Michael Brown",
    position: "CEO, StartHub",
    feedback:
      "Analytics dashboards and reports are top-notch. We can now make informed decisions about asset allocations.",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Emily Clark",
    position: "Finance Lead, InnovateX",
    feedback:
      "Tracking assets across multiple companies has never been easier. AssetVerse is a game-changer.",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
];

const stats = [
  {
    icon: <FaUsers className="w-10 h-10 text-indigo-500" />,
    value: "500+",
    label: "Active Employees",
  },
  {
    icon: <FaBuilding className="w-10 h-10 text-purple-500" />,
    value: "120+",
    label: "Companies Trust Us",
  },
  {
    icon: <FaStar className="w-10 h-10 text-pink-500" />,
    value: "4.9/5",
    label: "Average Rating",
  },
];

const Testimonial = () => {
  return (
    <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-800 text-white py-24 overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          What Our Clients Say
        </motion.h2>
        <motion.p
          className="text-white/80 mb-16 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Trusted by hundreds of companies worldwide for secure and efficient asset management.
        </motion.p>

        {/* Testimonials slider */}
        <div className="flex overflow-x-auto space-x-6 py-4 -mx-6 px-6 scrollbar-hide">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-full w-80 p-8 shadow-lg hover:shadow-indigo-400/40 transition-shadow duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="flex flex-col items-center">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-20 h-20 rounded-full border-4 border-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 mb-4"
                />
                <p className="text-white/80 text-center mb-4">{t.feedback}</p>
                <h4 className="font-semibold">{t.name}</h4>
                <p className="text-white/70 text-sm">{t.position}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-20">
          {stats.map((s, index) => (
            <motion.div
              key={index}
              className="relative bg-white/10 backdrop-blur-md p-8 rounded-3xl shadow-xl overflow-hidden flex flex-col items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 opacity-10 rotate-12 rounded-3xl"></div>
              <div className="relative flex flex-col items-center">
                <div className="mb-4">{s.icon}</div>
                <h3 className="text-3xl font-bold">{s.value}</h3>
                <p className="text-white/80 mt-1">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonial;