import { Route, Routes } from "react-router-dom"
import { HomePage } from "./pages/HomePage"

function App() {
  return (
    <div className="h-dvh w-dvw md:max-w-5xl mx-auto">
      {/* <Navbar /> */}

      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
