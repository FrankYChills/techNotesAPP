import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import store over here so that all components can access it(via provider)
import { store } from "./app/store";
import { Provider } from "react-redux";

//for production
import { disableReactDevTools } from "@fvilers/disable-react-devtools";
// disables dev tool in production
if (process.env.NODE_ENV === "production") {
  disableReactDevTools();
}
// console.log(process.env.NODE_ENV);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
