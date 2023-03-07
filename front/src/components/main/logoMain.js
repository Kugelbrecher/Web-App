import "./logo.css";
import {Link, useNavigate} from "react-router-dom";
import store from "../../store";
import {logout} from "../../api/request";

export default function LogoMain() {
    const navigate = useNavigate()
    // TODO: replace: true: history stack with a new one
    const _logout = () => {
        logout().then()
        store.dispatch({
            type:'change_user_info',
            value: {}
        })
        navigate('/',{replace: true})
    }

    return (
        <div className="top">
            <div className="topLeft">
                <div className="topLeftContent">Rice Book</div>
                <i className="topIcon fa-solid fa-bowl-rice"></i>
                <i className="topIcon fa-solid fa-book"></i>
            </div>
            <div className="topCenter">
                <div className="topCenterContent" >Welcome to Main Page</div>
            </div>
            <div className="topRight">
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/profile">Profile</Link>
                    </li>
                    <li className="topListItem">
                        <div className="customLink" onClick={_logout}>Logout</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}


/*          use useNavigate to logout
* https://reach.tech/router/api/navigate
* navigate(to, { state={}, replace=false })
* If you pass replace: true to navigate
* then the current entry in the history stack will be replaced with the new one.
* */
