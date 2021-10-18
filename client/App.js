import React from "react";
import Navbar from "./components/Navbar";
import Routes from "./Routes";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="inner-body-container">
      <Navbar />
      <Routes />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
