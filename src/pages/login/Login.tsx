//handles login and signup based on state
//handles guest login via boolean prop frpm Dashboard
import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { useLogin } from "../../hooks/useLogin";

import styles from "./styles/Login.module.css";

interface Prop {
  guestSignup?: boolean;
}

export default function Login({ guestSignup }: Prop) {
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
    if (signupPage || guestSignup) {
      await signup(email, password, displayName);
    }
    if (guest) {
      await guestLogin();
    } else await login(email, password);
    setIsPending(false);
  };

  return (
    // <div className={styles.centered}>
    <div className={styles["login-container"]}>
      <p className={styles.subtitle}>
        {signupPage || guestSignup ? "Sign up" : "Login"}
      </p>

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
        {guestSignup && (
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
        {signupPage && (
          <button type="submit">
            {isPending ? "Authenticating..." : "Sign up"}
          </button>
        )}
        {guestSignup && (
          <button type="submit">
            {isPending ? "Authenticating..." : "Sign up"}
          </button>
        )}
        {!signupPage && !guestSignup && (
          <button type="submit">
            {isPending ? "Authenticating..." : "Log in"}
          </button>
        )}
        {!guestSignup && (
          <button onClick={() => setGuest(true)} className={styles.guest}>
            Log in as a guest
          </button>
        )}

        {/* **********************ERROR MESSAGES********************** */}
        {signupError && <p className={styles.error}>{signupError}</p>}
        {loginError && <p className={styles.error}>{loginError}</p>}
      </form>

      {/* **********************BLUE BUTTONS********************** */}
      <div className={styles["signup-container"]}>
        {signupPage && !guestSignup && (
          <button onClick={() => setSignupPage(false)}>
            Return to login page
          </button>
        )}
        {!signupPage && !guestSignup && (
          <>
            <button onClick={() => setSignupPage(true)}>Sign up</button>
            <button>Forgot username</button>
            <button>Forgot password</button>
          </>
        )}
      </div>
    </div>
    // </div>
  );
}
