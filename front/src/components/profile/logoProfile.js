import {Link} from "react-router-dom";

export default function LogoProfile() {
    return (
        <div className="top">
            <div className="topLeft">
                <div className="topLeftContent">Rice Book</div>
                <i className="topIcon fa-solid fa-bowl-rice"></i>
                <i className="topIcon fa-solid fa-book"></i>
            </div>
            <div className="topCenter">
                <div className="topCenterContent" >Welcome to Profile Page</div>
            </div>
            <div className="topRight">
                {/* ul is unordered list, li us list items */}
                <ul className="topList">
                    <li className="topListItem">
                        <Link to="/main">Main</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}