import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig"; // Go up one directory

import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState(0); // Change from revenue to orders

  useEffect(() => {
    // Fetch Products
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setProducts(querySnapshot.docs.map(doc => doc.data()));
    };

    // Fetch Users
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUsers(querySnapshot.docs.map(doc => doc.data()));
    };

    // Fetch Total Orders
    const fetchOrders = async () => {
      const querySnapshot = await getDocs(collection(db, "orders"));
      setOrders(querySnapshot.size); // Get total number of orders
    };

    fetchProducts();
    fetchUsers();
    fetchOrders();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Tech trolley</h1>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Dashboard</h2>

        <div className="grid grid-cols-3 gap-4 mt-4">
          {/* Total Products */}
          <div className="bg-blue-500 text-white p-4 rounded-md">
            <h3 className="text-lg">Total Products</h3>
            <p className="text-2xl font-bold">{products.length}</p>
          </div>

          {/* Total Users */}
          <div className="bg-green-500 text-white p-4 rounded-md">
            <h3 className="text-lg">Total Users</h3>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>

          {/* Total Orders */}
          <div className="bg-purple-500 text-white p-4 rounded-md">
            <h3 className="text-lg">Total Orders</h3>
            <p className="text-2xl font-bold">{orders}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
