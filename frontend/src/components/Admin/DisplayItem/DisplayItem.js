import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function DisplayItem() {
  const [inventory, setInventory] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const result = await axios.get("http://localhost:8080/inventory");
      setInventory(result.data);
    } catch (error) {
      console.error("Error loading inventory:", error);
    }
  };

  const updateNavigate = (itemId) => {
    window.location.href = `/updateitem/${itemId}`;
  };

  const deleteItem = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await axios.delete(`http://localhost:8080/inventory/${id}`);
        loadInventory();
        alert("Item deleted successfully");
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const genaratePdf = (inventory) => {
    const doc = new jsPDF("portrait");
    doc.text("Inventory Item List", 14, 10);
    const tableData = inventory.map((item) => [
      item.itemId,
      item.itemName,
      item.itemCategory,
      item.itemQty,
      item.itemDetails,
    ]);
    autoTable(doc, {
      head: [["Item ID", "Item Name", "Category", "Quantity", "Details"]],
      body: tableData,
      startY: 20,
    });
    doc.save("inventory_item_list.pdf");
  };

  const [searchQuery, setSearchQuery] = useState("");

  const filterData = inventory.filter(
    (item) =>
      item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Inventory Items</h2>

      <div
        className="d-flex justify-content-between mb-3"
        style={{ gap: "10px" }}
      >
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by ID or Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="d-flex" style={{ gap: "10px" }}>
          <button
            className="btn btn-danger"
            style={{ minWidth: "120px" }}
            onClick={() => (window.location.href = "/additem")}
          >
            Add Items
          </button>

          <button
            className="btn btn-danger"
            style={{ minWidth: "120px" }}
            onClick={() => genaratePdf(inventory)}
          >
            Generate PDF
          </button>
        </div>
      </div>

      <table className="table table-bordered table-hover text-center align-middle shadow-sm">
        <thead className="table-dark">
          <tr>
            <th>Item ID</th>
            <th>Image</th>
            <th>Item Name</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Details</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filterData.map((item, index) => (
            <tr key={index}>
              <td>{item.itemId}</td>
              <td>
                <img
                  src={`http://localhost:8080/upload/${item.itemImage}`}
                  alt={item.itemName}
                  width="60"
                  height="60"
                  className="rounded shadow-sm"
                />
              </td>
              <td>{item.itemName}</td>
              <td>{item.itemCategory}</td>
              <td>{item.itemQty}</td>
              <td>{item.itemDetails}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => updateNavigate(item.id)}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filterData.length === 0 && (
        <p className="text-center text-muted mt-3">No items found.</p>
      )}
    </div>
  );
}

export default DisplayItem;
