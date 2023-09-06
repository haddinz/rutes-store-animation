import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "../src/styles/index.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Landingpage from "./pages/landingpage.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={<Landingpage />} />
      {/* <Route path="dashboard" element={<Dashboard />} /> */}
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
