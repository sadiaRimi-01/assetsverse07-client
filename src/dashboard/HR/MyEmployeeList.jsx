import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
const MyEmployeeList = () => {
  const { user } = useContext(AuthContext);
  const [employees, setEmployees] = useState([]);
  const [limit, setLimit] = useState(0);

  const loadEmployees = async () => {
    const res = await fetch(
      `http://localhost:3000/hr/employees?hrEmail=${user.email}`
    );
    const data = await res.json();
    setEmployees(data);
  };

  const loadLimit = async () => {
    const res = await fetch(
      `http://localhost:3000/hr/employee-limit/${user.email}`
    );
    const data = await res.json();
    setLimit(data.limit);
  };

  useEffect(() => {
    if (user?.email) {
      loadEmployees();
      loadLimit();
    }
  }, [user]);

  const handleRemove = async (email) => {
      toast.warn("Removing employee...", { autoClose: 1000 });
    if (!confirm("Remove employee from your team?")) return;

    await fetch(`http://localhost:3000/hr/employees/remove/${email}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hrEmail: user.email }),
    });
 toast.success("Employee removed!");
    loadEmployees();
  };

  return (
    <div className="p-6 bg-white rounded shadow">
      <div className="flex  justify-between mb-4">
        <h2 className="text-2xl  text-indigo-600 font-bold">My Employees</h2>
        <p className="font-semibold  ">
          {employees.length} / {limit} employees used
        </p>
      </div>
<div className="overflow-x-auto">
  
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Email</th>
            <th>Join Date</th>
            <th>Assets</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id}>
              <td>
                <img
                  src={emp.companyLogo || "https://i.ibb.co/2d9FzZ0/user.png"}
                  className="w-10 h-10 rounded-full"
                />
              </td>
              <td>{emp.employeeName}</td>
              <td>{emp.employeeEmail}</td>
              <td>
                {new Date(emp.affiliationDate).toLocaleDateString()}
              </td>
              <td>{emp.assetsCount}</td>
              <td>
                <button
                  onClick={() => handleRemove(emp.employeeEmail)}
                  className="btn btn-xs btn-error"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

      {employees.length === 0 && (
        <p className="text-center text-gray-400 mt-4">
          No employees added yet
        </p>
      )}
    </div>
  );
};

export default MyEmployeeList;
