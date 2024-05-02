import { useEffect } from "react";
import axios from "axios";

const AuthHandler = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      axios
        .post("http://localhost:8787/api/authenticate", { code })
        .then((response) => {
          localStorage.setItem("auth", JSON.stringify(response.data));
          console.log("Authenticated!", response.data);
          // Redirect to the home page after successful authentication
        })
        .catch((error) => {
          console.error("Authentication error:", error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Authentication in progress...</h1>
    </div>
  );
};

export default AuthHandler;
