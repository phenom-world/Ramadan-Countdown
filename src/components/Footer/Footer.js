import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <p> Created with 🧡 &copy; Official {new Date().getFullYear()}</p>
    </div>
  );
};

export default Footer;
