import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

import styles from "./styles/Login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [signupPage, setSignupPage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { error, signup } = useSignup();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signupPage ? signup(email, password) : "";
  };

  return (
    <div className={styles["login-container"]}>
      <p className={styles.subtitle}>{signupPage ? "Sign up" : "Login"}</p>

      <form onSubmit={submitHandler}>
        <label htmlFor="username">Email:</label>
        <input
          id="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <div className={styles.checkbox}>
          <input
            id="passwordCheckBox"
            type="checkbox"
            onClick={() => setShowPassword((prev) => !prev)}
          />
          <label htmlFor="passwordCheckBox">Show password</label>
        </div>

        <button type="submit">{!signupPage ? "Login" : "Sign up"}</button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
      {!signupPage && (
        <div className={styles["signup-container"]}>
          <button onClick={() => setSignupPage(true)}>Sign up</button>
          <button>Forgot username</button>
          <button>Forgot password</button>
        </div>
      )}
    </div>
  );
}
