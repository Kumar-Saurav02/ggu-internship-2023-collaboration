import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
  position: "bottom-center",
  autoClose: 5000,
  hideProgressBar: false,
  newestOnTop: false,
  closeOnClick: true,
  rtl: false,
  // pauseOnFocusLoss,
  // draggable,
};

root.render(
  <Provider store={store}>
    <ToastContainer {...options} />
    <App />
  </Provider>
);
