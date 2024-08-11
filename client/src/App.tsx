import { Auth } from "./pages/auth"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { WorldMap } from "./pages/map"
import { Forum } from "./pages/forum"
import { TipRecordProvider } from "./context/tip-post-context"

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Auth/>}/>
          <Route path="/map" element={<WorldMap/>}/>
          <Route path="/forum/:country?" element={
            <TipRecordProvider>
              <Forum/>
            </TipRecordProvider>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
