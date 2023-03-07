import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import store from '../../store'
import {validateLogin} from "../../utils";
import {login, test} from "../../../src/api/request";
export const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fail, setFail] = useState(false);
    const navigate = useNavigate();
    const userInfo = store.getState().totalUserInfo

    useEffect(() => {
        // test()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        let result = false;

        let username = document.getElementById('login-username').value
        let password = document.getElementById('login-password').value

        login(username,password).then(res=>{
            console.log('res',res)
            if (res.result === 'success'){
                store.dispatch({
                    type:'change_user_info',
                    value:res.profile
                })
                // navigate('/')
                navigate('/main',{replace: true})
            } else {
                console.log('login failed')
                setTimeout(()=>{setFail(false)},2000)
                console.log('login failed, failed after timeout?', fail)
                setFail(true)
            }
        },
        ).catch(err=>{
            console.log('login failed',err)
            setTimeout(()=>{setFail(false)},2000)
            setFail(true)
        })
    }

    return (
        <div className="login-form">
            <h1>Welcome</h1>
            <form onSubmit={handleSubmit} >
                Username
                <input id={'login-username'} className="login-form-input" value={username} type="text" name="username" placeholder="username:" onChange={(e) => setUsername(e.target.value)} /> <br />
                Password
                <input id={'login-password'} className="login-form-input" value={password} type="password" name="password" placeholder="password:" onChange={(e) => setPassword(e.target.value)} /> <br />
                <button className="landing-btn" type="submit">
                    <div to="/main">Login</div>
                </button>
            </form>
            {fail ? <p style={{color:'red'}}>login failed</p> : null}
        </div>
    );
}

/*                      setTimeout
* We can use setTimeout to reset the fail state to false,
* otherwise the error message will always be shown,
* even if the user has entered the correct username and password,
* but it will not influence the login functionality if we use correct username and password
* */
