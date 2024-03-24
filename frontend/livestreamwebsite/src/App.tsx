import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import StreamLive from "./pages/StreamLive";
import WatchLive from "./pages/WatchLive";
import { AuthProvider } from "./utils/AuthContext";
import { LiveVideosProvider } from "./utils/LiveVideosContext";
import PrivateRoutes from "./utils/PrivateRoutes";
import { VideosProvider } from "./utils/VideosContext";

function App() {
  return (
    <>
      <AuthProvider>
        <LiveVideosProvider>
          <VideosProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route element={<PrivateRoutes />}>
                  <Route element={<Home />} path="/home/*" />
                  <Route element={<StreamLive />} path="/stream-live" />
                  <Route element={<WatchLive />} path="/watch-live" />
                  {/* <Route element={<Products />} path="/products" /> */}
                </Route>
                <Route element={<LoginPage />} path="/login" />
              </Routes>
            </Router>
          </VideosProvider>
        </LiveVideosProvider>
      </AuthProvider>
    </>
  );
}

export default App;
