import React, {useEffect} from 'react'
import { io, Socket} from 'socket.io-client'


const socket: Socket = io("ws://localhost:3001");

const ReminderList = () => {

    useEffect( () => {
     const res = socket.emit('getTasks', 'items')
     console.log(res);
     
    }, [])
    
  return (
    <div>ReminderList</div>
  )
}

export default ReminderList