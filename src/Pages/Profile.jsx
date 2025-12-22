import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { role } = useRole();

  return (
    <div className="max-w-md bg-white p-6 rounded shadow">
      <h2 className="text-2xl  text-indigo-600 font-bold mb-4">My Profile</h2>

      <img
        src={user?.photoURL || "https://i.ibb.co.com/6Rc7hdTr/profile.jpg"}
        className="w-24 h-24 rounded-full mb-4"
      />

      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {role}</p>

      <input
        className="input input-bordered w-full mt-4"
        placeholder="Update name"
      />
      <button className="btn btn-primary mt-3 w-full">
        Update
      </button>
    </div>
  );
};

export default Profile;
