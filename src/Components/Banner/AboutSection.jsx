import React from "react";
import { FaShieldAlt, FaTasks, FaChartLine, FaUsers } from "react-icons/fa";
import { motion } from "framer-motion";

const benefits = [
  {
    icon: <FaShieldAlt className="text-indigo-500 w-12 h-12" />,
    title: "Secure Asset Tracking",
    description:
      "Keep all company assets safe and monitored. Ensure accountability and reduce loss with real-time tracking.",
  },
  {
    icon: <FaTasks className="text-purple-500 w-12 h-12" />,
    title: "Streamlined Workflow",
    description:
      "Simplify asset requests, approvals, and returns. Save HR time and reduce administrative overhead.",
  },
  {
    icon: <FaChartLine className="text-pink-500 w-12 h-12" />,
    title: "Analytics & Insights",
    description:
      "Monitor asset usage and employee assignments with detailed charts and reports for informed decisions.",
  },
  {
    icon: <FaUsers className="text-indigo-400 w-12 h-12" />,
    title: "Employee Management",
    description:
      "Track teams and affiliations, manage multiple companies, and easily monitor each employee's assigned assets.",
  },
];

const AboutSection = () => {
  return (
    <section className="bg-gray-100 py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Why Choose AssetVerse?
        </motion.h2>
        <motion.p
          className="text-gray-700 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          AssetVerse provides modern HR & asset management tools to optimize
          company operations, secure assets, and boost employee efficiency.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-indigo-300 transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;