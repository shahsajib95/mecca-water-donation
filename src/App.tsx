import { RouterProvider } from "react-router-dom";
import router from "./routes";

import "./App.css";

import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import { PageLoader } from "./components/loader/page-loader";

function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <RouterProvider router={router} />
      <Toaster />
    </Suspense>
  );
}

export default App;
