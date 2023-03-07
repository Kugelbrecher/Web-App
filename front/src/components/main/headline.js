import "./headline.css";
import store from '../../store'
import {useEffect, useState} from "react";
import {addFollowing, changeHeadline, getAvatar, getFollowing, removeFollowing} from "../../api/request";

export default function Headline() {
    const [userInfo, setUserInfo] = useState('');
    const [status, setStatus] = useState('');
    const [userNameInputError, setUserNameInputError] = useState(false)
    const [followers, setFollowers] = useState(null)

    useEffect(() => {
        getAvatars(store.getState().currentUserInfo?.following)
        refreshUserInfo()
        setStatus(store.getState().currentUserInfo?.headline)
        // getFollowing(store.getState().currentUserInfo?.username).then()
        // console.log(store.getState().currentUserInfo)
        // console.log(store.getState().currentUserInfo.company.catchPhrase)
    }, [])

    const updateStatus = () => {

        const value = document.getElementById('statusInput').value
        changeHeadline(value).then(res=>{
            console.log(value)
            setStatus(value)

            store.dispatch({
                type: 'change_user_info',
                value: Object.assign(store.getState().currentUserInfo, {headline: value})
            })
        }).catch(err=>{
            console.log(err)
        })


    }

    function refreshUserInfo() {
        setUserInfo(store.getState().currentUserInfo)
    }

    function unFollow(username) {
        removeFollowing(username).then(res=>{
            getAvatars(res.following)
            const newUserInfo = JSON.parse(JSON.stringify(userInfo))
            newUserInfo.following = res.following
            store.dispatch({
                type: 'change_user_info',
                value: newUserInfo
            })
        })

/*        userInfo.followers.splice(index, 1)
        store.dispatch({
            type: 'change_user_info',
            value: JSON.parse(JSON.stringify(userInfo))
        })

        let data = store.getState().currentUserInfo
        setUserInfo(state => {
            return data
        })*/
    }


    if (!userInfo) {
        return <></>
    }


    const searchAndAdd = () => {
        const userNameInput = document.querySelector('#randomAddInput').value

        if (!userNameInput) {
            setUserNameInputError("Please input a user name!")
            return
        }

        if (store.getState()?.currentUserInfo?.username===userNameInput) {
            setUserNameInputError("You can't follow yourself!")
            return;
        }

        addFollowing(userNameInput).then(res => {
            console.log('addFollowing',res)

            if (res.result==='success') {
            setUserNameInputError(false)
            const newUserInfo = JSON.parse(JSON.stringify(userInfo))

            newUserInfo.following=res.following
            getAvatars(res.following)
            setUserInfo(newUserInfo)
            store.dispatch({
                type: 'change_user_info',
                value: newUserInfo
            })
            refreshUserInfo()
            }else{
                setUserNameInputError(res.msg)
            }
        })



        /*const user = store.getState().totalUserInfo.find(user => user.username === userNameInput)
        console.log('user',user)
        console.log(userInfo)
        if (!user) {
            setUserNameInputError("User not found!")
            return;
        }



        if (userInfo.followers.find(follower => follower.id === user.id)) {
            setUserNameInputError("You have already followed this user!")
            return;
        }
*/

    }
    function getAvatars(usernames){
        setFollowers([])
        usernames?.forEach(username=>{
            getAvatar(username).then(res=>{
                console.log(res)
                setFollowers(followers=>[...followers,{username:username,avatar:res.avatar}])
            }
            )
        })
    }
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src={userInfo.avatar}
                     alt=" user profile image"/>
                {/*<span>{userInfo.name||userInfo.username}</span>*/}
                <span>{userInfo.username}</span>
                <span>{status}</span>
                <input id={'statusInput'} type="text" placeholder="My status now is ..."/>
                <button onClick={updateStatus}>Update</button>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Following</span>
                <div>
                    {followers?.map((e, i) => {
                        return (<div className="followersItem" key={i}>
                            <img src={e.avatar} alt=""/>
                            <div>{e.username}</div>
                            <div>{e?.headline}</div>
                            <button onClick={() => {
                                unFollow(e.username)
                            }}>Unfollow
                            </button>
                        </div>)
                    })}
                </div>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">Add New Friends</span>
                <input id='randomAddInput' type="text" placeholder="Search for friends"/>
                {!!userNameInputError && <span style={{color: 'red'}}>{userNameInputError}</span>}
                <button onClick={searchAndAdd}>Search and Add</button>
            </div>
        </div>
    )
}

/*                      Array.prototype.splice()
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
* here we used to unfollow a user: splice(start, deleteCount)
* start: index of an element in the array, deleteCount: how many elements to delete from the start index
* here we use userInfo.followers.splice(index,1) to delete the element at index
* return the modified array
* */
