import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const HrRoutes = ({ children }) => {
  const { role, loading } = useRole();

  if (loading) return <p className="text-center mt-10">Checking access...</p>;
  if (role !== "hr") return <Navigate to="/dashboard/employee" replace />;

  return children;
};

export default HrRoutes;
