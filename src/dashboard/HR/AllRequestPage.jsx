import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const AllRequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load all pending requests and assets
  const loadData = async () => {
    const reqRes = await fetch("https://assetsverse-app-server.vercel.app/requests");
    const reqData = await reqRes.json();
    setRequests(reqData);

    const assetRes = await fetch("https://assetsverse-app-server.vercel.app/assets");
    const assetData = await assetRes.json();
    setAssets(assetData);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Approve request
  const handleApprove = async (request) => {
    const asset = assets.find((a) => a._id === request.assetId);
    if (!asset || asset.availableQuantity <= 0) {
      toast.error("Asset not available");
      return;
    }

    if (!window.confirm(`Approve request for ${request.requesterEmail}?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`https://assetsverse-app-server.vercel.app/approve-request/${request._id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Request approved!");
        loadData();
      } else {
        toast.error("Approval failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error approving request");
    } finally {
      setLoading(false);
    }
  };

  // Reject request
  const handleReject = async (request) => {
    if (!window.confirm(`Reject request for ${request.requesterEmail}?`)) return;

    setLoading(true);
    try {
      const res = await fetch(`https://assetsverse-app-server.vercel.app/reject-request/${request._id}`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Request rejected!");
        loadData();
      } else {
        toast.error("Reject failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error rejecting request");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded shadow min-h-screen">
      <h2 className="text-2xl  text-indigo-600 font-bold mb-4">All Employee Asset Requests</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Employee</th>
              <th>Asset</th>
              <th>Type</th>
              <th>Company</th>
              <th>Request Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 py-4">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((r) => (
                <tr key={r._id}>
                  <td>{r.requesterEmail}</td>
                  <td>{r.assetName}</td>
                  <td>{r.assetType}</td>
                  <td>{r.companyName}</td>
                  <td>{new Date(r.requestDate).toLocaleDateString()}</td>
                  <td className="capitalize">{r.requestStatus}</td>
                  <td className="flex gap-2">
                    {r.requestStatus === "pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(r)}
                          disabled={loading}
                          className="btn btn-sm btn-primary"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(r)}
                          disabled={loading}
                          className="btn btn-sm btn-error"
                        >
                          Reject
                        </button>
                      </>
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

export default AllRequestPage;