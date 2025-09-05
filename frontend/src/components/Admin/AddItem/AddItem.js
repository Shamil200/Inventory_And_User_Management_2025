import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const styles = {
  header: {
    color: "#2c5d2f",
    fontWeight: "600",
    fontSize: "2rem",
    textTransform: "uppercase",
    marginBottom: "1rem",
    textAlign: "center",
  },
  submitBtn: {
    backgroundColor: "#2c5d2f",
    borderColor: "#2c5d2f",
    textTransform: "uppercase",
    fontWeight: "600",
    padding: "10px",
  },
  formRow: {
    marginBottom: "20px",
  },
};

function AddItem() {
  const navigate = useNavigate();

  const [inventory, setInventory] = useState({
    itemId: "",
    itemName: "",
    itemCategory: "",
    itemQty: "",
    itemDetails: "",
    itemImage: null,
  });

  const onInputChange = (e) => {
    if (e.target.name === "itemImage") {
      setInventory({ ...inventory, itemImage: e.target.files[0] });
    } else {
      setInventory({ ...inventory, [e.target.name]: e.target.value });
    }
  };

  const generateItemId = () => {
    const prefix = "ID";
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `${prefix}-${randomNumber}`;
  };

  useEffect(() => {
    setInventory((prev) => ({
      ...prev,
      itemId: generateItemId(),
    }));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inventory.itemImage) {
      alert("Please select an image.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", inventory.itemImage);
      const imageUploadResponse = await axios.post(
        "http://localhost:8080/inventory/itemImage",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
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
      await axios.post("http://localhost:8080/inventory", inventoryData);
      alert("Item added successfully");
      navigate("/allitems");
      setInventory({
        itemId: generateItemId(),
        itemName: "",
        itemCategory: "",
        itemQty: "",
        itemDetails: "",
        itemImage: null,
      });
    } catch (error) {
      console.error("Error submitting the item:", error);
      alert("Error adding item. Please try again.");
    }
  };

  return (
    <Container
      fluid
      className="vh-100 d-flex justify-content-center align-items-start"
      style={{ backgroundColor: "#f9f9f9", paddingTop: "80px" }} // Pushing container content 80px down
    >
      <Row className="w-100 justify-content-center">
        <Col xs={12} md={10} lg={8} xl={6}>
          <div className="card shadow p-4">
            <h3 style={styles.header}>Add Item</h3>
            <Form onSubmit={onSubmit}>
              <Form.Group controlId="itemId" style={styles.formRow}>
                <Form.Label className="text-uppercase fw-semibold">
                  Item ID
                </Form.Label>
                <Form.Control
                  type="text"
                  name="itemId"
                  value={inventory.itemId}
                  readOnly
                  style={{ height: "38px" }}
                />
              </Form.Group>

              <Form.Group controlId="itemName" style={styles.formRow}>
                <Form.Label className="text-uppercase fw-semibold">
                  Item Name
                </Form.Label>
                <Form.Control
                  type="text"
                  name="itemName"
                  value={inventory.itemName}
                  onChange={onInputChange}
                  required
                  style={{ height: "38px" }}
                />
              </Form.Group>

              <Form.Group controlId="itemCategory" style={styles.formRow}>
                <Form.Label className="text-uppercase fw-semibold">
                  Item Category
                </Form.Label>
                <Form.Select
                  name="itemCategory"
                  value={inventory.itemCategory}
                  onChange={onInputChange}
                  required
                  style={{ height: "38px" }}
                >
                  <option value="" disabled>
                    Select Item Category
                  </option>
                  <option value="Apparel & Fashion">Apparel & Fashion</option>
                  <option value="Electronics & Gadgets">
                    Electronics & Gadgets
                  </option>
                  <option value="Health & Beauty">Health & Beauty</option>
                  <option value="Food & Dining">Food & Dining</option>
                  <option value="Home & Furniture">Home & Furniture</option>
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="itemQty" style={styles.formRow}>
                <Form.Label className="text-uppercase fw-semibold">
                  Item Quantity
                </Form.Label>
                <Form.Control
                  type="number"
                  name="itemQty"
                  value={inventory.itemQty}
                  onChange={onInputChange}
                  min="1"
                  required
                  style={{ height: "38px" }}
                />
              </Form.Group>

              <Form.Group controlId="itemDetails" style={styles.formRow}>
                <Form.Label className="text-uppercase fw-semibold">
                  Item Details
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="itemDetails"
                  value={inventory.itemDetails}
                  onChange={onInputChange}
                  required
                />
              </Form.Group>

              <Form.Group controlId="itemImage" className="mb-4">
                <Form.Label className="text-uppercase fw-semibold">
                  Item Image
                </Form.Label>
                <Form.Control
                  type="file"
                  name="itemImage"
                  accept="image/*"
                  onChange={onInputChange}
                  required
                />
              </Form.Group>

              <Button
                type="submit"
                variant="success"
                className="w-100 text-uppercase fw-semibold"
                style={styles.submitBtn}
              >
                Submit
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AddItem;
