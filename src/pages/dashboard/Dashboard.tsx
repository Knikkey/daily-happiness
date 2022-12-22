import { useLogout } from "../../hooks/useLogout";

export default function Dashboard() {
  const { logout } = useLogout();
  return (
    <div>
      <p>Dashboard</p>
      <button onClick={logout}>Log out</button>
    </div>
  );
}
