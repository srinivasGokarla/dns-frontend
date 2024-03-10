import { useEffect,useState } from "react";
import { Link, useNavigate } from "react-router-dom"

export const Header = ({searchText, setSearchText}) =>{
const navigation = useNavigate();
const [user,setUser] = useState(null)

useEffect(()=>{
  const u = localStorage.getItem('user');
  setUser(u);
},[])


  const handleLogout = ()=>{

    localStorage.clear()
    navigation('/login')
  }

return <>
<nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
  <div className="container-fluid">
    <div className="navbar-brand" >DNS Manager</div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarColor01">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" to="/">Home
            <span className="visually-hidden">(current)</span>
          </Link>
        </li>
       
       {
        user ? <li className="nav-item">
        <div className="nav-link" onClick={handleLogout}>Logout</div>
      </li>

      :
      <>
       <li className="nav-item">
          <Link className="nav-link " to="/register">register</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li>
      
      </>
       }
  
      </ul>

      {
        user && 

        <form className="d-flex">
        <input className="form-control me-sm-2" type="text" placeholder="Search"
        value={searchText}
        onChange={(e)=>setSearchText(e.target.value)}/>
       
      </form>
      }
      
    </div>
  </div>
</nav>
</>
}