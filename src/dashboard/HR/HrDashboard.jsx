import React, { useEffect, useState } from "react";
import AddAssets from "./AddAssets";

const HrDashboard = () => {
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

   // Controlled form state for editing
  const [editForm, setEditForm] = useState({
    name: "",
    image: "",
    type: "Returnable",
    quantity: 0,
  });

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

  useEffect(() => {
    fetchAssets();
  }, []);

  // Filter assets by name and type
   useEffect(() => {
    let filtered = [...assets];

    const search = searchName.trim().toLowerCase();

    if (search) {
      filtered = filtered.filter(
        (a) =>
          typeof a?.name === "string" &&
          a.name.toLowerCase().includes(search)
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
      .then(() => fetchAssets())
      .catch((err) => console.error(err));
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


  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-indigo-600 mb-4">HR Asset List</h2>

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
      )} {/* Edit Modal */}
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
