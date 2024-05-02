import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const authObject = auth ? JSON.parse(auth) : null;

    if (!authObject || !authObject.accessToken) {
      console.log(authObject);
      console.log(authObject?.accessToken); // Add a null check here
    }
  }); // Include test as a dependency

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Display additional content for authenticated users here */}
    </div>
  );
};

export default Home;
