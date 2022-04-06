import React, {useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomeRouter = () => {
    const user = useSelector((state: any) => state.user)
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!user) {
            navigate('/login')
            return
        }

        navigate('/reminders/all-reminders')
    
    }, [])
    
  return (
    <div>HomeRouter</div>
  )
}

export default HomeRouter