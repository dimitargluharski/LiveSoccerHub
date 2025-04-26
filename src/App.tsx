import { Routes, Route, Link, Navigate } from "react-router-dom";
import { FaHome, FaChartBar } from "react-icons/fa";

import { LiveGamesPage } from "./pages/LiveGamesPage";
import { TeamInsightsPage } from "./pages/TeamInsightsPage";
import { TeamDetailsPage } from "./pages/TeamDetailsPage";

const isPaidFeatureEnabled = true;

const pages = [
  { id: 1, title: "Live", url: "/", icon: <FaHome className="w-5 h-5" /> },
  {
    id: 2,
    title: "Insights",
    url: isPaidFeatureEnabled ? "/team-insights" : "/",
    icon: <FaChartBar className="w-5 h-5" />,
    isFree: isPaidFeatureEnabled,
  },
];

function App() {
  return (
    <>
      <nav className="flex justify-center gap-6 p-4 bg-blue-600 dark:bg-gray-900 shadow-md">
        <div className="flex items-center space-x-6">
          {pages.map((page) => (
            <Link
              key={page.id}
              to={page.url}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition"
            >
              {page.icon}
              <span>{page.title}</span>
              {/* {page.isFree && (
                <span className="ml-2 px-2 py-1 text-xs font-bold text-blue-600 bg-white rounded-full">
                  trial
                </span>
              )} */}
            </Link>
          ))}
        </div>
      </nav>

      <div className="w-full min-h-screen dark:bg-slate-900 bg-white p-2">
        <div className="max-w-4xl mx-auto">
          <Routes>
            <Route
              path="/"
              element={
                <LiveGamesPage isPaidFeatureEnabled={isPaidFeatureEnabled} />
              }
            />
            <Route
              path="/team-insights"
              element={
                isPaidFeatureEnabled ? (
                  <TeamInsightsPage />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />
            <Route
              path={`/team-insights/:teamId`}
              element={<TeamDetailsPage />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;