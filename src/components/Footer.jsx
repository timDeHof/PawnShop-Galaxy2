import React from "react";
import styles from "../style/Footer.module.css";
import { useLocation } from "react-router-dom";

function Footer({ APIHealth }) {
  const { pathname } = useLocation();

  const year = new Date().getFullYear();
  return (
    <footer
      className={styles.footer_box}
      style={{ position: pathname === "/login" ? "absolute" : "initial" }}
    >
      <p>Copyright ⓒ {year} </p>
      {/* <p>API Status: {APIHealth}</p> */}
    </footer>
  );
}

export default Footer;
