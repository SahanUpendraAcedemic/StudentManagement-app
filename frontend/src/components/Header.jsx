import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PopupWindow from "./PopupWindow";

export default function Header() {
  const navigate = useNavigate();
  const user = sessionStorage.getItem("user");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handellogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      navigate("/");
    }
  };

  return (
    <div className="flex flex-row justify-between sticky top-0 p-5 bg-primary text-white rounded-b rounded-b-2xl shadow-md z-50">
      <Link to={"/"}>
        <h1 className="text-5xl">Acedemia</h1>
      </Link>
      <nav className=" justify-between space-x-4">
        {user == null ? (
          <ul className="flex flex-row space-x-4">
            <Link
              to={"/signin"}
              className=" text-white p-2 px-5 hover:underline "
            >
              Login
            </Link>
            <Link
              to={"/signup"}
              className="rounded-lg bg-white text-black p-2 px-5 border border-black hover:bg-primary hover:border hover:border-white hover:text-white animate-pulse"
            >
              Sign Up
            </Link>
          </ul>
        ) : (
          <ul className="flex flex-row space-x-4">
            <Link
              to={"/account"}
              className=" text-white p-2 px-5 hover:underline "
            >
              Account
            </Link>
            <button
              className="rounded-lg bg-white text-black p-2 px-5 border border-black hover:bg-primary hover:border hover:border-white hover:text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Log Out
            </button>
          </ul>
        )}
      </nav>
      {/* Reusable Modal Component */}
      <PopupWindow
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handellogout}
        title="Confirm Logout"
        message="Are you sure you want to log out?"
        confirmText="Logout"
        cancelText="Cancel"
        confirmColor="bg-red-600 hover:bg-red-700"
      />
    </div>
  );
}
