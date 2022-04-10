import React, {useEffect, useState} from 'react'
import ReminderItem from './ReminderListItem/ReminderItem';
import './ReminderList.styles.css'
import { socket } from '../../App';
import { useDispatch, useSelector } from 'react-redux';
import { setList } from '../../redux/actions/reminderList.actions';
import { useNavigate } from 'react-router-dom';




const ReminderList = () => {
  const user = useSelector((state: any ) => state.user)
  const list = useSelector((state: any ) => state.list)
  const [checkedOnly, setCheckedOnly] = useState(false)
  const navigate = useNavigate()
  
  const dispatch = useDispatch()
  
  useEffect(() => {
      socket.on('sendTasks', (tasks) => {    
        if (!tasks.error) {
          console.log(tasks, 'this is all the lists');
          
          dispatch(setList(tasks))
        } else {
          console.log('failure');
        }
      })
   
    }, [socket])
    

    useEffect(() => {
      if (!user) {
          navigate('/login')
      } else {
        socket.emit("getTasks", user.userId);
      }
    }, [])
    
  return (
    <div className="window">
      <div className="reminder-list-container">
        <div className="reminder-list__header">
          <div className='reminder-list__header__text'>
          <h1>All reminders</h1>
          </div>
          <div className='reminder-list__header__buttons'>
          <button
            id="content-check"
            onClick={() => setCheckedOnly(!checkedOnly)}
          >
            {" "}
            {checkedOnly ? "Display all" : "Display only checked"}
          </button>
          </div>
        </div>
        <ul className="reminder-list__ul">
          {list &&
            list.length > 0 &&
            list.map((item: any, i: number) => {
              console.log(item.checked, "item in map");

              if (checkedOnly && item.checked === true) {
                return <ReminderItem key={i} item={item} />;
              }
              if (!checkedOnly) {
                return <ReminderItem key={i} item={item} />;
              }
            })}
        </ul>
      </div>
    </div>
  );
}

export default ReminderList