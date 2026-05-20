import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import PeoplePage from './pages/PeoplePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/people" replace />} />
        <Route path="/people" element={<PeoplePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
