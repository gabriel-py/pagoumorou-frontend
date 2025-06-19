import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./styles/global.scss";
import "./styles/reset.scss";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { store } from "./store";
import Search from "./pages/Search";
import NewLayout from "./layouts/NewLayout";
import RoomDetails from "./pages/RoomDetails";
import Proposal from "./pages/Proposal";
import Confirmation from "./pages/Confirmation";
import Landing from "./pages/Landing";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NewLayout />,
      children: [
        {
          path: "search",
          element: <Search />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "details",
          element: <RoomDetails />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "proposal",
          element: <Proposal />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
        {
          path: "confirmation",
          element: <Confirmation />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
      ],
    },
    {
      path: "/",
      children: [
        {
          path: "landing",
          element: <Landing />,
          loader: async () => null,
          errorElement: <div>erro</div>,
        },
      ],
    }
  ]);

  return (
    <main>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <GoogleOAuthProvider clientId="1013079086725-2uh2343ta3d9hq0kqbrtfep797oo7uue.apps.googleusercontent.com">
          <Provider store={store}>
            <RouterProvider router={router} />
          </Provider>
        </GoogleOAuthProvider>
      </LocalizationProvider>
    </main>
  );
}

export default App;
