import { Routes, Route, Link, Navigate } from "react-router-dom";
import { FaHome, FaChartBar } from "react-icons/fa";

import { LiveGamesPage } from "./pages/LiveGamesPage";
import { TeamInsightsPage } from "./pages/TeamInsightsPage";
import { TeamDetailsPage } from "./pages/TeamDetailsPage";
import { UserContext } from "./context/UserContext";
import { useContext } from "react";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";

const isPaidFeatureEnabled = true;

const pages = [
  { id: 1, title: "Games", url: "/", icon: <FaHome className="w-5 h-5" /> },
  {
    id: 2,
    title: "Insights",
    url: isPaidFeatureEnabled ? "/insights" : "/",
    icon: <FaChartBar className="w-5 h-5" />,
    isFree: isPaidFeatureEnabled,
  },
];

function App() {
  const userContext = useContext(UserContext);

  return (
    <>
      <nav className="flex justify-between items-center p-4 bg-blue-600 dark:bg-gray-900 shadow-md">
        <div className="flex items-center space-x-6">
          {pages.map((page) => (
            <Link
              key={page.id}
              to={page.url}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-blue-700 dark:hover:bg-gray-700 transition"
            >
              {page.icon}
              <span>{page.title}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {userContext?.isUserLoggedIn() ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={`https://ui-avatars.com/api/?name=${userContext.user}&background=random`}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-white font-medium">{`Welcome, ${userContext.user}`}</span>
              </div>
              <button
                onClick={userContext.logout}
                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition"
              >
                Register
              </Link>
            </>
          )}
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
              path="/insights"
              element={
                userContext?.isUserLoggedIn() ? (
                  isPaidFeatureEnabled ? (
                    <TeamInsightsPage />
                  ) : (
                    <Navigate to="/" replace />
                  )
                ) : (
                  <LoginPage />
                )
              }
            />
            <Route path="/insights/:teamId" element={<TeamDetailsPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;