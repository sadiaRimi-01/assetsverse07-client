import React from "react";
import { FaLaptop, FaClipboardList, FaUsers, FaBell, FaChartPie, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    icon: <FaLaptop className="text-indigo-500 w-10 h-10" />,
    title: "Centralized Asset Management",
    description:
      "Manage all company assets from one dashboard, track assignments, and maintain inventory effortlessly.",
  },
  {
    icon: <FaClipboardList className="text-purple-500 w-10 h-10" />,
    title: "Request & Approval Workflow",
    description:
      "Employees can request assets, and HR managers approve or reject seamlessly with real-time updates.",
  },
  {
    icon: <FaUsers className="text-pink-500 w-10 h-10" />,
    title: "Employee Management",
    description:
      "Easily manage employee affiliations across multiple companies and monitor assigned assets.",
  },
  {
    icon: <FaBell className="text-indigo-400 w-10 h-10" />,
    title: "Notifications & Alerts",
    description:
      "Get instant notifications for asset requests, approvals, returns, and upcoming renewals.",
  },
  {
    icon: <FaChartPie className="text-purple-400 w-10 h-10" />,
    title: "Analytics & Reports",
    description:
      "Visualize asset usage, most requested items, and returnable vs non-returnable distributions.",
  },
  {
    icon: <FaShieldAlt className="text-pink-400 w-10 h-10" />,
    title: "Secure & Reliable",
    description:
      "Ensure data security and proper role-based access with HR and employee-specific permissions.",
  },
];

const BannerShow = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Key Features of AssetVerse
        </motion.h2>
        <motion.p
          className="text-gray-600 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Discover how AssetVerse helps streamline your asset management and HR
          processes with powerful and intuitive features.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-indigo-50 p-8 rounded-2xl shadow-lg hover:shadow-indigo-300 transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BannerShow;