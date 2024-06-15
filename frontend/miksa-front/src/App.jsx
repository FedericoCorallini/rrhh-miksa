
import './App.css'
import { Permision } from './components/Permision.jsx'
import LoginButton from './components/LoginButton.jsx'
import LogoutButton from './components/LogoutButton.jsx'



function App() {

  return (
    <>
      <LoginButton></LoginButton>
      <Permision />
      <LogoutButton></LogoutButton>
    </>
  )
}

export default App
