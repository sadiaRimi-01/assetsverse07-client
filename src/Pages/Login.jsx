import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await loginUser(email, password);
      alert("Login Successful");
    } catch {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await googleLogin();
      alert(`Welcome ${user.displayName || user.email}`);
      // send to backend if needed
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl w-96 shadow-lg space-y-4">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
        <button className="btn btn-neutral w-full">Login</button>
        <button type="button" onClick={handleGoogleLogin} className="btn btn-red-500 w-full mt-2">Login with Google</button>
      </form>
    </div>
  );
};

export default Login;
