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
import { FaPlus, FaShareAlt, FaRegCopy } from "react-icons/fa";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { SiGooglemeet } from "react-icons/si";
import { FaLocationDot } from "react-icons/fa6";
import { BsFillCalendarDateFill } from "react-icons/bs";
import { FaClock } from "react-icons/fa6";

interface Event {
  id: number;
  title: string;
  description: string;
  location: string;
  date: string;
  duration: string;
  link: string;
  time: string;
}

function EventListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLink, setModalLink] = useState("");
  const { toast } = useToast();
  const email = localStorage.getItem("email");

  useEffect(() => {
    // Fetch events from backend upon component mount
    fetch(`http://localhost:8787/api/events?email=${email}`)
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

  const handleShare = (id: number) => {
    const shareUrl = `${window.location.origin}/events/${id}`;
    setModalLink(shareUrl);
    handleCopy(); // Copy the link
    // Show toast notification
    toast({
      title: "Link Copied Successfully",
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(modalLink).catch((error) => {
      console.error("Error copying link to clipboard:", error);
    });
  };

  return (
    <>
      <div className="flex flex-row items-center justify-between">
        <div>
          <h1 className="text-white font-bold text-4xl">Event Types</h1>
          <p className="text-white hidden text-lg md:block">
            Create events to share with your colleagues.
          </p>
        </div>
        <div className="right-0 justify-between">
          <Button className="right-0" variant="outline">
            <Link className="flex flex-row items-center gap-2" to="/create">
              <FaPlus />
              New Event
            </Link>
          </Button>
        </div>
      </div>

      <div className="flex flex-col mt-24">
        <div className="flex flex-wrap gap-6">
          {events.map((event) => (
            <Link
              to={`/events/${event.id}`}
              key={event.id}
              className="w-[320px]"
            >
              <Card className="h-[300px] overflow-hidden flex flex-col bg-black text-white">
                <CardHeader>
                  <CardTitle className="font-mono text-3xl truncate text-cyan-400">
                    {event.title}
                  </CardTitle>
                  <CardDescription className="text-white truncate">
                    {event.description}
                  </CardDescription>
                  <CardDescription className="text-white flex flex-row items-center gap-2">
                    <BsFillCalendarDateFill />
                    {event.date} - {event.time}
                  </CardDescription>
                  <CardDescription className="text-white flex flex-row items-center gap-2">
                    <FaClock />
                    {event.duration} minutes
                  </CardDescription>
                  <CardDescription className="text-white flex flex-row items-center gap-2">
                    <FaLocationDot />
                    {event.location}
                  </CardDescription>
                  {event.link && (
                    <CardDescription className="text-white decoration-amber-300 ">
                      <a
                        className="flex flex-row items-center decoration-sky-500"
                        href={event.link}
                      >
                        <SiGooglemeet className="mr-2" />
                        Google Meet
                      </a>
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="flex-grow"></CardContent>
                <CardFooter className="flex justify-between gap-5">
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the link from navigating
                      handleDelete(event.id);
                    }}
                    className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-white border border-gray dark:border-white dark:text-white text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                  >
                    Delete
                  </button>
                  <button className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2 bg-black border border-white dark:border-white dark:text-white text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400">
                    <Link to={`/modify/${event.id}`}>Modify</Link>
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the link from navigating
                      handleShare(event.id);
                    }}
                    className="   text-white rounded-lg font-bold transform hover:-translate-y-1 transition duration-400"
                  >
                    <FaShareAlt />
                  </button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold mb-10">Share Event</h2>
            <div className="flex flex-row items-center gap-5 mb-10">
              <p className="font-bold">{modalLink}</p>
              <button onClick={handleCopy}>
                <FaRegCopy className="inline-block " />
              </button>
            </div>
            <div className="flex justify-center">
              <button
                onClick={() => setIsModalOpen(false)}
                className="shadow-[0_0_0_3px_#000000_inset] px-6 py-2  text-black rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 ml-4"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default EventListPage;
