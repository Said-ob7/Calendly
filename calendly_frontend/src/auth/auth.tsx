import React, { useEffect, useState } from "react";

function App() {
  const [idToken, setIdToken] = useState("");
  const [Name, setName] = useState("");
  const [profile, setProfile] = useState("");

  useEffect(() => {
    // Define the endpoint URL
    const url = "http://localhost:8787/auth";

    // Define the request headers
    const headers = {
      "Content-Type": "application/json",
    };

    // Define the fetch options including credentials
    const fetchOptions = {
      method: "GET",
      headers: headers,
      credentials: "include" as RequestCredentials, // Include credentials in the request
    };

    // Make the fetch request to the endpoint
    fetch(url, fetchOptions)
      .then((response) => response.json())
      .then((data) => {
        // Extract the idToken tokenValue from the response
        const idTokenValue = data.authorities[0].idToken.tokenValue;
        const Name = data.authorities[0].attributes.name;
        const profile = data.authorities[0].attributes.picture;
        setIdToken(idTokenValue);
        localStorage.setItem("accessToken", idTokenValue);
        localStorage.setItem("name", Name);
        localStorage.setItem("profile", profile);
        setName(Name);
        console.log(Name);
        console.log(idTokenValue);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h1>IdToken Token Value:</h1>
      <p>{idToken}</p>
    </div>
  );
}

export default App;
