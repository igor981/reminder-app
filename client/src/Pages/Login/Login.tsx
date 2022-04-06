import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { loginService } from '../../service/authService'
import { useDispatch } from 'react-redux'
import { loginAction } from '../../redux/actions/user.actions'
import { useSelector } from 'react-redux'
import './Login.styles.css'


const Login = () => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [showMessage, setShowMessage] = useState<boolean>(false)
    const [message, setMessage] = useState<string>('')
    const user = useSelector((state: any ) => state.user)


    const dispatch = useDispatch()

    const navigate = useNavigate()

    

    const handleUsernameInput = (nameValue: string) => {
        setUsername(nameValue)
    }
    const handlePasswordInput = (passwordValue: string) => {
        setPassword(passwordValue)
    }

    const handleLogin = async (e: any) => {
        e.preventDefault()
        setShowMessage(false);
        setMessage('')
        const userFetch = await loginService(username, password)
        
        if (userFetch.error){
              setShowMessage(true);
            setMessage(userFetch.error)
        } else {           
            localStorage.setItem('reminder-user', JSON.stringify(userFetch))
            dispatch(loginAction(userFetch))
            navigate('/')
        } 
    }

    useEffect(() => {
        if(user) {
            navigate('/')
        }
        setShowMessage(false);
        setMessage('')
    }, [])
    
  return (
    <div className='login__container'>
        <form className='login__container__form' onSubmit={(e) => handleLogin(e)}>
            <div className='login__container__username input-field'>
            <label htmlFor='username-input'>Username</label>
            <input id='username-input' onChange={(e) => handleUsernameInput(e.target.value)} type='text'/>

            </div>
            <div className='login__container__password input-field'>
            <label htmlFor='password-input'>Password</label>
            <input id='password-input' onChange={(e) => handlePasswordInput(e.target.value)} type='password'/>

            </div>
            <div className='login__container__button'>
            <button>Log in</button>

            </div>
        </form>
        {message && message.length > 0 ? <p>{message}</p> : null }
    </div>
  )
}

export default Login