import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import App from "./App";

// css
import "./css/style.css";
import "./css/responsive.css";
// slick
import "react-multi-carousel/lib/styles.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// toastify
import { ToastContainer } from "react-toastify";

// redux
import { Provider } from "react-redux";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <ToastContainer />
    <App />
  </Provider>,
  document.getElementById("root")
);
