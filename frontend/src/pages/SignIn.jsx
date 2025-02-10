import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import userService from "../services/UserServices";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [credentials, setCredentials] = useState([]);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    setCredentials({
      email: formData.get("user_email"),
      password: formData.get("user_password"),
    });

    if (formData) {
      const data = await userService.reqLogin(credentials);
      console.log(data);
      if (data.status === 200) {
        console.log(data.data.access_token);
        sessionStorage.setItem("token", data.data.access_token);
        sessionStorage.setItem("user", JSON.stringify(data.data.user));
        navigate("/Account");
      } else {
        toast.error("Invalid Credentials");
      }
    }
  };

  return (
    <div>
      <div className="flex flex-row h-screen">
        <ToastContainer />
        <img
          src="/log-1.jpg"
          alt="bg"
          className="object-cover h-screen w-1/2"
        />
        <form
          className="flex flex-col p-5 space-y-4 w-full items-center justify-center"
          method="POST"
          onSubmit={handleSignIn}
        >
          <h1 className="text-3xl font-bold">Sign In</h1>
          <input
            className="rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105"
            name="user_email"
            type="email"
            placeholder="Email"
          />
          <input
            className="rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105"
            name="user_password"
            type="password"
            placeholder="Password"
          />
          <button className="rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border hover:border-black hover:text-black">
            Log In
          </button>

          <p>
            Don't have an account?{" "}
            <a href="/signup" className="text-primary">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
