// import { useContext } from "react";
// import { AuthContext } from "../provider/AuthProvider";

// const JoinAsHR = () => {
//     const { createUser } = useContext(AuthContext);

//     const handleRegister = async (e) => {
//         e.preventDefault();
//         const form = e.target;
//         const hrUser = {
//             name: form.name.value,
//             companyName: form.companyName.value,
//             companyLogo: form.companyLogo.value,
//             email: form.email.value,
//             dateOfBirth: form.dob.value,
//             role: "hr",
//             packageLimit: 5,
//             currentEmployees: 0,
//             subscription: "basic",
//         };

//         try {
//             await createUser(hrUser.email, form.password.value);
//             const res = await fetch("http://localhost:3000/users", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(hrUser),
//             });
//             const data = await res.json();
//             if (data.message === "user-exists") alert("User already exists. Please login.");
//             else alert("HR Registered Successfully!");
//         } catch (error) {
//             if (error.code === "auth/email-already-in-use") alert("Email already in use. Please login.");
//             else console.error(error);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
//             <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl w-96 shadow-lg space-y-4">
//                 <h2 className="text-2xl font-bold text-center">Join as HR</h2>
//                 <input name="name" placeholder="Full Name" className="input input-bordered w-full" required />
//                 <input name="companyName" placeholder="Company Name" className="input input-bordered w-full" required />
//                 <input name="companyLogo" placeholder="Company Logo URL" className="input input-bordered w-full" />
//                 <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
//                 <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
//                 <input name="dob" type="date" className="input input-bordered w-full" required />
//                 <button className="btn btn-primary w-full">Register</button>
//             </form>
//         </div>
//     );
// };

// export default JoinAsHR;











import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const JoinAsHR = () => {
  const { createUser } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const hrUser = {
      name: form.name.value,
      companyName: form.companyName.value,
      email: form.email.value,
      role: "hr",
    };

    await createUser(hrUser.email, form.password.value);

    await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hrUser),
    });

    alert("HR Registered Successfully");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-500">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl w-96 space-y-4">
        <h2 className="text-xl font-bold text-center">Join as HR</h2>
        <input name="name" placeholder="Full Name" className="input input-bordered w-full" required />
        <input name="companyName" placeholder="Company Name" className="input input-bordered w-full" required />
        <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
        <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
        <button className="btn btn-primary w-full">Register</button>
      </form>
    </div>
  );
};

export default JoinAsHR;
