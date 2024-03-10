import { useEffect, useState } from "react"
import { AddTodoModel } from "./partials/addTodoModal"
import { Header } from "./partials/header"
import { Todo } from "./partials/todo"
import { getTodoListApi, getToken } from "../services/api"
import { useNavigate } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify";

export const Home=()=>{
const navigation = useNavigate()
const [searchText, setSearchText] = useState("");
const [filteredList,setFilteredList]= useState([])
const [list, setList] = useState([])
const [refreshList, setRefreshList] = useState()
    useEffect(()=>{
   if(!getToken()){
    navigation('/login')
   }
   fetchTodoList()
    },[refreshList])

    useEffect(()=>{
    if(searchText===''){
       setFilteredList(list)
    }else{
        const filterlist = list.filter(todo=> todo.desc.toLowerCase().includes(searchText.toLowerCase().trim()))
        setFilteredList(filterlist)
    }
    },[list,searchText])
async function fetchTodoList(){
    const result = await getTodoListApi();
   console.log("todolist-",result)
    if(result.status===200 && result.data.status === 200){
        setList(result.data.data.todos.reverse())
    }
}
    return <>
    <Header searchText={searchText} setSearchText={setSearchText} />
    <ToastContainer/>
    <div className="container">
        <div className="display-grid mt-4">
           {
            filteredList.map((todo)=><Todo todo={todo} key={todo._id} setRefreshList={setRefreshList}/>

            )
           }

           {
            filteredList.length===0 && <div className="notfoundTodos">
                No assignments Yet
            </div>

           }
        </div>
    </div>

    <div className="" style={{position: 'fixed', right:50,bottom:100,zIndex:1030}}>
      <button className="btn btn-primary" type="button" data-bs-toggle = "modal" data-bs-target = "#exampleModal"> Add Domain URL</button>
    </div>

    <AddTodoModel setRefreshList={setRefreshList}/>
    </>
}