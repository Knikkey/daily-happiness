import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/Home";

function App() {
  const { authIsReady } = useAuthContext();
  return <div className="App">{authIsReady && <Home />}</div>;
}

export default App;
