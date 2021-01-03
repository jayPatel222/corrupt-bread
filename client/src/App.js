import "./App.css";
import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layouts/Alert";
//Redux
import Profile from "../src/components/profile/Profile";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Account from "./components/account/Account";
import PrivateRoute from "./components/router/PrivateRoute";
import CreateProfile from "../src/components/profileform/CreateProfile";
import EditProfile from "./components/profileform/Edit-profile";
import Profiles from "./components/profiles/Profiles";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Fragment className="App">
            <Navbar />
            <Route exact path="/" component={Landing}></Route>
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register}></Route>
                <PrivateRoute
                  exact
                  path="/users"
                  component={Profiles}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/user/:id"
                  component={Profile}
                ></PrivateRoute>
                <Route exact path="/login" component={Login}></Route>
                <PrivateRoute
                  exact
                  path="/account"
                  component={Account}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/posts"
                  component={Posts}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/post/:id"
                  component={Post}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                ></PrivateRoute>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                ></PrivateRoute>
              </Switch>
            </section>
          </Fragment>
        </Router>
      </Provider>
    </div>
  );
};

export default App;
