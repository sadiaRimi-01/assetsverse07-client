// import React, { useEffect, useState } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// // Load Stripe with your public key
// const stripePromise = loadStripe("pk_test_XXXXXXXXXXXXXXXXXXXXXXXX");

// const UpgradePackage = ({ userEmail }) => {
//   const [packages, setPackages] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [paymentHistory, setPaymentHistory] = useState([]);

//   useEffect(() => {
//     // Fetch available packages
//     fetch("http://localhost:3000/packages")
//       .then((res) => res.json())
//       .then((data) => setPackages(data))
//       .catch((err) => console.error(err));

//     // Fetch payment history for the user
//     fetch(`http://localhost:3000/payments?email=${userEmail}`)
//       .then((res) => res.json())
//       .then((data) => setPaymentHistory(data))
//       .catch((err) => console.error(err));
//   }, [userEmail]);

//   const handleCheckout = async (pkg) => {
//     setLoading(true);
//     try {
//       // Create a payment session on backend
//       const res = await fetch("http://localhost:3000/create-checkout-session", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ packageId: pkg._id, email: userEmail }),
//       });
//       const session = await res.json();
//       const stripe = await stripePromise;
//       await stripe.redirectToCheckout({ sessionId: session.id });
//     } catch (error) {
//       console.error(error);
//       alert("Payment initiation failed!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="py-16 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 min-h-screen">
//       <div className="max-w-7xl mx-auto px-6">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h2 className="text-4xl font-bold text-gray-800 mb-4">
//             Upgrade Your Package
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Choose a plan that fits your organization and scale your asset management effortlessly.
//           </p>
//         </div>

//         {/* Packages Cards */}
//         <div className="grid md:grid-cols-3 gap-10">
//           {packages.map((pkg) => (
//             <div
//               key={pkg._id}
//               className={`relative rounded-2xl p-8 shadow-lg transition-transform duration-300 hover:-translate-y-2
//                 ${pkg.highlight
//                   ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white scale-105"
//                   : "bg-white text-gray-800"
//                 }`}
//             >
//               {pkg.highlight && (
//                 <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black text-sm font-semibold px-4 py-1 rounded-full">
//                   Most Popular
//                 </span>
//               )}

//               <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>

//               <p className="text-4xl font-extrabold mb-2">
//                 ${pkg.price}
//                 <span className="text-base font-medium"> / {pkg.billing}</span>
//               </p>

//               <ul className="mt-6 space-y-3">
//                 {pkg.features.map((feature, i) => (
//                   <li key={i} className="flex items-center gap-3">
//                     <span className="text-green-400 text-xl">✔</span>
//                     <span>{feature}</span>
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={() => handleCheckout(pkg)}
//                 disabled={loading}
//                 className={`mt-8 w-full py-3 rounded-lg font-semibold transition-all
//                   ${pkg.highlight
//                     ? "bg-white text-indigo-600 hover:bg-gray-100"
//                     : "bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90"
//                   }`}
//               >
//                 {loading ? "Processing..." : "Upgrade Now"}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* Payment History */}
//         <div className="mt-16">
//           <h3 className="text-3xl font-bold text-gray-800 mb-6">Payment History</h3>
//           <div className="overflow-x-auto">
//             <table className="table table-zebra w-full shadow-lg bg-white rounded-lg">
//               <thead>
//                 <tr className="bg-indigo-100">
//                   <th>#</th>
//                   <th>Package Name</th>
//                   <th>Price</th>
//                   <th>Billing</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paymentHistory.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="text-center py-4 text-gray-500">
//                       No payments yet.
//                     </td>
//                   </tr>
//                 )}
//                 {paymentHistory.map((p, idx) => (
//                   <tr key={p._id}>
//                     <td>{idx + 1}</td>
//                     <td>{p.packageName}</td>
//                     <td>${p.price}</td>
//                     <td>{p.billing}</td>
//                     <td>{new Date(p.date).toLocaleDateString()}</td>
//                     <td className="text-green-600 font-semibold">{p.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default UpgradePackage;







