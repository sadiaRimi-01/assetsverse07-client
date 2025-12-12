import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRegLightbulb, FaTasks, FaCheckCircle, FaEnvelope } from "react-icons/fa";

const steps = [
  {
    icon: <FaRegLightbulb className="w-10 h-10 text-indigo-500" />,
    title: "Register Your Company",
    description: "HR managers register their company and get a default subscription to start managing assets.",
  },
  {
    icon: <FaTasks className="w-10 h-10 text-purple-500" />,
    title: "Manage Employees & Assets",
    description: "Add employees, assign assets, and track requests efficiently with automated workflows.",
  },
  {
    icon: <FaCheckCircle className="w-10 h-10 text-pink-500" />,
    title: "Track & Optimize",
    description: "Monitor asset usage, approvals, returns, and generate insightful analytics.",
  },
];

const faqs = [
  {
    question: "Can employees belong to multiple companies?",
    answer: "Yes! Employees can request assets from multiple companies and be affiliated automatically.",
  },
  {
    question: "How are asset requests approved?",
    answer: "HR managers can approve or reject asset requests. First-time approvals automatically create affiliation.",
  },
  {
    question: "Is there a limit to assets per company?",
    answer: "Each package has a set employee limit. HR can upgrade the subscription to allow more employees.",
  },
];

const ExtraSection = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="bg-white py-24">
      <div className="container mx-auto px-6">

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-8 text-center shadow-lg hover:shadow-indigo-200 transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="mb-4 flex justify-center">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-700">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 border-b border-gray-200">
                <button
                  className="w-full text-left py-4 flex justify-between items-center font-medium text-gray-900 hover:text-indigo-500 transition-colors duration-300"
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                  <span className="text-xl">{openFAQ === index ? "-" : "+"}</span>
                </button>
                {openFAQ === index && (
                  <motion.p
                    className="text-gray-700 pb-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    {faq.answer}
                  </motion.p>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          className="mt-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl p-12 text-center text-white shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started with AssetVerse</h2>
          <p className="mb-6 text-white/90">
            Ready to streamline your asset management? Contact us today and take full control of your company assets!
          </p>
          <a
            href="mailto:support@assetverse.com"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg hover:bg-white/90 transition-colors duration-300"
          >
            Contact Us
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default ExtraSection;
