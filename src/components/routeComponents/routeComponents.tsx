import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../linksComponents/home/home";
import ProtectedRoute from "../ProtectedRoute/protectedRoute";

const About = React.lazy(() => import("../linksComponents/about/about"));
const ProfilePage = React.lazy(() => import("../linksComponents/profilePage/profilePage"));
const CartPage = React.lazy(() => import("../cartPage/cartPage"));
const Products = React.lazy(() => import("../linksComponents/products/products"));

const Routecomponents = (): JSX.Element => (
  <Switch>
    <ProtectedRoute path="/products/xbox" component={() => <Products platform="xbox" />} />
    <ProtectedRoute path="/products/playstation" component={() => <Products platform="playstation" />} />
    <ProtectedRoute path="/products/pc" component={() => <Products platform="pc" />} />
    <ProtectedRoute path="/products" component={() => <Products platform="" />} />
    <ProtectedRoute path="/about" component={About} />
    <ProtectedRoute path="/profile" component={ProfilePage} />
    <ProtectedRoute path="/home/order_list" component={CartPage} />
    <Route path="/sign-in" render={() => <Home />} />
    <Route path="/sign-up" render={() => <Home />} />
    <Route path="/home" render={() => <Home />} />
  </Switch>
);

export default Routecomponents;
