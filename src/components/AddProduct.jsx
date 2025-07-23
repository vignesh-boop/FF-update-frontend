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
    <form onSubmit={submitHandler}>
      <input type="text" name="name" placeholder="Name" value={product.name} onChange={handleInputChange} />
      <input type="text" name="brand" placeholder="Brand" value={product.brand} onChange={handleInputChange} />
      <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleInputChange} />
      <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleInputChange} />
      <select name="category" value={product.category} onChange={handleInputChange}>
        <option value="">Select Category</option>
        <option value="Flower">Flower</option>
        <option value="Fertilizer">Fertilizer</option>
      </select>
      <input type="number" name="stockQuantity" placeholder="Stock" value={product.stockQuantity} onChange={handleInputChange} />
      <input type="date" name="releaseDate" value={product.releaseDate} onChange={handleInputChange} />
      <input type="checkbox" name="productAvailable" checked={product.productAvailable} onChange={(e) => setProduct({ ...product, productAvailable: e.target.checked })} /> Product Available
      <input type="file" onChange={handleImageChange} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default AddProduct;
