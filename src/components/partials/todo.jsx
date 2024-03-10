import moment from "moment/moment"
import { toast } from "react-toastify"
import { deleteTodoListApi, markTodoListApi } from "../../services/api"
export const Todo =({todo,setRefreshList})=>{
const handleDelete = async ()=>{
 const result = await deleteTodoListApi({
    todo_id: todo._id
 })
console.log('deletetodo-',result)
 if(result.data.status===200){
    setRefreshList(new Date())
    toast('Deleted')
 }else{
    toast('Failed to delete')
 }
}


const handleMarkTodo = async ()=>{
    const result = await markTodoListApi({
        todo_id: todo._id
     })
    console.log('marktodo-',result)
     if(result.data.status===200){
        setRefreshList(new Date())
        toast(result.data.message)
     }else{
        toast('Failed to mark')
     }
}

return <>
    <div className="todo-card">
      <div className="card-header bottom-right">
 {todo.isCompleted ? "Completed" : 'Not Completed'}
      </div>
      <br />
      <div className="card-body">
      <h6 className="card-title" style={{textDecoration: todo.isCompleted?'line-through':'none'}}><a href={`https://${todo.desc}`} target="blank">https://{todo.desc}</a></h6>
      </div>
      <br />
      <div className="actionButtons d-flex" style={{justifyContent:"space-between",alignItems:"center"}}>
        <div className="deleteButton">
            <button className="btn btn-danger" onClick={handleDelete}>delete</button>
        </div>
       
        <div className="markTodo">
            <button className="btn btn-success" onClick={handleMarkTodo}>
                {
                    todo.isCompleted?'Mark Uncomplete' : 'Mark Complete'
                }
            </button>
        </div>
       </div>
       <br />
       <small className="bottom-right"><b>{moment(todo.date).fromNow()}</b> </small>
    </div>
</>
}