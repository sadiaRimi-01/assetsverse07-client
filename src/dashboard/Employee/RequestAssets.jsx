import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../provider/AuthProvider";

import { toast } from "react-toastify";
const PAGE_SIZE = 9;
const RequestAssets = () => {

  const { user: firebaseUser } = useContext(AuthContext);

  const [user, setUser] = useState(null);

  const [assets, setAssets] = useState([]);

  const [selectedAsset, setSelectedAsset] = useState(null);

  const [note, setNote] = useState("");

  const [loading, setLoading] = useState(false);


  // pagination state
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  // Load paginated assets
  const loadAssets = async (currentPage = page) => {
    try {
      const res = await fetch(
        `https://assetsverse-app-server.vercel.app/assets/available/paginated?page=${currentPage}&limit=${PAGE_SIZE}`
      );
      const data = await res.json();

      setAssets(data.assets || []);
      setTotalPages(data.pagination?.totalPages || 1);
    } catch (err) {
      console.error("Failed to load assets:", err);
    }
  };
  useEffect(() => {
    loadAssets(page);
  }, [page]);
  // Load logged-in user info from localStorage

  useEffect(() => {

    const email = localStorage.getItem("userEmail");

    const name = firebaseUser?.displayName || "User";



    if (email) {

      setUser({ email, displayName: name });

    }

  }, [firebaseUser]);



  // Load all assets

  // const loadAssets = async () => {

  //     try {

  //         const res = await fetch("https://assetsverse-app-server.vercel.app/assets");

  //         let data = [];

  //         try {

  //             data = await res.json();

  //         } catch {

  //             data = [];

  //         }

  //         setAssets(data.filter((a) => a.availableQuantity > 0));

  //     } catch (err) {

  //         console.error("Failed to load assets:", err);

  //     }

  // };



  // useEffect(() => {

  //     loadAssets();

  // }, []);



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

      toast.warning("Please add a note");

      return;

    }



    if (!selectedAsset.hrEmail) {

      alert("HR Email not found for this asset.");

      return;

    }



    setLoading(true);



    try {

      const res = await fetch("https://assetsverse-app-server.vercel.app/requests", {

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

        toast.success("Request submitted successfully");

        setSelectedAsset(null);

        setNote("");

        loadAssets();

      } else {

        alert(data.message || "Failed to submit request.");

      }

    } catch (err) {

      console.error("Error submitting request:", err);

      toast.error("Error submitting request");

    } finally {

      setLoading(false);

    }

  };



  return (

    <div className="min-h-screen p-6 bg-gray-50">

      <h2 className="text-2xl  text-indigo-600 font-bold mb-6">Request Assets</h2>



      {!user && <p>Loading user info...</p>}



      {/* {assets.length === 0 ? (

                <p>No assets available to request.</p>

            ) : (

                <div className="grid md:grid-cols-3 gap-6">

                    {assets.map((asset) => (

                        <div

                            key={asset._id}

                            className="bg-white rounded shadow p-4 flex flex-col"

                        >

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
                // ---------
                

            )} */}

      {assets.length === 0 ? (
        <p>No assets available.</p>
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
          <div className="flex justify-center gap-2 mt-6">
            <button
              className="btn btn-sm"
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages).keys()].map((n) => (
              <button
                key={n}
                className={`btn btn-sm ${page === n + 1 ? "btn-primary" : ""}`}
                onClick={() => setPage(n + 1)}
              >
                {n + 1}
              </button>
            ))}

            <button
              className="btn btn-sm"
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
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
