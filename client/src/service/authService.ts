import axios from "axios"
import {v4 as uuidv4} from 'uuid';
const URL:string = 'http://localhost:3001/auth/'
export const loginService = async (username: string, password: string) => {
    try {
        const user = await axios.post(URL + 'login', {
            username: username,
            password: password
        })
        return user.data

        
    } catch (error: any) {
        return error.message
    }   
}
export const registerService = async (username: string, password: string,fname: string,lname: string,) => {
    try {
        const newId = uuidv4()
        
        const user = await axios.post(URL + 'signup', {
            id: newId,
            username: username,
            password: password,
            fname: fname,
            lname: lname
        })
        return user.data

        
    } catch (error: any) {
        return error.message
    }   
}

export const logOut = () => {
    localStorage.removeItem('reminder-user')
}