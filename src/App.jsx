import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SingIn from './pages/SingIn'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {


  return (
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path='about' element={<About />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='/' element={<SingIn />} />
        <Route path='dashboard' element={<Dashboard />} />
       

      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
