import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/TodoList'
import About from './pages/About'
import SignUp from './pages/SignUp'
import SingIn from './pages/SingIn'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './contexts/AuthContext'

function App() {


  return (
    <AuthProvider>
    <BrowserRouter>
      <Header />
      
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='sign-up' element={<SignUp />} />
        <Route path='/' element={<SingIn />} />
        <Route path='dashboard' element={<Dashboard />} />
       

      </Routes>
      <Footer/>
    </BrowserRouter>
    </AuthProvider>
  )
}

export default App
