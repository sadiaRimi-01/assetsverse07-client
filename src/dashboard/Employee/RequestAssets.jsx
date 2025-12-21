// import { useContext, useEffect, useState } from "react";

// import { AuthContext } from "../../provider/AuthProvider";



// const RequestAssets = () => {

//     const { user: firebaseUser } = useContext(AuthContext); // Firebase logged-in user

//     const [user, setUser] = useState(null); // Local user info from localStorage

//     const [assets, setAssets] = useState([]);

//     const [selectedAsset, setSelectedAsset] = useState(null);

//     const [note, setNote] = useState("");

//     const [loading, setLoading] = useState(false);



//     // Load logged-in user info from localStorage

//     useEffect(() => {

//         const email = localStorage.getItem("userEmail");

//         const name = firebaseUser?.displayName || "User";



//         if (email) {

//             setUser({ email, displayName: name });

//         }

//     }, [firebaseUser]);



//     // Load all assets

//     const loadAssets = async () => {

//         try {

//             const res = await fetch("http://localhost:3000/assets");

//             let data = [];

//             try {

//                 data = await res.json();

//             } catch {

//                 data = [];

//             }

//             setAssets(data.filter((a) => a.availableQuantity > 0));

//         } catch (err) {

//             console.error("Failed to load assets:", err);

//         }

//     };



//     useEffect(() => {

//         loadAssets();

//     }, []);



//     const handleRequest = async () => {

//         if (!user?.email || !user?.displayName) {

//             alert("User not loaded. Please login.");

//             return;

//         }



//         if (!selectedAsset) {

//             alert("Please select an asset.");

//             return;

//         }



//         if (!note.trim()) {

//             alert("Please add a note.");

//             return;

//         }



//         if (!selectedAsset.hrEmail) {

//             alert("HR Email not found for this asset.");

//             return;

//         }



//         setLoading(true);



//         try {

//             const res = await fetch("http://localhost:3000/requests", {

//                 method: "POST",

//                 headers: { "Content-Type": "application/json" },

//                 body: JSON.stringify({

//                     assetId: selectedAsset._id,

//                     assetName: selectedAsset.name,

//                     assetType: selectedAsset.type,

//                     requesterName: user.displayName,

//                     requesterEmail: user.email,

//                     hrEmail: selectedAsset.hrEmail,

//                     companyName: selectedAsset.companyName || "",

//                     note,

//                 }),

//             });



//             let data = null;

//             try {

//                 data = await res.json();

//             } catch {

//                 data = { success: false, message: "Invalid server response" };

//             }



//             if (data.success) {

//                 alert("Request submitted successfully!");

//                 setSelectedAsset(null);

//                 setNote("");

//                 loadAssets();

//             } else {

//                 alert(data.message || "Failed to submit request.");

//             }

//         } catch (err) {

//             console.error("Error submitting request:", err);

//             alert("Error submitting request.");

//         } finally {

//             setLoading(false);

//         }

//     };



//     return (

//         <div className="min-h-screen p-6 bg-gray-50">

//             <h2 className="text-2xl  text-indigo-600 font-bold mb-6">Request Assets</h2>



//             {!user && <p>Loading user info...</p>}



//             {assets.length === 0 ? (

//                 <p>No assets available to request.</p>

//             ) : (

//                 <div className="grid md:grid-cols-3 gap-6">

//                     {assets.map((asset) => (

//                         <div

//                             key={asset._id}

//                             className="bg-white rounded shadow p-4 flex flex-col"

//                         >

//                             <img

//                                 src={asset.image}

//                                 alt={asset.name}

//                                 className="w-full h-40 object-cover rounded mb-2"

//                             />

//                             <h3 className="font-semibold text-lg">{asset.name}</h3>

//                             <p>Type: {asset.type}</p>

//                             <p>Available: {asset.availableQuantity}</p>



//                             <button

//                                 className="btn btn-primary mt-auto"

//                                 onClick={() => setSelectedAsset(asset)}

//                             >

//                                 Request

//                             </button>

//                         </div>

//                     ))}

//                 </div>

//             )}



//             {/* Modal */}

//             {selectedAsset && (

//                 <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">

//                     <div className="bg-white rounded p-6 w-96">

//                         <h3 className="text-xl font-bold mb-4">

//                             Request {selectedAsset.productName}

//                         </h3>



//                         <textarea

//                             className="textarea w-full mb-4"

//                             placeholder="Add a note"

//                             value={note}

//                             onChange={(e) => setNote(e.target.value)}

//                         />



//                         <div className="flex justify-end gap-2">

//                             <button

//                                 className="btn btn-sm btn-error"

//                                 onClick={() => {

//                                     setSelectedAsset(null);

//                                     setNote("");

//                                 }}

//                             >

//                                 Cancel

//                             </button>



//                             <button

//                                 className="btn btn-sm btn-primary"

//                                 onClick={handleRequest}

//                                 disabled={loading}

//                             >

//                                 {loading ? "Submitting..." : "Submit Request"}

//                             </button>

//                         </div>

//                     </div>

//                 </div>

//             )}

//         </div>

//     );

// };



// export default RequestAssets;
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const RequestAssets = () => {
  const { user: firebaseUser } = useContext(AuthContext); // Firebase logged-in user
  const [user, setUser] = useState(null); // Local user info from localStorage
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10; // items per page

  // Load logged-in user info from localStorage
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    const name = firebaseUser?.displayName || "User";

    if (email) {
      setUser({ email, displayName: name });
    }
  }, [firebaseUser]);

  // Load assets with server-side pagination
  const loadAssets = async (page = 1) => {
    try {
      const res = await fetch(`http://localhost:3000/assets?page=${page}&limit=${pageSize}`);
      const data = await res.json();
      // data should contain { assets: [...], total: N } structure from backend
      setAssets(data.assets.filter(a => a.availableQuantity > 0));
      setTotalPages(Math.ceil(data.total / pageSize));
      setPage(page);
    } catch (err) {
      console.error("Failed to load assets:", err);
      setAssets([]);
    }
  };

  useEffect(() => {
    loadAssets(page);
  }, []);

  // Handle request submission (no change from your code)
  const handleRequest = async () => {
    if (!user?.email || !user?.displayName) {
      alert("User not loaded. Please login.");
      return;
    }
    if (!selectedAsset) {
      alert("Please select an asset.");
      return;
    }
    if (!note.trim()) {
      alert("Please add a note.");
      return;
    }
    if (!selectedAsset.hrEmail) {
      alert("HR Email not found for this asset.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assetId: selectedAsset._id,
          assetName: selectedAsset.name,
          assetType: selectedAsset.type,
          requesterName: user.displayName,
          requesterEmail: user.email,
          hrEmail: selectedAsset.hrEmail,
          companyName: selectedAsset.companyName || "",
          note,
        }),
      });

      let data = null;
      try {
        data = await res.json();
      } catch {
        data = { success: false, message: "Invalid server response" };
      }

      if (data.success) {
        alert("Request submitted successfully!");
        setSelectedAsset(null);
        setNote("");
        loadAssets(page);
      } else {
        alert(data.message || "Failed to submit request.");
      }
    } catch (err) {
      console.error("Error submitting request:", err);
      alert("Error submitting request.");
    } finally {
      setLoading(false);
    }
  };

  // Pagination controls
  const handlePrevious = () => {
    if (page > 1) loadAssets(page - 1);
  };
  const handleNext = () => {
    if (page < totalPages) loadAssets(page + 1);
  };
  const handlePageClick = (p) => loadAssets(p);

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <h2 className="text-2xl text-indigo-600 font-bold mb-6">Request Assets</h2>

      {!user && <p>Loading user info...</p>}

      {assets.length === 0 ? (
        <p>No assets available to request.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-3 gap-6">
            {assets.map((asset) => (
              <div key={asset._id} className="bg-white rounded shadow p-4 flex flex-col">
                <img
                  src={asset.image}
                  alt={asset.name}
                  className="w-full h-40 object-cover rounded mb-2"
                />
                <h3 className="font-semibold text-lg">{asset.name}</h3>
                <p>Type: {asset.type}</p>
                <p>Available: {asset.availableQuantity}</p>
                <button
                  className="btn btn-primary mt-auto"
                  onClick={() => setSelectedAsset(asset)}
                >
                  Request
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-6 gap-2">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={handlePrevious}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                className={`btn btn-sm ${p === page ? "btn-primary" : "btn-outline"}`}
                onClick={() => handlePageClick(p)}
              >
                {p}
              </button>
            ))}
            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded p-6 w-96">
            <h3 className="text-xl font-bold mb-4">
              Request {selectedAsset.productName}
            </h3>

            <textarea
              className="textarea w-full mb-4"
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sm btn-error"
                onClick={() => {
                  setSelectedAsset(null);
                  setNote("");
                }}
              >
                Cancel
              </button>

              <button
                className="btn btn-sm btn-primary"
                onClick={handleRequest}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAssets;
