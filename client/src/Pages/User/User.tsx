import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const User = () => {
    const navigate = useNavigate()
    const user = useSelector((state: any ) => state.user)
    
    useEffect(() => {    
    
            
        if (!user){
            navigate('/login')
            return
        }
    }, [])
    
    
  return (
    <div>
         <p>
        {user  && user.userId}
        </p>
        <p>{user && user.username}</p>
        <p>{user && user.fname}</p>
        <p>{user && user.lname}</p>
        <p>{user && user.password}</p> 
    </div>
  )
}

export default User