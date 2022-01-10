import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../linksComponents/home/home";
import Products from "../linksComponents/products/products";
import ProtectedRoute from "../ProtectedRoute/protectedRoute";

// const Products = React.lazy(() => import("../linksComponents/products/products"));
const About = React.lazy(() => import("../linksComponents/about/about"));
const ProfilePage = React.lazy(() => import("../linksComponents/profilePage/profilePage"));
const CartPage = React.lazy(() => import("../cartPage/cartPage"));

const Routecomponents = (): JSX.Element => (
  <div>
    <Switch>
      <Route path="/products/xbox" render={() => <Products platform="xbox" />} />
      <Route path="/products/playstation" render={() => <Products platform="playstation" />} />
      <Route path="/products/pc" render={() => <Products platform="pc" />} />
      <Route path="/products" render={() => <Products platform="" />} />
      <ProtectedRoute path="/about" component={About} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <ProtectedRoute path="/home/order_list" component={CartPage} />
      <Route path="/sign-in" render={() => <Home />} />
      <Route path="/sign-up" render={() => <Home />} />
      <Route path="/home" render={() => <Home />} />
    </Switch>
  </div>
);

export default Routecomponents;
