import { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; 
import { collection, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedStock, setUpdatedStock] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, "products");
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productList);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // 📝 Edit product function
  const handleEdit = (product) => {
    setEditingProduct(product.id);
    setUpdatedName(product.name);
    setUpdatedStock(product.stock);
    setUpdatedPrice(product.price);
  };

  const saveEdit = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        name: updatedName,
        stock: updatedStock,
        price: updatedPrice,
      });
      setEditingProduct(null);
      fetchProducts(); // Refresh data after edit
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // ❌ Delete product function
  const handleDelete = async (id) => {
    try {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border">
              <td className="border p-2">{product.id}</td>
              <td className="border p-2">
                {editingProduct === product.id ? (
                  <input
                    type="text"
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  product.name
                )}
              </td>
              <td className="border p-2">
                {editingProduct === product.id ? (
                  <input
                    type="number"
                    value={updatedStock}
                    onChange={(e) => setUpdatedStock(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  product.stock
                )}
              </td>
              <td className="border p-2">
                {editingProduct === product.id ? (
                  <input
                    type="number"
                    value={updatedPrice}
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  product.price
                )}
              </td>
              <td className="border p-2">
                {editingProduct === product.id ? (
                  <button
                    onClick={() => saveEdit(product.id)}
                    className="bg-green-500 text-white px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(product)}
                      className="bg-blue-500 text-white px-2 py-1 mr-2 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Products;
