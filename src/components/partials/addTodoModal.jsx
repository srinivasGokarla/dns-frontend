import { useState } from "react"
import { ToastContainer,toast } from "react-toastify";
import { createTodoApi } from "../../services/api";

export const AddTodoModel = ({setRefreshList})=>{

const [todoDesc, setTodoDesc] = useState('');

const handleTodoSubmit = async ()=>{
    console.log(todoDesc, 'todoDesc');
    if(todoDesc===""){
     toast('Adding URL is required')
     return
    }

    const result = await createTodoApi({
        desc:todoDesc
    })
 console.log(result)
    if(result.status===200 && result.data.status === 200){
        toast('URL Added')
        setRefreshList(new Date())
        setTodoDesc('')
    }else{
      toast(result.data.message)
    }

}

    return <>
    
    <div className="modal mt-5" id="exampleModal">
   
        <div className="modal-dialog" role="document">
            <div className="modal-content">
               <div className="modal-header">
               <div className="modal-title">
                Add domain URLs ..
                </div>
                <button type="button" className="btn-close"
                data-bs-dismiss="modal"
                aria-label="close">
                    <span arial-hidden="true"></span>
                </button>
               </div>

               <div className="modal-body"> 
                   <div className="form-group">
                    <textarea name="" className="form-control"
                    rows={3}
                    placeholder="enter domain URLs"
                    onChange={(e)=>{
                        setTodoDesc(e.target.value)
                    }}></textarea>
                   </div>
               </div>

               <div className="modal-footer">
                  <button className="btn btn-outline-secondary" onClick={(e)=>{
                        setTodoDesc("")
                    }} data-bs-dismiss="modal">Close</button>
                  <button className="btn btn-outline-secondary" onClick={handleTodoSubmit} data-bs-dismiss="modal">Save</button>
               </div>
            </div>
        </div>
    </div>
    </>
}