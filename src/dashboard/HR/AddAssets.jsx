import React, { useState } from "react";

const AddAssets = ({ onAdd }) => {
  const [asset, setAsset] = useState({
    name: "",
    image: "",
    type: "Returnable",
    quantity: 1,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAsset = { ...asset, dateAdded: new Date().toISOString() };

    fetch("http://localhost:3000/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAsset),
    })
      .then((res) => res.json())
      .then(() => {
        setAsset({ name: "", image: "", type: "Returnable", quantity: 1 });
        if (onAdd) onAdd();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-indigo-600 mb-4">Add New Asset</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="input input-bordered w-full"
          value={asset.name}
          onChange={(e) => setAsset({ ...asset, name: e.target.value })}
          required
        />
        <input
          type="url"
          placeholder="Product Image URL"
          className="input input-bordered w-full"
          value={asset.image}
          onChange={(e) => setAsset({ ...asset, image: e.target.value })}
          required
        />
        <select
          className="select select-bordered w-full"
          value={asset.type}
          onChange={(e) => setAsset({ ...asset, type: e.target.value })}
        >
          <option>Returnable</option>
          <option>Non-returnable</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          className="input input-bordered w-full"
          value={asset.quantity}
          onChange={(e) => setAsset({ ...asset, quantity: Number(e.target.value) })}
          min={1}
          required
        />
        <button type="submit" className="btn  bg-blue-400 mt-2">
          Add Asset
        </button>
      </form>
    </div>
  );
};

export default AddAssets;
