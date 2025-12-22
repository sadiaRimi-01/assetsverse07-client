import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const JoinAsEmployee = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const employeeUser = {
      name: form.name.value,
      email: form.email.value,
      dateOfBirth: form.dob.value,
      role: "employee",
    };

    try {
      await createUser(employeeUser.email, form.password.value);

      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeUser),
      });

      const data = await res.json();

      if (data.message === "user-exists") {
        toast.error("Email already registered. Please login.");
        return;
      }

       toast.success("Employee Registered Successfully!");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
       toast.error("Email already registered. Please login.");
      } else {
        console.error(error);
      }
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      const employeeUser = {
        name: user.displayName || "Employee",
        email: user.email,
        role: "employee",
      };

      await fetch("http://localhost:3000/google-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employeeUser),
      });

      toast.success("Registered with Google successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
          Join as Employee
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Create your employee account
        </p>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="input input-bordered w-full"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            required
          />

          <input
            name="dob"
            type="date"
            className="input input-bordered w-full"
            required
          />

          <input
            name="password"
            type="password"
            placeholder="Password (min 6 characters)"
            className="input input-bordered w-full"
            minLength={6}
            required
          />

          <button className="btn btn-primary w-full">
            Register
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full border-indigo-500 text-indigo-600 hover:bg-indigo-50"
        >
          Register with Google
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default JoinAsEmployee;
