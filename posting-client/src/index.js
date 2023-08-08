import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Provider } from "react-redux";
import { store } from "./redux/configStore";
import './assets/scss/style.scss';
import Task from "./pages/Task/Task"
import Task_Mobile from "./pages/Task/Task_Mobile"
import ResponsiveItem from "./pages/ResponsiveItem/ResponsiveItem"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='' element={<ResponsiveItem component={Task} mobileComponent={Task_Mobile} />}></Route>
        <Route path="*" element={<Navigate to={""} />}></Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
