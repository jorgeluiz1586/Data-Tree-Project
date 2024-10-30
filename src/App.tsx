import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import CreateDataTreePage from "./pages/CreateDataTreePage.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/create-data-tree",
        element: <CreateDataTreePage />,
    },
]);

function App() {

  return (
    <>
       <RouterProvider router={router} />
    </>
  )
}

export default App
