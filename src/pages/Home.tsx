import { useState } from "react";

import Login from "./login/Login";
import Dashboard from "./dashboard/Dashboard";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { user } = useAuthContext();
  return (
    <div>
      {!user && <Login />}
      {user && <Dashboard />}
    </div>
  );
}
