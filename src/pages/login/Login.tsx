//handles both login and signup based on state

import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";

import styles from "./styles/Login.module.css";

export default function Login() {
  const [signupPage, setSignupPage] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isPending, setIsPending] = useState(false);

  //hooks
  const { signupError, setSignupError, signup } = useSignup();
  const { loginError, setLoginError, login } = useLogin();

  //handlers
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    setLoginError(null);
    setIsPending(true);
    signupPage
      ? await signup(email, password, displayName)
      : await login(email, password);
    setIsPending(false);
  };

  return (
    <div className={styles["login-container"]}>
      <p className={styles.subtitle}>{signupPage ? "Sign up" : "Login"}</p>

      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        {signupPage && (
          <>
            <label htmlFor="displayName">Display Name:</label>
            <input
              id="displayName"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDisplayName(e.target.value)
              }
            />
          </>
        )}
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
        {signupPage && (
          <button type="submit">
            {isPending ? "Authenticating..." : "Sign up"}
          </button>
        )}
        {!signupPage && (
          <button type="submit">
            {isPending ? "Authenticating..." : "Log in"}
          </button>
        )}

        {signupError && <p className={styles.error}>{signupError}</p>}
        {loginError && <p className={styles.error}>{loginError}</p>}
      </form>

      <div className={styles["signup-container"]}>
        {signupPage && (
          <button onClick={() => setSignupPage(false)}>
            Return to login page
          </button>
        )}
        {!signupPage && (
          <>
            <button onClick={() => setSignupPage(true)}>Sign up</button>
            <button>Forgot username</button>
            <button>Forgot password</button>
          </>
        )}
      </div>
    </div>
  );
}
