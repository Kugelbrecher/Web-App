import React, { useState } from "react";
import "./landing.css"
// the useState hook here is used to decide which form to display (login or register)


import { Login } from "./login";
import Register from "./register";
import LogoLand from "./logoLand";

function LandingPage() {

    return (
        <div>
            <LogoLand />
            <div className="landing-page">
                <Register />
                <Login />
            </div>
        </div>
    )

/*
    const [currentForm, setCurrentForm] = useState("login");

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    }

    return (
        <div className="App">
            {   // if currentForm (status hook) is login, display the login form, otherwise display the register form
                currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />
            }
        </div>
    );*/
}

export default LandingPage;