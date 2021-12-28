import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"

const App = () => {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App