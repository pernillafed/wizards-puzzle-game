import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import GamePage from "./pages/GamePage"
import HomePage from "./pages/HomePage"

const App = () => {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game/:gameType" element={<GamePage />} />
      </Routes>
    </div>
  )
}

export default App
