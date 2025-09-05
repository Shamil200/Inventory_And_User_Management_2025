import React, { useEffect, useState } from "react";
import axios from "axios";
//import { useParams } from "react-router-dom";

function Homee() {
  const [inventory, setInventory] = useState([]);
  //const { id } = useParams(); // if id param is used elsewhere

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

  const [searchQuery, setSearchQuery] = useState("");

  const filterData = inventory.filter(
    (item) =>
      item.itemId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="d-flex justify-content-end mt-3">
        <a href="/home" className="btn btn-link">HOME</a>
        <a href="/userProfile" className="btn btn-link text-success font-weight-bold">PROFILE</a>
        <a href="/login" className="btn btn-link">LOGOUT</a>
      </div>
      
      <div className="container mt-4">
        <h2 className="text-center mb-4">Inventory Items</h2>

        <div className="d-flex justify-content-between mb-3">
          <input
            type="text"
            className="form-control w-50"
            placeholder="Search by ID or Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
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
               
              </tr>
            ))}
          </tbody>
        </table>

        {filterData.length === 0 && (
          <p className="text-center text-muted mt-3">No items found.</p>
        )}
      </div>
    </div>
  );
}

export default Homee;
