
import React, { useEffect, useState } from "react";
import AddAssets from "./AddAssets";
import {
  PieChart, Pie, Cell, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid
} from "recharts";
import { toast } from "react-toastify";
const HrDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
    type: "Returnable",
    quantity: 0,
  });

  const [requests, setRequests] = useState([]);

  // Fetch assets from backend
  const fetchAssets = () => {
    fetch("http://localhost:3000/assets")
      .then((res) => res.json())
      .then((data) => {
        setAssets(data);
        setFilteredAssets(data);
      })
      .catch((err) => console.error(err));
  };

  // Fetch requests from backend
  const fetchRequests = () => {
    fetch("http://localhost:3000/requests")
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch(console.error);
  };

  useEffect(() => {
    fetchAssets();
    fetchRequests();
  }, []);

  useEffect(() => {
    let filtered = [...assets];
    const search = searchName.trim().toLowerCase();

    if (search) {
      filtered = filtered.filter(
        (a) => typeof a?.name === "string" && a.name.toLowerCase().includes(search)
      );
    }

    if (filterType !== "All") {
      filtered = filtered.filter((a) => a?.type === filterType);
    }

    setFilteredAssets(filtered);
  }, [searchName, filterType, assets]);

  // Delete Asset
  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this asset?")) return;
    fetch(`http://localhost:3000/assets/${id}`, { method: "DELETE" })
    
      .then(() => {
        toast.success("Asset deleted!");
        fetchAssets();
      })
      .catch(() =>toast.error("Delete failed")); 
  };

  // Open Edit Modal
  const handleEdit = (asset) => {
    setSelectedAsset(asset);
    setEditForm({
      name: asset.name,
      image: asset.image,
      type: asset.type,
      quantity: asset.quantity,
    });
    setIsEditOpen(true);
  };

  // Update asset
  const handleUpdate = (e) => {
    e.preventDefault();
    if (!selectedAsset) return;

    const updatedAsset = {
      name: editForm.name,
      type: editForm.type,
      quantity: editForm.quantity,
      availableQuantity: editForm.quantity,
      image: editForm.image,
      hrEmail: selectedAsset.hrEmail || "",
      dateAdded: selectedAsset.dateAdded || new Date(),
    };

    fetch(`http://localhost:3000/assets/${selectedAsset._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedAsset),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Update failed");
        return res.json();
      })
      .then(() => {
        fetchAssets();
        setIsEditOpen(false);
        setSelectedAsset(null);
      })
      .catch(console.error);
  };

  // ------------------- Analytics Data -------------------
  // Pie Chart: Returnable vs Non-returnable
  const pieData = [
    {
      name: "Returnable",
      value: assets.filter((a) => a.type === "Returnable").length,
    },
    {
      name: "Non-returnable",
      value: assets.filter((a) => a.type === "Non-returnable").length,
    },
  ];
  const COLORS = ["#4f46e5", "#f43f5e"];

  // Bar Chart: Top 5 most requested assets
  const topRequestedAssets = requests.reduce((acc, req) => {
    acc[req.assetName] = (acc[req.assetName] || 0) + 1;
    return acc;
  }, {});
  const barData = Object.entries(topRequestedAssets)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // --------------------------------------------------------

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">HR Asset List</h2>

      {/* Charts Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-indigo-600 text-center">Asset Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white p-4 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-2 text-indigo-600 text-center">Top 5 Requested Assets</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#4f46e5" radius={[5, 5, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          className="input input-bordered w-full md:w-1/2"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/3"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option>All</option>
          <option>Returnable</option>
          <option>Non-returnable</option>
        </select>
      </div>

      {/* Asset Table */}
      <div className="overflow-x-auto mt-6">
        <table className="table table-zebra w-full shadow-lg bg-white rounded-lg">
          <thead>
            <tr className="bg-indigo-100">
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Date Added</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  No assets found.
                </td>
              </tr>
            )}
            {filteredAssets.map((asset, idx) => (
              <tr key={asset._id}>
                <td>
                  <img
                    src={asset.image}
                    alt={asset.name}
                    className="w-16 h-16 rounded"
                  />
                </td>
                <td>{asset.name}</td>
                <td>{asset.type}</td>
                <td>{asset.quantity}</td>
                <td>{new Date(asset.dateAdded).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleEdit(asset)}
                    className="btn btn-sm bg-blue-500 "
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="btn btn-sm bg-red-500 btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {isEditOpen && selectedAsset && (
        <div className="modal modal-open">
          <div className="modal-box relative">
            <h3 className="text-xl font-bold mb-4 text-indigo-600">Edit Asset</h3>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Asset Name"
                required
              />
              <input
                value={editForm.image}
                onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                className="input input-bordered w-full"
                placeholder="Image URL"
              />
              <select
                value={editForm.type}
                onChange={(e) => setEditForm({ ...editForm, type: e.target.value })}
                className="select select-bordered w-full"
                required
              >
                <option>Returnable</option>
                <option>Non-returnable</option>
              </select>
              <input
                type="number"
                value={editForm.quantity}
                onChange={(e) => setEditForm({ ...editForm, quantity: Number(e.target.value) })}
                className="input input-bordered w-full"
                placeholder="Quantity"
                required
              />
              <div className="flex justify-end gap-2">
                <button type="button" onClick={() => setIsEditOpen(false)} className="btn btn-ghost">Cancel</button>
                <button type="submit" className="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HrDashboard;
