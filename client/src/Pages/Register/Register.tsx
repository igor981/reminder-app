import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { registerService } from '../../service/authService'
import './Register.styles.css'



const Register = ({handleUserData}:{handleUserData: any}) => {     
    const [username, setUsername] = useState<string>('')
    const [fName, setFname] = useState<string>('')
    const [lName, setLName] = useState<string>("");
    const [password, setPassword] = useState<string>('')
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')

    const navigate = useNavigate()


    

    const handleUsernameInput = (nameValue: string) => {
        setUsername(nameValue)
    }
    const handleFirstNameInput = (nameValue: string) => {
        setFname(nameValue)
    }
    const handlelastNameInput = (nameValue: string) => {
        setLName(nameValue)
    }
    const handlePasswordInput = (passwordValue: string) => {
        setPassword(passwordValue)
    }

    const handleRegister = async (e: any) => {
        e.preventDefault()
        setShowMessage(false);
        setMessage('')

        if(username && password && fName && lName){
      
          const userFetch = await registerService(username, password, fName, lName);      
          
        if (userFetch.error){              
              setShowMessage(true)
              setMessage(userFetch.error)
          } else {              
              localStorage.setItem('reminder-user', JSON.stringify(userFetch.user))
              handleUserData(userFetch.user)
              navigate('/')
          } 

        } else {
          setShowMessage(true)
          setMessage('All input fields must be filled')
        }
    }

    useEffect(() => {
        setShowMessage(false);
        setMessage('')
    }, [])
    
  return (
    <div className='login__container'>
        <form className='login__container__form' onSubmit={(e) => handleRegister(e)}>
            <label htmlFor='username-input'>Username</label>
            <input id='username-input' onChange={(e) => handleUsernameInput(e.target.value)} type='text'/>
            <label htmlFor='password-input'>Password</label>
            <input id='password-input' onChange={(e) => handlePasswordInput(e.target.value)} type='password'/>
            <label htmlFor='fname-input'>First name</label>
            <input id='fname-input' onChange={(e) => handleFirstNameInput(e.target.value)} type='text'/>
            <label htmlFor='lname-input'>Last name</label>
            <input id='lname-input' onChange={(e) => handlelastNameInput(e.target.value)} type='text'/>
            <button>Register</button>
        </form>
        {message && message.length > 0 ? <p>{message}</p> : null }
    </div>
  )
}

export default Register