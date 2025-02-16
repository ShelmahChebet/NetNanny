// import { Suspense } from "react";
// import { useRoutes, Routes, Route } from "react-router-dom";
// import Home from "./components/home";
// import routes from "./tempo-routes";
// import MonitoringPanel from "./components/dashboard/MonitoringPanel";
// import CaseList from "./components/dashboard/CaseList";
// import Threats from "./components/threatPage/Threats"
// import Summary from "./components/dashboard/Summary";
// import Safety from "./components/safetyPage/Safety";

// function App() {
//   return (
//     <Suspense fallback={<p>Loading...</p>}>
//       <>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/Monitoring" element={<MonitoringPanel />} />
//           <Route path="/cases" element={<CaseList />} />
//           <Route path="/stats" element={<Threats />} />
//           <Route path="/reports" element={<Safety />} />



//         </Routes>
//         {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
//       </>
//     </Suspense>
//   );
// }

// export default App;
import { Suspense } from "react";
import { Outlet, useRoutes } from 'react-router-dom' // Changed from Routes/Route
import routes from "./tempo-routes";
import Home from "./components/home";
import MonitoringPanel from "./components/dashboard/MonitoringPanel";
import CaseList from "./components/dashboard/CaseList";
import Threats from "./components/threatPage/Threats";
import Safety from "./components/safetyPage/Safety";
import "./index.css";

function App() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      {/* Wasp will automatically inject the current page component via Outlet */}
      <Outlet />
      
      {/* Optional: Add persistent layout components here (header/nav/footer) */}
      
      {/* Tempo integration - make sure this works with Wasp's routing */}
      {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
    </Suspense>
  );
}

export default App;