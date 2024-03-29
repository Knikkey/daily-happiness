//handles login and signup based on state
//handles guest login via boolean prop from Dashboard
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";
import diary from "./media/diary.webp";

import styles from "./Login.module.scss";

export default function Login() {
  const [signupPage, setSignupPage] = useState(false);
  const [guest, setGuest] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isPending, setIsPending] = useState(false);

  //hooks
  const { signupError, setSignupError, signup } = useSignup();
  const { loginError, setLoginError, login, guestLogin } = useLogin();

  //handlers
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError(null);
    setLoginError(null);
    setIsPending(true);
    if (signupPage) {
      await signup(email, password, displayName);
    }
    if (guest) {
      await guestLogin();
    } else await login(email, password);
    setIsPending(false);
  };

  return (
    <div className={styles["login-container"]}>
      <div className={styles["title-container"]}>
        <img src={diary} alt="" />
        <h1 className={styles.subtitle}>{signupPage ? "Sign up" : "Login"}</h1>
      </div>

      <form onSubmit={submitHandler}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        {signupPage && (
          <>
            <label htmlFor="displayName">Display Name:</label>
            <input
              id="displayName"
              type="text"
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

        {/* **********************LOGIN BUTTONS********************** */}
        <div className={styles["btn-container"]}>
          <button type="submit" disabled={isPending}>
            {isPending && "Authenticating..."}
            {signupPage && !isPending && "Sign up"}
            {!signupPage && !isPending && "Log in"}
          </button>
          <button
            onClick={() => setGuest(true)}
            className={styles.guest}
            disabled={isPending}
          >
            {isPending ? "Authenticating..." : "Log in as guest"}
          </button>
        </div>
        {/* **********************ERROR MESSAGES********************** */}
        {signupError ||
          (loginError && (
            <p className={styles.error} role="alert">
              {signupError ? signupError : loginError}
            </p>
          ))}
      </form>

      {/* **********************BLUE BUTTONS********************** */}
      <div className={styles["signup-container"]}>
        {signupPage && (
          <button onClick={() => setSignupPage(false)}>
            Return to login page
          </button>
        )}
        {!signupPage && (
          <>
            <button onClick={() => setSignupPage(true)}>Sign up</button>
            {/* <button>Forgot username</button>
            <button>Forgot password</button> */}
          </>
        )}
      </div>
    </div>
  );
}
