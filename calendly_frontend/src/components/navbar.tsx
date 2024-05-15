import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import reactLogo from "../assets/react.svg";
import "../assets/css/navbar.css";

function Navbar() {
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("accessToken");
    if (token) {
      setAuthToken(token);
    }
  }, []);

  const redirectToFrontend = () => {
    window.location.href = "http://localhost:8787/oauth2/authorization/google";
  };

  return (
    <>
      <div className="Navbar_cont">
        <div className="Logo_app">
          <Link to="/" className="button">
            <img src={reactLogo} className="App-logo" alt="logo" />
          </Link>
        </div>
        <div>
          <Link to="/EventsList" className="font-mono font-extrabold text-xl">
            Events
          </Link>
        </div>
        <div className="login_logout">
          <>
            <Link onClick={redirectToFrontend} to="/login" className="button">
              <button className="fancy">
                <span className="top-key"></span>
                <span className="text">Login</span>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
              </button>
            </Link>
          </>
        </div>
      </div>
    </>
  );
}

export default Navbar;
