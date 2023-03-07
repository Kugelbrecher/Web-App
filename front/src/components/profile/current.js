import store from "../../store";
import {useEffect, useState} from "react";

export default function CurrentInfo() {
    const [userInfo,setUserInfo]  = useState({})
    console.log(userInfo)
    const getUserInfo = () => {
        const _userInfo = JSON.parse(JSON.stringify(store.getState().currentUserInfo))
        setUserInfo(_userInfo)
    }

    useEffect(()=>{
      getUserInfo()
      const unsubscribe =  store.subscribe(function(){
            getUserInfo()
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    return (
        <div className="current-info-form">
            <div>
                <h1>Current Info</h1>
            </div>
            <form>
                <label>Username:{userInfo?.username}</label><br/>
                <label>Email:{userInfo?.email}</label><br/>
                <label>Phone:111-111-1111</label><br/>
                <label>Birthday:{userInfo?.dob}</label><br/>
                <label>Zipcode:{userInfo?.zipcode}</label><br/>
                <label>Password:{userInfo?.password?.replace(/./g,'*')}</label><br/>
            </form>
        </div>
    )
}
