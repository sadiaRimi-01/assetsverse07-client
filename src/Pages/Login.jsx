// import { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../provider/AuthProvider";
// import useRole from "../hooks/useRole";

// const Login = () => {
//   const { loginUser, googleLogin } = useContext(AuthContext);
//   const { role } = useRole();
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     const email = e.target.email.value;
//     const password = e.target.password.value;

//     try {
//       await loginUser(email, password);
//       localStorage.setItem("userEmail", email);
//       navigate(role === "hr" ? "/dashboard/hr" : "/dashboard/employee");
//     } catch {
//       alert("Invalid email or password");
//     }
//   };

//   const handleGoogleLogin = async () => {
//     try {
//       const result = await googleLogin();
//       const user = result.user;

//       await fetch("http://localhost:3000/google-user", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: user.displayName || "User",
//           email: user.email,
//         }),
//       });
// localStorage.setItem("userEmail", user.email);
//       navigate("/dashboard");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
//         <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
//           Welcome Back
//         </h2>
//         <p className="text-center text-gray-500 mb-6">
//           Login to your account
//         </p>

//         <form onSubmit={handleLogin} className="space-y-4">
//           <input
//             name="email"
//             type="email"
//             placeholder="Email Address"
//             className="input input-bordered w-full"
//             required
//           />

//           <div>
//             <input
//               name="password"
//               type="password"
//               placeholder="Password"
//               className="input input-bordered w-full"
//               required
//             />
//             <p className="text-right text-sm mt-1 text-indigo-600 cursor-pointer hover:underline">
//               Forgot password?
//             </p>
//           </div>

//           <button className="btn btn-primary w-full">
//             Login
//           </button>
//         </form>

//         <div className="divider">OR</div>

//         <button
//           onClick={handleGoogleLogin}
//           className="btn btn-outline w-full border-indigo-500 text-indigo-600 hover:bg-indigo-50"
//         >
//           Login with Google
//         </button>

//         <div className="text-center text-sm mt-6 space-y-1">
//           <p className="text-gray-600">Don’t have an account?</p>
//           <div className="flex justify-center gap-3">
//             <Link
//               to="/join-hr"
//               className="text-indigo-600 font-semibold hover:underline"
//             >
//               Register as HR
//             </Link>
//             <span className="text-gray-400">|</span>
//             <Link
//               to="/join-employee"
//               className="text-indigo-600 font-semibold hover:underline"
//             >
//               Register as Employee
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;










import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";

const Login = () => {
  const { loginUser, googleLogin, setUser } = useContext(AuthContext);
  const { role } = useRole();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const userCredential = await loginUser(email, password);
      const firebaseUser = userCredential.user;

      // Set context and localStorage
      setUser(firebaseUser);
      localStorage.setItem("userEmail", firebaseUser.email);
      localStorage.setItem("userName", firebaseUser.displayName || "User");

      navigate(role === "hr" ? "/dashboard/employee" :"/dashboard/hr" );
    } catch {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      const firebaseUser = result.user;

      // Save to MongoDB if needed
      await fetch("http://localhost:3000/google-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
        }),
      });

      // Set context and localStorage
      setUser(firebaseUser);
      localStorage.setItem("userEmail", firebaseUser.email);
      localStorage.setItem("userName", firebaseUser.displayName || "User");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-600 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Login to your account
        </p>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
            required
          />

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full"
              required
            />
            <p className="text-right text-sm mt-1 text-indigo-600 cursor-pointer hover:underline">
              Forgot password?
            </p>
          </div>

          <button className="btn btn-primary w-full">
            Login
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="btn btn-outline w-full border-indigo-500 text-indigo-600 hover:bg-indigo-50"
        >
          Login with Google
        </button>

        <div className="text-center text-sm mt-6 space-y-1">
          <p className="text-gray-600">Don’t have an account?</p>
          <div className="flex justify-center gap-3">
            <Link
              to="/join-hr"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register as HR
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/join-employee"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Register as Employee
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
