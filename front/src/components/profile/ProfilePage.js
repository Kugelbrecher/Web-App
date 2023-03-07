import Update from "./update";
import CurrentInfo from "./current";
import LogoProfile from "./logoProfile";
import "./profile.css";
import {useEffect, useRef, useState} from "react";
import {changeAvatar} from "../../api/request";
import store from "../../store";

export default function ProfilePage() {
    const [userInfo, setUserInfo] = useState()
    const [imgSrc,setImgSrc] = useState()
    const imgForm = useRef()
    const upload = e => {
        imgForm.current.click()
    }

    useEffect(()=>{
        setUserInfo(store.getState().currentUserInfo)

        window.onmessage= function (e) {
            console.log(e)
            if (typeof e.data === 'string') {
                if (e?.data?.indexOf('http') === 0) {
                    setImgSrc(e.data)
                    changeAvatar( e.data).then(()=>{
                        store.dispatch({
                            type: 'change_user_info',
                            value: Object.assign(store.getState().currentUserInfo, {avatar: e.data})
                        })
                    })
                }
            }
        }
        return ()=>{
            window.onmessage = null
        }
    },[])

    const tempAvatar = require('../../data/images/newUser.jpeg')

    return (
        <div>
            <LogoProfile />
            <div className="profile-page">
                <div className="profile-img">
                       {!imgSrc&& <img width={200} height={200} src={userInfo?.avatar||tempAvatar} alt=""/>}
                    <iframe height={'210px'} seamless={true} scrolling={'no'} style={{border:'none'}} name="form" id="form"></iframe>
                    <form id={'imgForm'} target={'form'} method="post" encType="multipart/form-data" action={`http://127.0.0.1:3001/image`}>
                        <input style={{display:'none'}} type="text" name="title"/>
                        <input type="file" name="image" onChange={upload}/>
                        <input ref={imgForm} style={{display:'none'}} type="submit" value="Upload"/>
                    </form>
                </div>
                <div className="profile-forms">
                    <CurrentInfo />
                    <Update />
                </div>
            </div>
        </div>
    )
}
