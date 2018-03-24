import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.min.css";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import decode from "jwt-decode";
import { composeWithDevTools } from "redux-devtools-extension";
import "./assets/css/App.css";
import "./assets/css/custom.css";
import "./assets/css/nucleo-icons.css";
import "./assets/js/sotetalent";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import rootReducer from "./rootReducer";
import { userLoggedIn } from "./actions/auth";
import setAuthorizationHeader from "./utils/setAuthorizationHeader";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
);

if (localStorage.sotetalentJWT) {
  const payload = decode(localStorage.sotetalentJWT);
  const user = {
    token: localStorage.sotetalentJWT,
    email: payload.email,
    username: payload.username,
    confirmed: payload.confirmed,
  };
  setAuthorizationHeader(localStorage.sotetalentJWT);
  store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <Route component={App} />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root"),
);

registerServiceWorker();
