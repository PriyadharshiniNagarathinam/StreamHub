import "./App.css";
import Broadcast from "./reactComponents/Broadcast";
import GoLive from "./pages/StreamLive";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import Viewer from "./pages/WatchLive";
import { Button } from "../components/ui/button";
import VideoPlayer from "./pages/VideoPlayer";
import VideoCard from "./reactComponents/videoCard";
import { Sidebar } from "./reactComponents/sidebar";
import Home from "./pages/Home";
import UploadVideoForm from "./reactComponents/uploadVideoForm";
import TextEditor from "./reactComponents/TextEditorComp";
import LoginPage from "./pages/LoginPage";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./utils/AuthContext";

function App() {
  const HomeComponent = () => (
    <div className="flex flex-col items-center">
      <h1 className="text-center m-5">Home Page</h1>
      <Link to="/stream-live">
        <Button className="m-2">Stream Live</Button>
      </Link>
      <Link to="/watch-live">
        <Button className="m-2">Watch Live</Button>
      </Link>
    </div>
  );

  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/home/*" />
              {/* <Route element={<Products />} path="/products" /> */}
            </Route>
            <Route element={<LoginPage />} path="/login" />
          </Routes>
        </Router>
      </AuthProvider>
      {/* <LoginPage/> */}
      {/* <Home/> */}
      {/* <Router>
        <div>
          <Routes>
            {/* <Route path="/stream-live" Component={GoLive} /> 

            <Route path="/watch-live" Component={Viewer} />

            <Route path="/" Component={HomeComponent} />

            <Route path="/video-player" Component={VideoPlayer} />
            
            <Route path="/liveStreamApp" element={<MusicPage />}/>
          </Routes>
        </div>
      </Router> */}
    </>
  );
}

export default App;
