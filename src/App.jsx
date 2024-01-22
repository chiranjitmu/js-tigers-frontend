import React, { useState, useEffect } from "react";
import Create from "./components/Create";
import List from "./components/List";
import Header from "./components/Header";
import Login from "./components/Login";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./components/Edit";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    setLoadingAuth(!isAuthenticated && isLoading);
  }, [isAuthenticated, isLoading]);

  return (
    <BrowserRouter>
      {loadingAuth ? (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-t-blue-700"></div>
        </div>
      ) : (
        <>
          {isAuthenticated && <Header />}
          {isAuthenticated ? (
            <Routes>
              <Route path="/" element={<Create />} />
              <Route path="/list" element={<List />} />
              <Route path="/edit" element={<Edit />} />
            </Routes>
          ) : (
            <div className="w-full min-w-[300px] h-screen bg-[#275284] flex flex-col gap-4 justify-center items-center">
              <img
                alt="site-logo"
                src="../src/assets/jst-logo-blue.webp"
                className="bg-white p-2 rounded-md"
              />
              <section className="flex justify-evenly w-60 bg-white text-black rounded-sm">
                <img
                  alt="google-logo"
                  src="../src/assets/images.jpeg"
                  className="w-10"
                />
                <Login />
              </section>
            </div>
          )}
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
