import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/global.scss";
import "./styles/reset.scss";

import { GoogleOAuthProvider } from "@react-oauth/google";
import Layout from "./layouts/Layout";
import { store } from "./store";
import Login from "./pages/Login";
import HelloWorld from "./pages/HelloWorld";
import Register from "./pages/Register";
import LayoutInternal from "./layouts/LayoutInternal";
import StartMembership from "./pages/StartMembership";
import Profile from "./pages/Profile";
import MyPlan from "./pages/MyPlan";
import Upload from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import CMSDashboard from "./pages/CMSDashboard";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LayoutInternal />,
      children: [
        {
          path: "hello",
          element: <HelloWorld />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "upload",
          element: <Upload />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "old-dashboard",
          element: <Dashboard />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "dashboard",
          element: <CMSDashboard />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "profile",
          element: <Profile />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "plan",
          element: <MyPlan />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "login",
          element: <Login />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "register",
          element: <Register />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "membership",
          element: <StartMembership />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        }
      ],
    },
  ]);

  return (
    <main>
      <GoogleOAuthProvider clientId="1013079086725-2uh2343ta3d9hq0kqbrtfep797oo7uue.apps.googleusercontent.com">
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </GoogleOAuthProvider>
    </main>
  );
}

export default App;
