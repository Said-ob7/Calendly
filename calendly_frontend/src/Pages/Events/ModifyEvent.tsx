// CreateEventPage.js
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/navbar";

function ModifyEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    endTime: "",
  });
  const { id } = useParams();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    // Fetch event details for given id upon component mount
    fetch(`http://localhost:8787/api/events/${id}`)
      .then((response) => response.json())
      .then((data) => setFormData(data))
      .catch((error) => console.error("Error fetching event details:", error));
  }, [id]);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    // Send updated form data to backend for event modification
    fetch(`http://localhost:8787/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        // Redirect to event list page after successful modification
        navigate("/EventsList"); // Use navigate function
      })
      .catch((error) => console.error("Error modifying event:", error));
  };

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-center mt-20 mb-20">
          <h1 className="font-mono text-6xl font-extrabold ">Modify Event</h1>
        </div>
        <form
          className="flex flex-col justify-center items-center gap-6"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label className="text-xl font-bold">Title:</label>
            </div>
            <Input
              className="max-w-60"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label className="text-xl font-bold">Description:</label>
            </div>
            <Input
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label className="text-xl font-bold">Start Time:</label>
            </div>
            <Input
              className="max-w-60 "
              type="datetime-local"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            ></Input>
          </div>
          <div className="flex flex-row items-center gap-6">
            <div className="min-w-40">
              <label className="text-xl font-bold">End Time:</label>
            </div>
            <Input
              className="max-w-60"
              type="datetime-local"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Save Changes</Button>
        </form>
      </div>
    </>
  );
}

export default ModifyEvent;
