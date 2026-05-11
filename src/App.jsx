import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Community from './pages/Community'
import Profile from './pages/Profile'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comunidade" element={<Community />} />
        <Route path="/perfil/:userId" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  )
}
