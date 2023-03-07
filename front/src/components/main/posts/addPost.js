import "./addPost.css";
import {useEffect, useRef, useState} from "react";
import {addArticle, changeArticle, uploadImage} from "../../../api/request";

export default function AddPost(props) {
    const [inputErr,setInputErr] = useState(false)
    const imgSrc = useRef()
    const imgForm = useRef()
    useEffect(()=>{
        window.onmessage= function (e) {
            console.log(e)
            if (typeof e.data === 'string') {
                if (e?.data?.indexOf('http') === 0) {
                    imgSrc.current = e.data
                }
            }
        }
        if (props.editingPost){
            document.querySelector('#titleInput').value = props.editingPost.title
            document.querySelector('#contentInput').value = props.editingPost.content
        }
        return ()=>{
            window.onmessage = null
        }
    },[])

    const handleSubmit = e => {

        e.preventDefault()

        const titleValue = document.querySelector('#titleInput').value
        const contentValue = document.querySelector('#contentInput').value
        if (!titleValue||!contentValue){
            setInputErr(true)
        }else {
            if(props.editingPost){
                let data = JSON.parse(JSON.stringify(props.editingPost))
                data.title = titleValue
                data.content = contentValue
                changeArticle(props.editingPost._id,data).then(res=>{
                    setInputErr(false)
                    props.addPost()
                }).catch(err=>{
                    setInputErr(true)
                })
            }else{
                addArticle({titleValue,contentValue,img:imgSrc.current}).then(res=>{
                    setInputErr(false)
                    props.addPost()
                }).catch(err=>{
                    setInputErr(true)
                })
            }

        }
    }
    const upload = e => {
        imgForm.current.click()
    }
    return (
        <div className="addPost">
            <form className="addPostForm" onSubmit={handleSubmit} >
                {!!props.editingPost&&<div>{props.editingPost.id}</div>}
                <div className="addPostFormGroup">
                    <form id={'imgForm'} target={'form'} method="post" encType="multipart/form-data" action={`http://127.0.0.1:3001/image`}>
                        <input style={{display:'none'}} type="text" name="title"/>
                     <input type="file" name="image" onChange={upload}/>
                     <input ref={imgForm} style={{display:'none'}} type="submit" value="Upload"/>
                    </form>
                    <iframe height={'210px'} seamless={true} scrolling={'no'} style={{border:'none'}} name="form" id="form"></iframe>
                </div>
                <div className="addPostFormGroup">
                    <input id={'titleInput'} name={'title'} type="text" placeholder={"Story title..."}/>
                    <textarea
                        id={'contentInput'}
                        name={'content'}
                        placeholder="Tell your story..."
                        type="text"
                        className="addPostInput addPostText">
                    </textarea>
                </div>
                {inputErr&&<span style={{color:'red'}}>Please fill all inputs above!</span>}
                <input type="reset" value="Clear" className="addPostSubmit"/>
                <button className="addPostSubmit">{props.editingPost?'Modify':'Publish'}</button>
            </form>
        </div>
    )
}
