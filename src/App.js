import { Header } from './components/partials/header';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import { Home } from './components/Home';
import { Register } from './components/register';
import { Login } from './components/login';
import { useState } from 'react';
function App() {
  // const info = localStorage.getItem('user')
  // const [user, setUser] = useState(JSON.parse(info))

  return (
    <>
    <BrowserRouter>
    {/* <Header/> */}
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
    </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
