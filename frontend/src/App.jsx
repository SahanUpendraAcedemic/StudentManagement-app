import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen tems-center justify-center overflow-x-hidden">
        <ToastContainer />
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
