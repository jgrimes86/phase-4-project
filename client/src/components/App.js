import React, { useEffect, useState } from "react";
import FoodImage from "./Food.png";

import { Outlet, useLocation, useNavigate } from "react-router-dom";


function App() {
  const [user, setUser] = useState(null);
  const [event, setEvent] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [invitedFamily, setInvitedFamily] = useState([])

  const navigate = useNavigate()
  const location = useLocation();

  // console.log(invitedFamily)

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => {setUser(user); setIsLoggedIn(true)});
      }
    });
  }, []);

  useEffect(() => {
    fetch('/family_members/'+event.id)
    .then(r => {
        if (r.ok) {
            r.json().then(data => setInvitedFamily(data))
        }
    })
}, [event])

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/events");
    } else {
      navigate("/login")
    }
  }, [isLoggedIn])

  function handleLogout() {
    fetch("/logout").then((r) => {
      if (r.ok) {
        setUser(null);
        setIsLoggedIn(false)
      }
    });
  }

  const context = {
    handleLogout,
    setEvent,
    event,
    setUser,
    setIsLoggedIn,
    invitedFamily,
    setInvitedFamily
  }

  return (
    <div>
      <header className = "mainpagetitle">
        <h1 className = "Loginheader">POTLUCK</h1>
        <img src={FoodImage} alt="Food" />
        <h1 className = "Loginheader">PLANNER</h1>
      </header>
      <Outlet context={context} />
      {(isLoggedIn && location.pathname === "/events") ? <button onClick={handleLogout}>Log Out</button> : null}
      <header>
        <h1 className = "bottom"> Website created by Ed Berisha, Angelus Bootle, and Jim Grimes </h1>
      </header>
    </div>
  )
}

export default App;
