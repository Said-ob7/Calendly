import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import AuthHandler from "../Pages/AuthHandler";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth" Component={AuthHandler} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
