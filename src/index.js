import React from "react";
import ReactDOM from 'react-dom';
import App from "./App";
import "./index.css";
import { HashRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../src/components/redux/Store"
import { Provider } from "react-redux";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <HashRouter>
          <App />
        </HashRouter>
      </React.StrictMode>
    </PersistGate>
  </Provider >
  ,
  document.getElementById('root'
  )
)
  ;