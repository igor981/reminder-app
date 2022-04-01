import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Home = ({user}:{user:any}) => {
    const navigate = useNavigate()
    useEffect(() => {
      if (!user){
          navigate('/login')
      }
    }, [])
    
  return (
    <div>Home</div>
  )
}

export default Home