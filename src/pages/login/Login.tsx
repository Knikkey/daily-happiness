//handles both login and signup based on state

import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";

import styles from "./styles/Login.module.css";

export default function Login() {
  const [signupPage, setSignupPage] = useState(false);
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const { signupError, signup } = useSignup();
  const { loginError, login } = useLogin();

  const submitHandler = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signupPage ? signup(email, password) : login(email, password);
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

        {signupError && <p className={styles.error}>{signupError}</p>}
        {loginError && <p className={styles.error}>{loginError}</p>}
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
