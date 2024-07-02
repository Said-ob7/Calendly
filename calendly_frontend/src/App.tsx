import "./App.css";
import Router from "./Routes/Router";
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
