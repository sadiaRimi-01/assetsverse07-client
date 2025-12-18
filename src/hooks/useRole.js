// // import { useContext, useEffect, useState } from "react";
// // import { AuthContext } from "../provider/AuthProvider";

// // const useRole = () => {
// //   const { user } = useContext(AuthContext);
// //   const [role, setRole] = useState(null);
// //   const [loading, setLoading] = useState(true);

// //  useEffect(() => {
// //   if (!user?.email) return;

// //   fetch(`http://localhost:3000/users/${user.email}`)
// //     .then(async (res) => {
// //       if (!res.ok) return null; // 404 or empty
// //       try {
// //         return await res.json();
// //       } catch {
// //         return null; // empty body
// //       }
// //     })
// //     .then(data => {
// //       setRole(data?.role || null);
// //       setLoading(false);
// //     });
// // }, [user]);

// //   return { role, loading };
// // };

// // export default useRole;








// import { useEffect, useState } from "react";

// const useRole = () => {
//   const [role, setRole] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const email = localStorage.getItem("userEmail");
//     if (!email) {
//       setLoading(false);
//       return;
//     }

//     const fetchRole = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/users/${email}`);
//         if (!res.ok) {
//           setRole(null);
//           setLoading(false);
//           return;
//         }

//         // Safe JSON parsing
//         let data = null;
//         try {
//           data = await res.json();
//         } catch {
//           data = null;
//         }

//         setRole(data?.role || null);
//       } catch (err) {
//         console.error(err);
//         setRole(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchRole();
//   }, []);

//   return { role, loading };
// };

// export default useRole;








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
