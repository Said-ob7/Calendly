import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Navbar from "@/components/navbar";
import { FaPlus } from "react-icons/fa";

interface Event {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
}

function EventListPage() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    // Fetch events from backend upon component mount
    fetch("http://localhost:8787/api/events")
      .then((response) => response.json())
      .then((data: Event[]) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const handleDelete = (id: number) => {
    // Delete event with given id
    fetch(`http://localhost:8787/api/events/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        // Update events list after successful deletion
        setEvents(events.filter((event) => event.id !== id));
      })
      .catch((error) => console.error("Error deleting event:", error));
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-4xl">Event Types</h1>
          <p
            className="text-white hidden text-lg md:block"
            data-testid="subtitle"
          >
            Create events to share to your collegues.
          </p>
        </div>
        <div className="right-0 justify-between">
          <Button className="right-0" variant="outline">
            <Link className="flex flex-row items-center gap-2" to="/create">
              <FaPlus className="" />
              New Event
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col  mt-24">
        <div className="flex flex-wrap  gap-6 ">
          {events.map((event) => (
            <Card
              className="w-[300px] h-[250px] overflow-hidden flex flex-col bg-black text-white"
              key={event.id}
            >
              <CardHeader>
                <CardTitle className="font-mono text-3xl truncate">
                  {event.title}
                </CardTitle>
                <CardDescription className="text-white truncate">
                  {event.description}
                </CardDescription>
                <CardDescription className="text-white ">
                  {event.startTime} - {event.endTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow"></CardContent>
              <CardFooter className="flex justify-between">
                <button
                  onClick={() => handleDelete(event.id)}
                  className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-white border border-gray dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                >
                  Delete
                </button>
                <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-black border border-white dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                  <Link to={`/modify/${event.id}`}>Modify</Link>
                </button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default EventListPage;
