import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <main className="min-h-screen tems-center justify-center overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
