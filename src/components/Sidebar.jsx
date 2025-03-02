import { Link } from "react-router-dom";
import { FaTachometerAlt, FaBoxOpen, FaUsers, FaPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <h1 className="text-2xl font-bold">Tech Trolley</h1>
      <ul className="mt-5">
        <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
          <Link to="/" className="flex items-center w-full">
            <FaTachometerAlt className="mr-3" /> Dashboard
          </Link>
        </li>
        <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
          <Link to="/products" className="flex items-center w-full">
            <FaBoxOpen className="mr-3" /> Products
          </Link>
        </li>
        <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
          <Link to="/add-product" className="flex items-center w-full">
            <FaPlus className="mr-3" /> Add Product
          </Link>
        </li>
        <li className="flex items-center p-3 hover:bg-gray-700 cursor-pointer">
          <Link to="/users" className="flex items-center w-full">
            <FaUsers className="mr-3" /> Users
          </Link>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;
