import { Route, Switch } from "react-router-dom";
import CartPage from "../cartPage/cartPage";
import About from "../linksComponents/about/about";
import Home from "../linksComponents/home/home";
import Products from "../linksComponents/products/products";
import ProfilePage from "../linksComponents/profilePage/profilePage";
import ProtectedRoute from "../ProtectedRoute/protectedRoute";

const Routecomponents = (): JSX.Element => (
  <div>
    <Switch>
      <Route path="/products/xbox" render={() => <Products platform="xbox" />} />
      <Route path="/products/playstation" render={() => <Products platform="playstation" />} />
      <Route path="/products/pc" render={() => <Products platform="pc" />} />
      <Route path="/products/" render={() => <Products platform="" />} />
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
