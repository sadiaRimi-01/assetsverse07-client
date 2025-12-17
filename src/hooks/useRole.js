import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:3000/users/${user.email}`)
      .then(res => res.json())
      .then(data => {
        setRole(data?.role);
        setLoading(false);
      });
  }, [user]);

  return { role, loading };
};

export default useRole;
