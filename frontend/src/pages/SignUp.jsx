import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import userService from "../services/UserServices";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    email: "",
    password: "",
    created_at: "",
  });

  const validateSignUp = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.rePassword.value) {
      toast.error("Passwords do not match");
      return false;
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);

    setNewUserData({
      name: formData.get("firstName") + "_" + formData.get("lastName"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: "user",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

    if (!validateSignUp(e)) {
      try {
        const data = await userService.reqSignUp(newUserData);
        console.log(data);
        if (data.status === 201) {
          toast.success("User Created Successfully");
          navigate("/SignIn");
        } else {
          toast.error("Invalid Credentials");
        }
      } catch (error) {
        console.log(error);
        toast.error("Invalid Credentials");
      }

      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-row h-screen">
        <img
          src="/sign-1.jpg"
          alt="bg"
          className="object-cover h-screen w-1/2"
        />
        <form
          className="flex flex-col p-5 space-y-4 w-full items-center justify-center"
          method="POST"
          onSubmit={handleSignUp()}
        >
          <ToastContainer />
          <h1 className="text-3xl font-bold">Sign Up</h1>
          <input
            className="rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105"
            type="text"
            placeholder="First Name"
            name="firstName"
          />
          <input
            className="rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105"
            type="text"
            placeholder="Last Name"
            name="lastName"
          />
          <input
            className="rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105"
            type="password"
            placeholder="Password"
            name="password"
          />
          <input
            className="rounded-lg border border-black p-2 focus:drop-shadow focus:scale-105"
            type="password"
            placeholder="Confirm Password"
            name="rePassword"
          />
          <button className="rounded-lg bg-primary text-white p-2 px-5 border border-black hover:bg-white hover:border hover:border-black hover:text-black">
            {loading ? "loading" : "Sign Up"}
          </button>
          <p>
            Already have an account?{" "}
            <a href="/signin" className="text-primary">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
