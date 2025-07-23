import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    description: "",
    price: "",
    category: "",
    stockQuantity: "",
    releaseDate: "",
    productAvailable: false,
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    const formattedProduct = {
      ...product,
      price: parseFloat(product.price),
      stockQuantity: parseInt(product.stockQuantity),
    };

    const formData = new FormData();
    formData.append("imageFile", image);
    formData.append(
      "product",
      new Blob([JSON.stringify(formattedProduct)], {
        type: "application/json",
      })
    );

    try {
      const res = await axios.post(
        "https://ff-update-backend-6.onrender.com/api/product",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("✅ Product added:", res.data);
      alert("Product added successfully");
    } catch (err) {
      console.error("❌ Failed to add product:", err);
      alert(`Error: ${err.response?.data || err.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <h2 style={{ textAlign: "center" }}>Add New Product</h2>
      <form onSubmit={submitHandler} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleInputChange} required />
        <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleInputChange} required />
        <textarea name="description" placeholder="Description" value={product.description} onChange={handleInputChange} required></textarea>
        <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleInputChange} required />
        <select name="category" value={product.category} onChange={handleInputChange} required>
          <option value="">Select Category</option>
          <option value="Flower">Flower</option>
          <option value="Fertilizer">Fertilizer</option>
        </select>
        <input type="number" name="stockQuantity" placeholder="Stock Quantity" value={product.stockQuantity} onChange={handleInputChange} required />
        <input type="date" name="releaseDate" value={product.releaseDate} onChange={handleInputChange} required />
        <label>
          <input
            type="checkbox"
            name="productAvailable"
            checked={product.productAvailable}
            onChange={(e) =>
              setProduct({ ...product, productAvailable: e.target.checked })
            }
          />
          {" "}Product Available
        </label>
        <input type="file" onChange={handleImageChange} accept="image/*" required />
        <button type="submit" style={{ padding: "10px", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px" }}>Submit</button>
      </form>
    </div>
  );
};

export default AddProduct;
