import React, { useEffect, useState } from 'react';

const PackageSection = () => {
    const [packages, setPackages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/packages')
            .then(res => res.json())
            .then(data => setPackages(data));
    }, []);

    return (
        <section className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-6">

                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        Simple & Transparent Pricing
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose a plan that fits your organization and scale your asset management effortlessly.
                    </p>
                </div>

                {/* Packages */}
                <div className="grid md:grid-cols-3 gap-10">
                    {packages.map((pkg, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2
                            ${pkg.highlight
                                    ? 'bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white scale-105'
                                    : 'bg-white text-gray-800'
                                }`}
                        >

                            {pkg.highlight && (
                                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full">
                                    Most Popular
                                </span>
                            )}

                            <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>

                            <p className="text-4xl font-extrabold mb-2">
                                ${pkg.price}
                                <span className="text-base font-medium"> / {pkg.billing}</span>
                            </p>

                            <ul className="mt-6 space-y-3">
                                {pkg.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <span className="text-green-400 text-xl">✔</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`mt-8 w-full py-3 rounded-lg font-semibold transition-all
                                ${pkg.highlight
                                        ? 'bg-white text-indigo-600 hover:bg-gray-100'
                                        : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90'
                                    }`}
                            >
                                Get Started
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PackageSection;
