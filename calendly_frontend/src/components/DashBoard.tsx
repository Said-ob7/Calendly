import EventListPage from "@/Pages/Events/EventList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaGithub, FaDiscord, FaRegClock } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { CiSettings } from "react-icons/ci";

const Name = localStorage.getItem("name");
const Profile = localStorage.getItem("profile");

function DashBoard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownOpenChange = (
    open: boolean | ((prevState: boolean) => boolean)
  ) => {
    setIsDropdownOpen(open);
  };
  return (
    <>
      <div className="flex min-w-full min-h-screen bg-black">
        <div className="bg-black-800 border-r border-neutral-500 min-h-screen w-52 flex flex-col items-center text-white">
          <DropdownMenu onOpenChange={handleDropdownOpenChange}>
            <DropdownMenuTrigger asChild>
              <button className="mt-5 hover:bg-neutral-700 w-44 rounded-md">
                <div className="flex flex-row items-center ">
                  <img
                    src={Profile ?? ""}
                    alt=""
                    className="m-2 w-5 h-5 rounded-full "
                  />
                  <p className="m-2.5">{Name}</p>
                  {isDropdownOpen ? (
                    <MdKeyboardArrowDown />
                  ) : (
                    <MdKeyboardArrowRight />
                  )}
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-black text-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <CgProfile className="mr-2" />
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem>
                  <CiSettings className="mr-2" />
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem>Email</DropdownMenuItem>
                      <DropdownMenuItem>Message</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>More...</DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem>
                  New Team
                  <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <FaDiscord className="mr-2" />
                Discord
              </DropdownMenuItem>
              <DropdownMenuItem>
                <FaGithub className="mr-2" />
                GitHub
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IoMdHelpCircleOutline className="mr-2" />
                Help
              </DropdownMenuItem>
              <DropdownMenuItem disabled>API</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <HiOutlineLogout className="mr-2" />
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="mt-10 ml-3 mr-3">
            <button className="rounded-md  hover:bg-neutral-700 w-44 h-8 ">
              <p className="ml-5 float-left flex flex-row items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-link todesktop:!text-blue-500 mr-2 h-4 w-4 flex-shrink-0 rtl:ml-2 md:ltr:mx-auto lg:ltr:mr-2 [&amp;[aria-current='page']]:text-inherit"
                  aria-hidden="true"
                  aria-current="page"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                </svg>
                Event List
              </p>
            </button>
            <button className="rounded-md  hover:bg-neutral-700 w-44 h-8 ">
              <p className="ml-5 float-left flex flex-row items-center">
                <FaRegClock className="mr-2" />
                Availability
              </p>
            </button>
          </div>
        </div>
        <div className="bg-neutral-900 flex-grow min-h-screen flex justify-center items-start p-4">
          <div className="w-full">
            <EventListPage />
          </div>
        </div>
      </div>
    </>
  );
}

export default DashBoard;
