import React, { useEffect, useState } from "react";
import Birthday from "../../Components/Birthday";

const MyTeam = () => {
  const [affiliations, setAffiliations] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAffiliations = async () => {
      try {
        const res = await fetch("https://assetsverse-app-server.vercel.app/api/affiliations");
        const data = await res.json();
        setAffiliations(data);

        // Default to first company
        if (data.length > 0) setSelectedCompany(data[0].companyName);
      } catch (err) {
        console.error(err);
        setError("Failed to load affiliations");
      }
    };
    fetchAffiliations();
  }, []);

  // Unique companies
  const companies = [...new Set(affiliations.map((a) => a.companyName))];

  // Employees of selected company
  const employees = affiliations.filter((a) => a.companyName === selectedCompany);



  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl  text-indigo-600 font-bold mb-4">My Team</h1>

      {/* Company selector */}
      <div className="mb-4">
        <label className="mr-2 font-semibold">Select Company:</label>
        <select
          className="border rounded px-2 py-1"
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          {companies.map((company) => (
            <option key={company} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {employees.map((emp) => (
          <div
            key={emp.employeeEmail}
            className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-2xl transition-all duration-300"
          >


            <h2 className="font-semibold">{emp.employeeName}</h2>
            <p className="text-sm text-gray-600">{emp.employeeEmail}</p>
            <p className="text-sm text-gray-500">{emp.position}</p>
          </div>
        ))}
      </div>

      <Birthday></Birthday>
    </div>
  );
};

export default MyTeam;
