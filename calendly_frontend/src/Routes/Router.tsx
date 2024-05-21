import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Pages/Home";
import tok from "../auth/auth";
import EventForm from "../Pages/EventForm";
import EventList from "../Pages/Events/EventList";
import CreateEvent from "../Pages/Events/CreateEvent";
import ModifyEvent from "../Pages/Events/ModifyEvent";
import DashBoard from "@/Pages/DashBoard";
import EventDetailPage from "@/Pages/Events/EventsDetails";

const Router = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/EventsList" Component={EventList} />
          <Route path="/create" Component={CreateEvent} />
          <Route path="/modify/:id" Component={ModifyEvent} />
          <Route path="/events/:id" Component={EventDetailPage} />
          <Route path="/events" Component={EventForm} />
          <Route path="/tok" Component={tok} />
          <Route path="/board" Component={DashBoard} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Router;
