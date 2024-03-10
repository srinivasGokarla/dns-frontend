import axios from "axios";
import { LOGIN, REGISTER, CREATE_TODO, GET_TODO, DELETE_TODO, MARK_TODO} from "./apiConstants";

export const login = async (data)=>{
 return axios.post(LOGIN,data)
}

export const register = async (data)=>{
    return axios.post(REGISTER,data)
   }

   export const createTodoApi = async (data)=>{
   let token = getToken();
   console.log("token-",token)
    return axios.post(CREATE_TODO,data,{
        headers:{
          auth:token
        }
    })
   }

   export const getTodoListApi = async (data)=>{
    let token = getToken();
    console.log("token-",token)
     return axios.get(GET_TODO,{
         headers:{
           auth:token
         }
     })
    }

    export const deleteTodoListApi = async (data)=>{
        let token = getToken();
        console.log("token-",token)
         return axios.post(DELETE_TODO,data,{
             headers:{
               auth:token
             }
         })
        }

        export const markTodoListApi = async (data)=>{
            let token = getToken();
             return axios.post(MARK_TODO,data,{
                 headers:{
                   auth:token
                 }
             })
            }

   export function getToken(){
    let user = localStorage.getItem('user');
    if(!user) return
    const userObj = JSON.parse(user);
    return userObj.token;
   }