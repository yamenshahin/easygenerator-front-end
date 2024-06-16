import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './pages/SignUp.tsx'
import SignIn from './pages/SignIn.tsx'
import Application from './pages/Application.tsx'
import Style from './pages/Style.tsx'
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn />} />{' '}
          {/* Sign In as default page */}
          <Route path='/signup' element={<SignUp />} />
          <Route path='/application' element={<Application />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
