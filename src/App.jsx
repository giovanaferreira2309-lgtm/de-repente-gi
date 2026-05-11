import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Community from './pages/Community'
import Profile from './pages/Profile'
import Ranking from './pages/Ranking'
import Biblioteca from './pages/Biblioteca'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/comunidade" element={<Community />} />
        <Route path="/perfil/:userId" element={<Profile />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/biblioteca" element={<Biblioteca />} />
      </Routes>
    </BrowserRouter>
  )
}
