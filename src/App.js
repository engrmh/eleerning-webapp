import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "./routes";
import Topbar from "./Components/Topbar/Topbar";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";

function App() {
  const router = useRoutes(routes);
  return (
    <>
      <div className="">
        <div className="">
          <Topbar />
          <Navbar />
        </div>
        <div className="">{router}</div>
        <div className="">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
