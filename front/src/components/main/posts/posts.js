import "./posts.css";
import postsData from '../../../data/articles.json'
import Post from "./post";
import React, {useEffect, useState} from "react";
import store from "../../../store";
import AddPost from "./addPost";
import {getArticles} from "../../../api/request";

export default function Posts() {
    const [posts,setPosts] = useState([])
    const [originPosts,setOriginPosts] = useState([])
    const [customPosts,setCustomPosts] = useState([])
    const [page,setPage] = useState(1)
    const [postsCount,setPostsCount] = useState(0)
    const [editingPost,setEditingPost] = useState(null)

    useEffect(()=>{
        refreshPosts()
        const unsubscribe =  store.subscribe(function(){
            refreshPosts()
        })
        return ()=>{
            unsubscribe()
        }
    },[])


    function refreshPosts(_page) {
        setEditingPost(null)
        getArticles(_page||page).then(res=>{
            setPosts(res.data)
            setOriginPosts(res.data)
            setPostsCount(res.total)
        })
    }


    const search = (e) => {
        const _posts = JSON.parse(JSON.stringify(originPosts))
        const searchValue = e.target.value
        if (!searchValue){
            setPosts(_posts)
        }else{
            const data = _posts.filter(e=>{
                return !!(e.title.includes(searchValue) || e.content.includes(searchValue));
            })
            setPosts(data)
        }
    }

    return (
        <div>
            <AddPost editingPost={editingPost} addPost={refreshPosts}/>
            <div className="searchBar">
                <label htmlFor="searchInput">Search:</label>
                <input type="text" placeholder="Search" onChange={search}/>
            </div>

            <div className="posts">
                {posts.map((e,i)=>{
                    return <Post setEditingPost={setEditingPost} data={e} key={i}/>
                })}
            </div>
            <div>
                {new Array(Math.floor(postsCount/10)+1).fill(1).map((e,i)=>{
                    return <button onClick={()=>{
                    setPage(i+1)
                    refreshPosts(i+1)
                    }
                    } key={i} className="postButton" style={i+1===page?{background:"green"}:{}}>{i+1}</button>
                })}
            </div>
        </div>

    )
}
