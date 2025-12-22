import { useEffect, useState } from "react";

const UpgradePackage = () => {
  const email = localStorage.getItem("userEmail");

  const [packages, setPackages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const [p, u, pay] = await Promise.all([
        fetch("https://assetsverse-app-server.vercel.app/packages").then(res => res.json()),
        fetch(`https://assetsverse-app-server.vercel.app/users/${email}`).then(res => res.json()),
        fetch(`https://assetsverse-app-server.vercel.app/payments/${email}`).then(res => res.json())
      ]);
      setPackages(p);
      setCurrentUser(u);
      setPayments(pay);
      setLoading(false);
    };
    load();
  }, [email]);

  const handleUpgrade = async (pkg) => {
    const res = await fetch("https://assetsverse-app-server.vercel.app/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        packageName: pkg.name,
        price: pkg.price,
        employeeLimit: pkg.employeeLimit,
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  if (loading) return <div className="loading loading-spinner loading-lg mx-auto mt-40"></div>;

  return (
    <div className="min-h-screen bg-base-200 p-8">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Cureent plan */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-10 text-white shadow-xl">
          <h2 className="text-3xl font-bold">Your Current Plan</h2>
          <p className="mt-2 text-lg">
            <span className="font-semibold">{currentUser?.package}</span> · {currentUser?.packageLimit} Employees
          </p>
        </div>

        {/* Package */}
        <div className="grid md:grid-cols-3 gap-10">
          {packages.map(pkg => {
            const isCurrent = currentUser?.package === pkg.name;
            return (
              <div key={pkg._id} className="bg-base-100 rounded-3xl p-8 shadow-lg hover:-translate-y-2 transition">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-4xl font-extrabold mb-4">${pkg.price}</p>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((f, i) => <li key={i}>✔ {f}</li>)}
                </ul>
                <button
                  disabled={isCurrent}
                  onClick={() => handleUpgrade(pkg)}
                  className="btn btn-primary w-full"
                >
                  {isCurrent ? "Current Plan" : "Upgrade"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Payment history */}
        <div>
          <h3 className="text-2xl font-bold mb-4">Payment History</h3>
          <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
            <table className="table table-zebra">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Package</th>
                  <th>Amount</th>
                  <th>Employees</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p, i) => (
                  <tr key={p._id}>
                    <td>{i + 1}</td>
                    <td>{p.packageName}</td>
                    <td>${p.amount}</td>
                    <td>{p.employeeLimit}</td>
                    <td>{new Date(p.paymentDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UpgradePackage;
