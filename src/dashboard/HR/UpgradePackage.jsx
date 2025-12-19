

// import React, { useEffect, useState } from "react";

// const UpgradePackage = ({ userEmail }) => {
//   const [packages, setPackages] = useState([]);
//   const [paymentHistory, setPaymentHistory] = useState([]);
//   const [loadingId, setLoadingId] = useState(null);

//   useEffect(() => {
//     // Load packages
//     fetch("http://localhost:3000/packages")
//       .then(res => res.json())
//       .then(data => setPackages(data))
//       .catch(err => console.error(err));

//     // Load payment history
//     fetch(`http://localhost:3000/payments?email=${userEmail}`)
//       .then(res => res.json())
//       .then(data => setPaymentHistory(data))
//       .catch(err => console.error(err));
//   }, [userEmail]);

//   const handleCheckout = async (pkg) => {
//     setLoadingId(pkg._id); // ✅ only this button loading

//     try {
//       const res = await fetch("http://localhost:3000/create-checkout-session", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           packageId: pkg._id,
//           email: userEmail,
//         }),
//       });

//       const data = await res.json();

//       if (data?.url) {
//         window.location.href = data.url; // ✅ correct Stripe redirect
//       } else {
//         alert("Failed to start payment");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Payment error");
//     } finally {
//       setLoadingId(null); // reset if failed
//     }
//   };

//   return (
//     <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16">
//       <div className="max-w-7xl mx-auto px-6">

//         {/* HEADER */}
//         <div className="text-center mb-16">
//           <h2 className="text-4xl font-bold text-gray-800 mb-3">
//             Upgrade Your Package
//           </h2>
//           <p className="text-gray-600 max-w-xl mx-auto">
//             Choose the best plan for your organization and unlock more features.
//           </p>
//         </div>

//         {/* PACKAGES */}
//         <div className="grid md:grid-cols-3 gap-10">
//           {packages.map(pkg => (
//             <div
//               key={pkg._id}
//               className={`relative rounded-2xl p-8 shadow-lg transition-transform hover:-translate-y-1
//               ${pkg.highlight
//                 ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white scale-105"
//                 : "bg-white text-gray-800"
//               }`}
//             >
//               {pkg.highlight && (
//                 <span className="absolute -top-4 left-1/2 -translate-x-1/2 badge badge-warning">
//                   Most Popular
//                 </span>
//               )}

//               <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>

//               <p className="text-4xl font-extrabold mb-4">
//                 ${pkg.price}
//                 <span className="text-base font-medium"> / {pkg.billing}</span>
//               </p>

//               <ul className="space-y-2 mb-6">
//                 {pkg.features.map((feature, i) => (
//                   <li key={i} className="flex gap-2">
//                     ✅ {feature}
//                   </li>
//                 ))}
//               </ul>

//               <button
//                 onClick={() => handleCheckout(pkg)}
//                 disabled={loadingId === pkg._id}
//                 className={`btn w-full
//                   ${pkg.highlight ? "btn-neutral" : "btn-primary"}
//                 `}
//               >
//                 {loadingId === pkg._id ? "Processing..." : "Upgrade Now"}
//               </button>
//             </div>
//           ))}
//         </div>

//         {/* PAYMENT HISTORY */}
//         <div className="mt-20">
//           <h3 className="text-3xl font-bold mb-6 text-gray-800">
//             Payment History
//           </h3>

//           <div className="overflow-x-auto bg-white rounded-xl shadow">
//             <table className="table table-zebra">
//               <thead>
//                 <tr>
//                   <th>#</th>
//                   <th>Package</th>
//                   <th>Price</th>
//                   <th>Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {paymentHistory.length === 0 && (
//                   <tr>
//                     <td colSpan="5" className="text-center text-gray-400 py-4">
//                       No payment history found
//                     </td>
//                   </tr>
//                 )}

//                 {paymentHistory.map((p, i) => (
//                   <tr key={p._id}>
//                     <td>{i + 1}</td>
//                     <td>{p.packageName}</td>
//                     <td>${p.price}</td>
//                     <td>{new Date(p.date).toLocaleDateString()}</td>
//                     <td className="text-green-600 font-semibold">
//                       Paid
//                     </td>
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





import React, { useEffect, useState } from "react";

const UpgradePackage = ({ userEmail }) => {
  const [packages, setPackages] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [currentPackage, setCurrentPackage] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  // Safe fetch helper
  const safeFetchJson = async (url, options = {}) => {
    try {
      const res = await fetch(url, options);
      if (!res.ok) return null;
      const text = await res.text();
      return text ? JSON.parse(text) : null;
    } catch (err) {
      console.error("Fetch JSON error:", err);
      return null;
    }
  };

  // Load user, packages, and payments
  const loadData = async () => {
    const packagesData = await safeFetchJson("http://localhost:3000/packages");
    const userData = await safeFetchJson(`http://localhost:3000/users/${userEmail}`);
    const paymentsData = await safeFetchJson(`http://localhost:3000/payments?email=${userEmail}`);

    if (packagesData) {
      const currentPkgName = userData?.package || null;
      const sortedPackages = currentPkgName
        ? [
            ...packagesData.filter(p => p.name === currentPkgName),
            ...packagesData.filter(p => p.name !== currentPkgName)
          ]
        : packagesData;
      setPackages(sortedPackages);
    }

    if (userData) setCurrentPackage(userData.package || "None");
    if (paymentsData) setPaymentHistory(paymentsData);
  };

  useEffect(() => {
    loadData();
  }, [userEmail]);

  // Handle checkout click
  const handleCheckout = async (pkg) => {
    setLoadingId(pkg._id);
    try {
     const res = await fetch("http://localhost:3000/create-checkout-session", {


        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packageId: pkg._id, email: userEmail }),
      });
      const data = await res.json();
      if (data?.url) window.location.href = data.url;
      else alert("Failed to start payment");
    } catch (err) {
      console.error(err);
      alert("Payment error");
    } finally {
      setLoadingId(null);
    }
  };

  // Check Stripe redirect for session_id and call /payment-success
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("session_id");
  if (!sessionId) return;

  const finalizePayment = async () => {
    const res = await safeFetchJson(
      `http://localhost:3000/payment-success?session_id=${sessionId}`,
      { method: "PATCH" }
    );

    if (res?.success) {
      await loadData();
      window.history.replaceState({}, "", window.location.pathname);
    }
  };

  finalizePayment();
}, [userEmail]);


  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">Upgrade Your Package</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Current Package: <span className="font-semibold">{currentPackage}</span>
          </p>
        </div>

        {/* PACKAGES */}
        <div className="grid md:grid-cols-3 gap-10 mb-20">
          {packages.map(pkg => (
            <div key={pkg._id} className={`relative rounded-2xl p-8 shadow-lg transition-transform hover:-translate-y-1
              ${pkg.highlight ? "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white scale-105" : "bg-white text-gray-800"}`}>
              {pkg.highlight && <span className="absolute -top-4 left-1/2 -translate-x-1/2 badge badge-warning">Most Popular</span>}
              <h3 className="text-2xl font-bold mb-3">{pkg.name}</h3>
              <p className="text-4xl font-extrabold mb-4">${pkg.price}<span className="text-base font-medium"> / {pkg.billing}</span></p>
              <ul className="space-y-2 mb-6">{pkg.features.map((f, i) => <li key={i}>✅ {f}</li>)}</ul>
              <button
                onClick={() => handleCheckout(pkg)}
                disabled={loadingId === pkg._id}
                className={`btn w-full ${pkg.highlight ? "btn-neutral" : "btn-primary"}`}>
                {loadingId === pkg._id ? "Processing..." : "Upgrade Now"}
              </button>
            </div>
          ))}
        </div>

        {/* PAYMENT HISTORY */}
        <div>
          <h3 className="text-3xl font-bold mb-6 text-gray-800">Payment History</h3>
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Package</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-gray-400 py-4">No payment history found</td></tr>
                ) : (
                  paymentHistory.map((p, i) => (
                    <tr key={p._id}>
                      <td>{i + 1}</td>
                      <td>{p.packageName}</td>
                      <td>${p.amount}</td>
                      <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                      <td className="text-green-600 font-semibold">{p.status}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UpgradePackage;

