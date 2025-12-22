import { useContext, useEffect, useState, useRef } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-toastify";
const MyAssets = () => {
  const { user } = useContext(AuthContext);
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const printRef = useRef();

  // Load assigned assets
  const loadAssets = async () => {
    const res = await fetch(
      `https://assetsverse-app-server.vercel.app/assigned-assets?email=${user.email}`
    );
    const data = await res.json();
    setAssets(data);
  };

  useEffect(() => {
    loadAssets();
  }, [user]);

  // Handle return asset
  const handleReturn = async (asset) => {
    if (!window.confirm("Are you sure you want to return this asset?")) return;

    const res = await fetch(`https://assetsverse-app-server.vercel.app/return-asset/${asset._id}`, {
      method: "PATCH",
    });
    const data = await res.json();
    if (data.success) {
      toast.success("Asset returned successfully");
      loadAssets();
    } else {
      toast.error("Failed to return asset");
    }
  };

  // Filtered assets
  const filteredAssets = assets.filter((a) => {
    const matchesSearch =
      (a.assetName || "").toLowerCase().includes(search.toLowerCase());


    const matchesType = filterType === "all" || a.assetType === filterType;
    return matchesSearch && matchesType;
  });

  // Print handler
  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const newWindow = window.open("", "", "width=900,height=600");
    newWindow.document.write("<html><head><title>My Assets</title></head><body>");
    newWindow.document.write(printContent);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
    newWindow.print();
  };

  return (
    <div className="p-6 bg-white rounded shadow min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl  text-indigo-600 font-bold mb-2">My Assets</h2>
        <div className="flex gap-2">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <input
              type="text"
              placeholder="Search by name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input input-bordered input-sm"
            />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="select select-sm"
            >
              <option value="all">All Types</option>
              <option value="Returnable">Returnable</option>
              <option value="Non-returnable">Non-returnable</option>
            </select>
          </div>
          <button onClick={handlePrint} className="btn btn-sm btn-primary">
            Print
          </button>
        </div>
      </div>

      <div ref={printRef} className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Type</th>
              <th>Company</th>

              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center text-gray-400 py-4">
                  No assets found
                </td>
              </tr>
            ) : (
              filteredAssets.map((a, index) => (
                <tr key={a._id}>
                  <td>{index + 1}</td>
                  <td>{a.assetName}</td>
                  <td>{a.assetType}</td>
                  <td>{a.companyName}</td>

                  <td className="capitalize">{a.status}</td>
                  <td>
                    {a.assetType === "Returnable" && a.status === "assigned" && (
                      <button
                        onClick={() => handleReturn(a)}
                        className="btn btn-sm btn-warning"
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;