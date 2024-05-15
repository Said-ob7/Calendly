import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "", // Lowercase field names to match backend entity
    description: "",
    startTime: "",
    endTime: "",
  });

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken) {
      console.error("Access token not found in local storage");
      return;
    }

    fetch("http://localhost:8787/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        navigate("/EventsList");
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  return (
    <>
      <div className="mb-6">
        <div className="flex justify-center mt-20 mb-20">
          <h1 className="font-mono text-6xl font-extrabold ">
            Create New Event
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-6"
        >
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label>Title:</label>
            </div>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label>Description:</label>
            </div>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label>Start Time:</label>
            </div>
            <Input
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label>End Time:</label>
            </div>
            <Input
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Create Event</button>
        </form>
      </div>
    </>
  );
}

export default CreateEvent;
