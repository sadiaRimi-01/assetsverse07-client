import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const JoinAsEmployee = () => {
    const { createUser } = useContext(AuthContext);

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
            if (data.message === "user-exists") alert("Email already registered. Please login.");
            else alert("Employee Registered Successfully!");
        } catch (error) {
            if (error.code === "auth/email-already-in-use") alert("Email already registered. Please login.");
            else console.error(error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-cyan-500">
            <form onSubmit={handleRegister} className="bg-white p-8 rounded-xl w-96 shadow-lg space-y-4">
                <h2 className="text-2xl font-bold text-center">Join as Employee</h2>
                <input name="name" placeholder="Full Name" className="input input-bordered w-full" required />
                <input name="email" type="email" placeholder="Email" className="input input-bordered w-full" required />
                <input name="password" type="password" placeholder="Password" className="input input-bordered w-full" required />
                <input name="dob" type="date" className="input input-bordered w-full" required />
                <button className="btn btn-info w-full">Register</button>
            </form>
        </div>
    );
};

export default JoinAsEmployee;
