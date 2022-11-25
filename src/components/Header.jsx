import React from "react";
import Navbar from "../components/Navbar";
import styles from "../style/Header.module.css";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className={styles.header_box}>
      <Link className={styles.header_title} to="/">
        galactic pawn
      </Link>
      <Navbar />
    </header>
  );
}

export default Header;
