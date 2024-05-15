import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "@/components/navbar";

const EventForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [message, setMessage] = useState("");
  const [calendarId, setCalendarId] = useState("");

  useEffect(() => {
    // Get token from local storage
    const token = localStorage.getItem("accessToken");
    if (token) {
      // Set token in state
      setAccessToken(token);
      console.log(token);
    } else {
      setAccessToken(
        "eyJhbGciOiJSUzI1NiIsImtpZCI6ImEzYjc2MmY4NzFjZGIzYmFlMDA0NGM2NDk2MjJmYzEzOTZlZGEzZTMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIzNDcwNTgyNzY5Mzctdm1wM2plNThsc2s3NTRlMnJiYW5mcG9iYXU0Y2h2cGEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIzNDcwNTgyNzY5Mzctdm1wM2plNThsc2s3NTRlMnJiYW5mcG9iYXU0Y2h2cGEuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDM2MzgwNDEzNTA0MzgxMTM4NDEiLCJlbWFpbCI6InNhaWRlbG91YmlkMUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6IjhTSGgxLVdqOTRzelBxYzNRRHJRdnciLCJub25jZSI6Ik4wTkxCemNWV183UHZnUjZQallGTWZ4T3VCRWcteERmOVU3aHR1bmVDdVEiLCJuYW1lIjoiU2FpZCBPdWJpZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NKY2labXY4TGJPeXR4Y2drSTJNSVFCQnlfNDhkZmoybGZpMm1IY0F3WjVKV0E2clE4PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IlNhaWQiLCJmYW1pbHlfbmFtZSI6Ik91YmlkIiwiaWF0IjoxNzE1NjM0MzcxLCJleHAiOjE3MTU2Mzc5NzF9.JDYeNkvU_Dk5VEWDOw__j8QWr6ka9tpw73h7wdaaWfgr1FwYr0WAUHWoLn-MPvraEWLzCFWTP7Y4WQNqZX3oNwoIy_EWxJHbqhU4qi7uCqwuLIvQnh8Jq36JQdH-_jK9E6lUi7z7qw7txZKvbOUMAiG5pJ0kUKn2r9bxc06o1C-NbQP7pRlbSbHrdoQhTAJUvBUSgJwQbLY9HgHfaRCQZkkKK9bUMWTxx5sH5Dp-jBktx2UcaQHUIe-G5no_hYC2bdlievLm0Dw6X2QIqO1lqJvzTFt5EAJWOr1ysHTg9qZTg5Z0bkuShUEbAot9_AQBJ-N9sryBINdXRRLYgrJBRw"
      );
    }
  }, []);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8787/events",
        {
          title,
          description,
          location,
          startTime,
          endTime,
        },
        {
          params: {
            accessToken, // Pass accessToken as a request parameter
            calendarId,
          },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      setMessage(response.data);
      console.log(response.data);
      console.log("Success");
    } catch (err) {
      setMessage(`Failed to create event. Error: ${err}`);
      console.log("failed to create");
    }
  };

  return (
    <>
      <Navbar />
      <div>
        <h2>Create Event</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <br />
          <label>
            Description:
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <br />
          <label>
            Location:
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </label>
          <label>
            CalendarId:
            <input
              type="text"
              value={calendarId}
              onChange={(e) => setCalendarId(e.target.value)}
            />
          </label>
          <br />
          <label>
            Start Time:
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <br />
          <label>
            End Time:
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
          <br />

          <br />
          <button type="submit">Create Event</button>
        </form>
        <p>{message}</p>
      </div>
    </>
  );
};

export default EventForm;
