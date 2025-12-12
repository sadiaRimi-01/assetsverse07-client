import React from "react";
import { motion } from "framer-motion";

const HeroBanner = () => {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white">
      <div className="container mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block mb-4 px-4 py-1 rounded-full bg-indigo-600/20 text-indigo-400 text-sm font-medium">
            Corporate Asset Management Platform
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight mb-6">
            Manage Company Assets <br />
            <span className="text-indigo-400">
              Smartly & Securely
            </span>
          </h1>

          <p className="text-slate-300 text-lg mb-8 max-w-xl">
            AssetVerse helps HR teams track, assign, and manage company assets
            with full transparency. Reduce asset loss, improve accountability,
            and streamline operations across your organization.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="btn btn-primary px-8">
              Get Started
            </button>
            <button className="btn btn-outline btn-secondary px-8">
              Learn More
            </button>
          </div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-4 bg-indigo-600/20 blur-3xl rounded-full"></div>

          <img
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7"
            alt="Corporate Asset Management"
            className="relative rounded-2xl shadow-2xl border border-white/10"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default HeroBanner;