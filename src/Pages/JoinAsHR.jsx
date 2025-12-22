import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const JoinAsHR = () => {
  const { createUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  // ---------------- EMAIL + PASSWORD REGISTER ----------------
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const hrUser = {
      name: form.name.value,
      companyName: form.companyName.value,
      companyLogo: form.companyLogo.value,
      email: form.email.value,
      dateOfBirth: form.dob.value,

      // auto fields
      role: "hr",
      packageLimit: 5,
      currentEmployees: 0,
      subscription: "basic",
    };

    try {
      // Firebase create user
      await createUser(hrUser.email, form.password.value);

      // Save HR in MongoDB
      const res = await fetch("https://assetsverse-app-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hrUser),
      });

      const data = await res.json();
      if (data.message === "user-exists") {
        toast.error("User already exists. Please login.");
        return;
      }

      toast.success("HR Registered Successfully!");
      navigate("/dashboard/hr");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("Email already in use. Please login.");
      } else {
        console.error(error);
      }
    }
  };

  // ---------------- GOOGLE REGISTER ----------------
  const handleGoogleRegister = async () => {
    try {
      const result = await googleLogin();
      const user = result.user;

      const hrUser = {
        name: user.displayName || "HR Manager",
        companyName: "My Company",
        companyLogo: user.photoURL || "",
        email: user.email,
        dateOfBirth: "",

        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      };

      await fetch("https://assetsverse-app-server.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hrUser),
      });
      toast.success("Registered with Google successfully!");
      navigate("/dashboard/hr");
    } catch (error) {
      console.error(error);
      toast.error("Google registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      <form
        onSubmit={handleRegister}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl space-y-4"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Join as HR Manager
        </h2>
        <p className="text-center text-gray-500 text-sm">
          Get started with **Free Plan (5 employees – $0)**
        </p>

        <input
          name="name"
          placeholder="Full Name"
          className="input input-bordered w-full"
          required
        />

        <input
          name="companyName"
          placeholder="Company Name"
          className="input input-bordered w-full"
          required
        />

        <input
          name="companyLogo"
          placeholder="Company Logo URL (ImgBB / Cloudinary)"
          className="input input-bordered w-full"
        />

        <input
          name="email"
          type="email"
          placeholder="Company Email"
          className="input input-bordered w-full"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password (min 6 characters)"
          className="input input-bordered w-full"
          required
        />

        <input
          name="dob"
          type="date"
          className="input input-bordered w-full"
          required
        />

        <button className="btn btn-primary w-full">
          Register as HR
        </button>

        <button
          type="button"
          onClick={handleGoogleRegister}
          className="btn btn-outline w-full"
        >
          Register with Google
        </button>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-indigo-600 font-semibold">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default JoinAsHR;
