import "./post.css";
import store from "../../../store";
import {useEffect, useRef, useState} from "react";
import {addComment} from "../../../api/request";

export default function Post(props) {
    const [userInfo, setUserInfo]  = useState({})
    const [showComment,setShowComment] = useState(true)
    const [showCommentInput,setShowCommentInput] = useState(false)
    const [showCommentNum,setShowCommentNum] = useState(3)
    const [comment,setComment] = useState([])
    const input = useRef()
    const getUserInfo = () => {
        const _userInfo = store.getState().currentUserInfo
        setUserInfo(_userInfo)
    }

    const random = Math.round(Math.random()*4)+1
    const totalUserInfo = store.getState().totalUserInfo

    useEffect(()=>{
        setComment(props.data.comments)
        getUserInfo()
        const unsubscribe =  store.subscribe(function(){
            getUserInfo()
        })
        return ()=>{
            unsubscribe()
        }
    },[])

    // TODO: 这便是随机的时间，要把它们按照时间排序，最新的在最上面
    const randomDate = (start, end) => {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }
    const date = randomDate(new Date(2012, 0, 1), new Date()).toLocaleString()

    const userName = totalUserInfo.filter(e=>e.id === props.data.userId)[0]?.username

    function switchComment() {
        setShowComment(!showComment)
        // if (showComment){
        //     setShowComment(false)
        // } else {
        //     setShowComment(true)
        // }
    }

    function _addComment() {
        const value = input.current?.value
        if(!value){
            return
        }
        let comments = JSON.parse(JSON.stringify(comment))
        comments.push(userInfo.username+': ' + value + ' ' + new Date().toLocaleString())
        setComment(comments)
        if (showCommentNum>=3){
            setShowCommentNum(showCommentNum+1)
        }
        addComment({
            id: props.data._id,
            commentId:-1,
            text:comments,
        }).then(res=>{
            console.log(value)
        })
    }

    const noImg = require(`../../../data/images/postImg${random}.jpeg`)
    return (
        <div className="post">
            <img className="postImg"
                src={props.data.img||noImg}
                alt="a post image"/>
            <div className="postInfo">
                <span className="postCats">Author: {props.data.author}</span>
                <span className="postTitle">{props.data.title}</span>
                <hr />
                <span>
                    {props.data.content}
                </span>
                {/*把随机生成的randomDate放进来*/}
                <span className="postDate">{new Date(props.data.date).toLocaleString()}</span>
            </div>
            <p className="postDesc">
                {props.data.body}
            </p>
            <div>
                {comment?.slice(0,showCommentNum)?.map((e,i)=>{
                    return  <p key={i}>{i+1} :  {e}</p>
                })}
            </div>
            {showCommentInput && <div>
                <input ref={input} type="text" placeholder="Comment" className="commentInput"/>
                <button className="postButton" onClick={()=>{
                    _addComment()
                    setShowCommentInput(false)
                }
                }>Submit</button>
            </div>}
            <div>
                <button className="postButton" onClick={()=>{
                    setShowCommentInput(!showCommentInput)
                }}>Comment</button>
                {userInfo.username === props.data.author && <button className="postButton"  onClick={()=>{
                    props.setEditingPost(props.data)
                    window.scrollTo(0,0)
                }}>Edit</button>}
            </div>
            <div>
                <button className="postButton" onClick={()=>{
                    if (showCommentNum>=6){
                        setShowCommentNum(showCommentNum-3)
                    }else{
                        setShowCommentNum(3)
                    }
                }}>Show less</button>
                <button className="postButton" onClick={()=>{
                    setShowCommentNum(showCommentNum+3)
                }}>Show more</button>
            </div>
        </div>
    )
}
