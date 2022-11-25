import React, { useState, useRef, useEffect } from "react";
import { loginUser } from "../axios-services/users";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import styles from "../style/Login.module.css";
import "../style/App.css";

function Login() {
  // allows us to set the focus on the user input when the component loads
  const userRef = useRef();

  // allows us to set the focus on if we get an error
  const errRef = useRef();
  const { setToken } = useAuth();
  // States for login
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  // hook that sets the focus on the username input when the component loads
  useEffect(() => {
    userRef.current.focus();
  }, []);

  // hook for displaying an error message
  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  return (
    <>
      {success ? (
        <section className={styles.login_box}>
          <h1>You are logged in!</h1>
          <br />
          <p className={styles.buttonContainer}>
            <button
              className={styles.submit}
              onClick={() => navigate("/products")}
            >
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Check out our Products!
            </button>
          </p>
        </section>
      ) : (
        <section className={styles.login_box}>
          <p
            ref={errRef}
            className={errMsg ? styles.errmsg : styles.offscreen}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <h1>Log in</h1>

          <form
            onSubmit={async (ev) => {
              ev.preventDefault();
              try {
                const result = await loginUser(username, password);

                localStorage.setItem("token", result.token);
                setToken(result.token);
                setSuccess(true);

                setUsername("");
                setPassword("");
              } catch (error) {
                if (!errMsg.response) {
                  setErrMsg("No Server Response");
                } else if (error.response?.status === 400) {
                  setErrMsg("Missing Username or Password");
                } else if (error.response?.status === 401) {
                  setErrMsg("Unauthorized");
                } else {
                  setErrMsg("Login Failed");
                }
                errRef.current.focus();
              }
            }}
          >
            <div className={styles.user_box}>
              <input
                type="text"
                id="username"
                required
                ref={userRef}
                autoComplete="off"
                onChange={(ev) => {
                  setUsername(ev.target.value);
                }}
                value={username}
              />
              <label htmlFor="username">Username:</label>
            </div>
            <div className={styles.user_box}>
              <input
                type="password"
                value={password}
                required
                onChange={(ev) => {
                  setPassword(ev.target.value);
                }}
              />
              <label htmlFor="password">Password:</label>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.submit}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Log in
              </button>
            </div>
          </form>
          <p className={styles.registerContainer}>
            Need an Account?
            <br />
            <span className={styles.buttonContainer}>
              <button
                className={styles.registerSubmit}
                onClick={() => navigate("/register")}
              >
                Create Account
              </button>
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default Login;
