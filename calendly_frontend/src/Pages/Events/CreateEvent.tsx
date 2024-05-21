import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "@/components/ui/calendar"; // Adjust the import path as needed
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    duration: "",
    link: "",
    eventType: "inPerson", // Default event type
  });

  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateSelect = (
    date: string | number | Date | dayjs.Dayjs | null | undefined
  ) => {
    setFormData((prevState) => ({
      ...prevState,
      date: dayjs(date).format("YYYY-MM-DD"), // format to match the datetime-local input
    }));
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken");
    const email = localStorage.getItem("email");

    if (!accessToken) {
      console.error("Access token not found in local storage");
      return;
    }

    fetch(`http://localhost:8787/api/events?email=${email}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    })
      .then(() => {
        navigate("/board");
      })
      .catch((error) => console.error("Error creating event:", error));
  };

  return (
    <div className="bg-neutral-900">
      <div className="h-screen w-full   dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex justify-center items-center">
        <div className="mb-6 w-3/5 ">
          <Card className="bg-black h-full">
            <div className="flex justify-center mt-10">
              <h1 className="font-mono text-6xl font-extrabold text-cyan-400">
                Create New Event
              </h1>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-center gap-10 m-10"
            >
              <div className="flex flex-row items-center gap-44   ">
                <div className="w-96">
                  <div className="flex flex-col  gap-2">
                    <div className="font-mono min-w-40 text-white">
                      <label>Title:</label>
                    </div>
                    <Input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col  gap-2">
                    <div className="font-mono min-w-40 text-white">
                      <label>Description:</label>
                    </div>
                    <Input
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col  gap-2">
                    <div className="font-mono min-w-40 text-white">
                      <label>Date: </label>
                    </div>
                    <Input
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col  gap-2">
                    <div className="font-mono min-w-40 text-white">
                      <label>Duration (in minutes):</label>
                    </div>
                    <select
                      name="duration"
                      value={formData.duration}
                      onChange={handleChange}
                      className="bg-gray-800 text-white border-none rounded-md p-2"
                    >
                      <option value="15">15 minutes</option>
                      <option value="30">30 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">1 hour</option>
                    </select>
                  </div>
                  {/* Dropdown select for event type */}
                  <div className="flex flex-col gap-2">
                    <label className="font-mono min-w-40 text-white">
                      Event Type:
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleChange}
                      className="bg-gray-800 text-white border-none rounded-md p-2"
                    >
                      <option value="inPerson">In Person</option>
                      <option value="virtual">Virtual</option>
                      <option value="phoneCall">Phone Call</option>
                    </select>
                  </div>
                  <div className="flex flex-col  gap-2">
                    {/* Render location input if event type is in person */}
                    {formData.eventType === "inPerson" && (
                      <>
                        <div className="font-mono min-w-40 text-white">
                          <label>Location:</label>
                        </div>
                        <Input
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          required
                        />
                      </>
                    )}
                    {/* Render link input if event type is virtual */}
                    {formData.eventType === "virtual" && (
                      <>
                        <div className="font-mono min-w-40 text-white">
                          <label>Link:</label>
                        </div>
                        <Input
                          name="link"
                          placeholder="Meeting Link"
                          value={formData.link}
                          onChange={handleChange}
                          required
                        />
                      </>
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center gap-6">
                  <Calendar mode="single" onSelect={handleDateSelect} />
                </div>
              </div>
              <button
                type="submit"
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-white border border-gray dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
              >
                Create Event
              </button>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CreateEvent;
