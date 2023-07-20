import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();

  return (
    <div className="page-container">
      {!user && <Login />}
      {user && <Dashboard />}
    </div>
  );
}
