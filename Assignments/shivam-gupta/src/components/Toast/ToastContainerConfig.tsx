import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastContainerConfig = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    theme="colored"
    closeOnClick
    pauseOnHover
  />
);