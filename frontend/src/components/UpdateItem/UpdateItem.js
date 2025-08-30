/*import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';


function UpdateItem() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    itemId: '',
    itemName: '',
    itemCategory: '',
    itemQty: '',
    itemDetails: '',
    itemImage: null,
  });

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/inventory/${id}`);
        const itemData = response.data;
        setFormData({
          itemId: itemData.itemId || '',
          itemName: itemData.itemName || '',
          itemCategory: itemData.itemCategory || '',
          itemQty: itemData.itemQty || '',
          itemDetails: itemData.itemDetails || '',
          itemImage: null
        });
      } catch (err) {
        console.error('error fetch data:', err);
      }
    };
    fetchItemData();
  }, [id]);

  const onInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('itemDetails', JSON.stringify({
      itemId: formData.itemId,
      itemName: formData.itemName,
      itemCategory: formData.itemCategory,
      itemDetails: formData.itemDetails,
      itemQty: formData.itemQty,
    }));

    if (formData.itemImage) {
      data.append('file', formData.itemImage);
    }

    try {
      const response = await axios.put(`http://localhost:8080/inventory/${id}`, data);
      alert("Item Updated");
      window.location.href = "/allitems";
    } catch (err) {
      console.error('error updating data:', err);
      alert("Error Updating Item");
    }
  };

  return (
    <div>
      <div>
        <h1>Update Item</h1>
        <form onSubmit={onSubmit}>
          <label htmlFor="itemId">Item ID:</label><br />
          <input type="text" id="itemId" name="itemId" onChange={onInputChange} value={formData.itemId} required /><br />

          <label htmlFor="itemName">Item Name:</label><br />
          <input type="text" id="itemName" name="itemName" onChange={onInputChange} value={formData.itemName} required /><br />

          <label htmlFor="itemCategory">Item Category:</label><br />
          <select id="itemCategory" name="itemCategory" onChange={onInputChange} value={formData.itemCategory} required>
            <option value="" disabled>Select Item Category</option>
            <option value="Apparel & Fashion">Apparel & Fashion</option>
            <option value="Electronics & Gadgets">Electronics & Gadgets</option>
            <option value="Health & Beauty">Health & Beauty</option>
            <option value="Food & Dining">Food & Dining</option>
            <option value="Home & Furniture">Home & Furniture</option>
          </select><br />

          <label htmlFor="itemQty">Item Quantity:</label><br />
          <input type="number" id="itemQty" name="itemQty" onChange={onInputChange} value={formData.itemQty} required /><br />

          <label htmlFor="itemDetails">Item Details:</label><br />
          <textarea id="itemDetails" name="itemDetails" rows="4" cols="30" onChange={onInputChange} value={formData.itemDetails} required></textarea><br />

          <label htmlFor="itemImage">Item Image:</label><br />
          <input 
          type="file" 
          id="itemImage" 
          name="itemImage" 
          accept="image/*" 
          onChange={onInputChange} 
          /><br />

          <button type="submit">Update Item</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateItem
*/

