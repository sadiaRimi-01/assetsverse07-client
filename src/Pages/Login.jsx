import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const { role } = useRole();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      navigate(role === "hr" ? "/dashboard/hr" : "/dashboard/employee");
    } catch {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl w-96 space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
        <button className="btn btn-primary w-full">Login</button>
      </form>
    </div>
  );
};

export default Login;
