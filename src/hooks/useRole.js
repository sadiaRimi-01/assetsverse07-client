

import { useEffect, useState } from "react";

const useRole = () => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (!email) {
      setLoading(false);
      return;
    }

    const fetchRole = async () => {
      try {
        const res = await fetch(`http://localhost:3000/users/${email}`);
        if (!res.ok) {
          setRole(null);
          setLoading(false);
          return;
        }

        let data = null;
        try {
          data = await res.json();
        } catch {
          data = null;
        }

        setRole(data?.role || null);
      } catch (err) {
        console.error(err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchRole();
  }, []);

  return { role, loading };
};

export default useRole;
