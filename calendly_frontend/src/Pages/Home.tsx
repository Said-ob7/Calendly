import { BackgroundBeams } from "@/components/ui/AuroraBackground";

import { FcGoogle } from "react-icons/fc";

const Home = () => {
  const redirectToFrontend = () => {
    window.location.href = "http://localhost:8787/oauth2/authorization/google";
  };

  return (
    <>
      <div className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Welcome to the Home Page
          </h1>
          <p></p>
          <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
            Welcome to MailJet, the best transactional email service on the web.
            We provide reliable, scalable, and customizable email solutions for
            your business. Whether you&apos;re sending order confirmations,
            password reset emails, or promotional campaigns, MailJet has got you
            covered.
          </p>
          <div className="relative flex flex-row justify-center mt-5">
            <button
              onClick={redirectToFrontend}
              className="relative z-10 inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
            >
              <FcGoogle />
              Login
            </button>
          </div>
        </div>
        <BackgroundBeams />
      </div>
    </>
  );
};

export default Home;
