import { useState } from "react";
import { db } from "../firebaseConfig"; // Import Firestore database
import { collection, addDoc } from "firebase/firestore";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !stock) {
      alert("Please fill all fields!");
      return;
    }

    try {
      // Add product to Firestore
      await addDoc(collection(db, "products"), {
        name: productName,
        stock: Number(stock),
        price: Number(price),
      });

      alert("Product added successfully!");
      setProductName("");
      setStock("");
      setPrice("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
