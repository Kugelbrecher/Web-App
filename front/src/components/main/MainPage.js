import store from "../../store";
import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import "./mainPage.css";
import LogoMain from "./logoMain";
import Headline from "./headline";
import Posts from "./posts/posts";
import {getArticles} from "../../api/request";

export default function MainPage() {
    const navigate = useNavigate()
    const currentUserInfo = store.getState().currentUserInfo
    // console.log(currentUserInfo)
    useEffect(() => {
        if (!currentUserInfo.username) {
            navigate('/')
        }
    }, [])

    return (
        <div>
            <LogoMain />
            <div className="home-page">
                <Headline />
                <div>
                    <Posts />
                </div>
            </div>
        </div>
    )
}


/*                useEffect, react-hooks/exhaustive-deps
* the useEffect hook is used to run a function when the component is mounted
* the second argument is an array of dependencies, if the dependencies change, the function will be run again
* if the second argument is an empty array, the function will only be run once when the component is mounted
* if the second argument is not provided, the function will be run every time the component is rendered
* source: https://bobbyhadz.com/blog/react-hooks-exhaustive-deps
* source: https://reactjs.org/docs/hooks-rules.html
* */
