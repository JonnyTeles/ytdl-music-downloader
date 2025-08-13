import { Routes, Route } from "react-router-dom";
import MainDashboard from "./components/dashboard/main-dashboard";

import HeaderControl from "./components/header/header-control";
import ConfigPage from "./components/config/config";

function App(): React.JSX.Element {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <HeaderControl />
      <main className="flex-1 overflow-y-auto pt-12">
        <Routes>
          <Route path="/" element={<MainDashboard />} />
          <Route path="/config" element={<ConfigPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
