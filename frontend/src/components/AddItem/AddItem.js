import React, { useState } from 'react';
import axios from 'axios';

function AddItem() {
  const [inventory, setInventory] = useState({
    itemId: '',
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: '',
    itemImage: null,
  });

  // Handle input change
  const onInputChange = (e) => {
    if (e.target.name === 'itemImage') {
      setInventory({ ...inventory, itemImage: e.target.files[0] });
    } else {
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inventory.itemImage) {
      alert('Please select an image.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', inventory.itemImage);

      const imageUploadResponse = await axios.post(
        'http://localhost:8080/inventory/itemImage',
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );

      const imageName = imageUploadResponse.data;

      const inventoryData = {
        itemId: inventory.itemId,
        itemName: inventory.itemName,
        itemCategory: inventory.itemCategory,
        itemQty: inventory.itemQty,
        itemDetails: inventory.itemDetails,
        itemImage: imageName,
      };

      await axios.post('http://localhost:8080/inventory', inventoryData);

      alert('Item added successfully');
      setInventory({
        itemId: '',
        itemName: '',
        itemCategory: '',
        itemQty: '',
        itemDetails: '',
        itemImage: null,
      });
    } catch (error) {
      console.error('Error submitting the item:', error);
      alert('Error adding item. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Add New Item</h3>
        <form onSubmit={onSubmit}>
          
          <div className="mb-3">
            <label htmlFor="itemId" className="form-label">Item ID</label>
            <input
              type="text"
              className="form-control"
              id="itemId"
              name="itemId"
              onChange={onInputChange}
              value={inventory.itemId}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="itemName" className="form-label">Item Name</label>
            <input
              type="text"
              className="form-control"
              id="itemName"
              name="itemName"
              onChange={onInputChange}
              value={inventory.itemName}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="itemCategory" className="form-label">Item Category</label>
            <select
              className="form-select"
              id="itemCategory"
              name="itemCategory"
              onChange={onInputChange}
              value={inventory.itemCategory}
              required
            >
              <option value="" disabled>Select Item Category</option>
              <option value="Apparel & Fashion">Apparel & Fashion</option>
              <option value="Electronics & Gadgets">Electronics & Gadgets</option>
              <option value="Health & Beauty">Health & Beauty</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Home & Furniture">Home & Furniture</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="itemQty" className="form-label">Item Quantity</label>
            <input
              type="number"
              className="form-control"
              id="itemQty"
              name="itemQty"
              onChange={onInputChange}
              value={inventory.itemQty}
              required
              min="1"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="itemDetails" className="form-label">Item Details</label>
            <textarea
              className="form-control"
              id="itemDetails"
              name="itemDetails"
              rows="4"
              onChange={onInputChange}
              value={inventory.itemDetails}
              required
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="itemImage" className="form-label">Item Image</label>
            <input
              type="file"
              className="form-control"
              id="itemImage"
              name="itemImage"
              accept="image/*"
              onChange={onInputChange}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Add Item</button>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
