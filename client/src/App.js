import Topbar from "./components/topbar/Topbar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Sattings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./privateRoutes/PrivateRoutes";
import { useContext } from "react";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context)
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes user={user} path={"/"} />}>
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<PrivateRoutes user={user} path={"/"} />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route
          element={<PrivateRoutes user={!user} path={"/register"} />}
        >
          <Route path="/write" element={<Write />} />
        </Route>
        <Route
          element={<PrivateRoutes user={!user} path={"/register"} />}
        >
          <Route path="/settings" element={<Sattings />} />
        </Route>
        <Route
          element={<PrivateRoutes user={!user} path={"/register"} />}
        >
          <Route path="/post/:postId" element={<Single />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
