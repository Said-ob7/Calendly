import { Button } from "@/components/ui/button";

const Home = () => {
  const redirectToFrontend = () => {
    window.location.href = "http://localhost:8787/oauth2/authorization/google";
  };

  return (
    <div className="flex flex-col items-center gap-10 h-screen  justify-center">
      <h1 className="text-5xl font-bold">Welcome to the Home Page</h1>
      <Button onClick={redirectToFrontend}>Login</Button>
    </div>
  );
};

export default Home;
