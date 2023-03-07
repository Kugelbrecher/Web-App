// import "./profile.css";

import {useState} from "react";
import store from "../../store";
import registerRules from "../../utils/registerRules";
import {changeEmail} from "../../api/request";

export default function Update() {
    const [submitErr,setSubmitErr] = useState(false)
    // const [phoneErr,setPhoneErr] = useState(false)
    const [emailErr,setEmailErr] = useState(false)
    const [zipcodeErr,setZipcodeErr] = useState(false)

    let userInfo =JSON.parse(JSON.stringify(store.getState().currentUserInfo))
    const handleSubmit =async e => {

        e.preventDefault()
        const emailValue = document.querySelector('#profileEmail').value
        // const phoneValue = document.querySelector('#profilePhone').value
        const zipcodeValue = document.querySelector('#profileZipcode').value
        const passwordValue = document.querySelector('#profilePassword').value

        if (!emailValue&&!passwordValue&&!zipcodeValue){
            setSubmitErr(true)
        }else{
            setSubmitErr(false)

           if (emailValue){
               if (registerRules[1]._pattern.test(emailValue)){
                  await registerRules[1].changeMethod(emailValue).then(res=>{
                       console.log('change Email',res)
                            setEmailErr(false)
                            userInfo.email = emailValue
                        }).catch(err=>{
                            setEmailErr(true)
                        })
                    }else {
                   setEmailErr(true)
               }
           }

           // if (phoneValue){
           //     if (registerRules[2]._pattern.test(phoneValue)){
           //         setPhoneErr(false)
           //         userInfo.phone = phoneValue
           //     }else{
           //         setPhoneErr(true)
           //     }
           // }

           if (zipcodeValue){
                if (registerRules[4]._pattern.test(zipcodeValue)){

                    await  registerRules[4].changeMethod(zipcodeValue).then(res=>{
                        setZipcodeErr(false)
                        userInfo.zipcode = zipcodeValue
                    }).catch(err=>{
                        setZipcodeErr(true)
                    })
                }else{
                     setZipcodeErr(true)
                }
           }

           if (passwordValue){
               userInfo.password = passwordValue
               // userInfo.address.street = passwordValue
           }

            store.dispatch({
                type:'change_user_info',
                value:userInfo
            })
        }
    }

    return (
        <div className="update-info-form">
            <div>
                <h1>Update Info</h1>
            </div>
            <form className="settingsForm"  onSubmit={handleSubmit}>
                <label>Email: </label>
                <input id={'profileEmail'} type="email"/>
                {emailErr&&<span  style={{color:'red'}}>{registerRules[1].errorMessage}</span>}
                {/*<label>Phone: </label>*/}
                {/*<input id={'profilePhone'} type="tel" />*/}
                {/*{phoneErr&&<span  style={{color:'red'}}>{registerRules[2].errorMessage}</span>}*/}
                <label>Zipcode: </label>
                <input id={'profileZipcode'} type="text" />
                {zipcodeErr&&<span  style={{color:'red'}}>{registerRules[4].errorMessage}</span>}
                <label>Password: </label>
                <input id={'profilePassword'} type="password" />
                {submitErr&&<span  style={{color:'red'}}>Miss value or value format error!</span>}
                <button className="settingsSubmitButton">Update</button>
            </form>
    </div>
    )
}
