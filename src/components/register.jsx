import { useEffect, useState } from "react"
import { register } from "../services/api"
import { ToastContainer, toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { Header } from "./partials/header"

export const Register=()=>{
const [form,setForm]= useState({
    name:"",
    username:"",
    email:"",
    password:""
})

const [errors,setErrors]= useState(null)
const navigation = useNavigate();

useEffect(()=>{
    const user = localStorage.getItem('user')
  if(user){
   return navigation('/')
  }
  },[])
const handleInputChange = (e)=>{
    setForm({...form,[e.target.name]:e.target.value})
}


const handleSubmit = async ()=>{
const result = await register(form) 
if(result.status===200){
    if(result.data.status===200){
        localStorage.setItem('user',JSON.stringify(result.data.data))
      navigation('/')
        return;
      }
    
      if(result.data.status===201){
        setErrors(result.data.data)
        toast(result.data.message)
        return;
      }
    
      if(result.data.status===202){
        toast(result.data.message)
        return;
      }
}else{
    toast('something went wrong')
}
}

    return <>
    <Header/>
    <ToastContainer/>
     <div className="container card mt-4 register-login-box" >
       
        <h3 className="">Register</h3>
     <div className="form-group">
      <label className="form-label mt-4">Name</label>
      <input type="text" 
      name="name"
      onChange={handleInputChange}
      className="form-control" placeholder="Enter your name"/>
     {
        errors?.name &&
        <small id="emailHelp" class="form-text text-danger">{errors.name.msg}</small>
      }
    </div>
    
    <div className="form-group">
      <label for="exampleInputEmail1" className="form-label mt-4">Email</label>
      <input type="text" 
      name="email"
      onChange={handleInputChange}
      className="form-control" placeholder="Enter email"/>
     {
        errors?.email &&
        <small id="emailHelp" class="form-text text-danger">{errors.email.msg}</small>
      }
    </div>

    

    <div className="form-group">
      <label for="exampleInputEmail1" className="form-label mt-4">Username</label>
      <input type="text" 
      name="username"
      onChange={handleInputChange}
      className="form-control" placeholder="Enter username"/>
      {
        errors?.username &&
        <small id="emailHelp" class="form-text text-danger">{errors.username.msg}</small>
      }
    </div>
    
    <div className="form-group">
      <label for="exampleInputPassword1" className="form-label mt-4">Password</label>
      <input type="password"
      onChange={handleInputChange}
      name="password" className="form-control" placeholder="Password"/>
     {
        errors?.password &&
        <small id="emailHelp" class="form-text text-danger">password should be at least 8</small>
      }
    </div>

    

    <br />
    <button type="submit" onClick={handleSubmit} className="btn btn-primary" >Register</button>
 

</div>
    </>
}