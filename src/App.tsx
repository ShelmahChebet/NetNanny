import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import routes from "./tempo-routes";
import MonitoringPanel from "./components/dashboard/MonitoringPanel";
import CaseList from "./components/dashboard/CaseList";
import Threats from "./components/threatPage/Threats"
import Safety from "./components/safetyPage/Safety";
import Support from "./components/chatPage/Support";
import Settings from "./components/settings/Settings";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Monitoring" element={<MonitoringPanel />} />
          <Route path="/cases" element={<CaseList />} />
          <Route path="/stats" element={<Threats />} />
          <Route path="/reports" element={<Safety />} />
          <Route path="/chat" element={<Support />} />
          <Route path="/settings" element={<Settings />} />




        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
