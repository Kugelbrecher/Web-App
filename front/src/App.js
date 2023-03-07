import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// react-router-dom V6: switch are updated to Routes
// https://reactrouter.com/en/v6.3.0/upgrading/v5#:%7E:text=single%20route%20config%3A-,//%20This%20is%20a%20React%20Router%20v6%20app,%7D,-This%20step%20is

import LandingPage from "./components/auth/LandingPage";
import MainPage from "./components/main/MainPage";
import ProfilePage from "./components/profile/ProfilePage";

function App() {
    return (
        <Router>
            <Routes>
                {/* use exact keyword if it's path is included in other path */}
                <Route eact path="/" element={<LandingPage />} />
                <Route path="/main" element={<MainPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Router>
    );
}

export default App;
