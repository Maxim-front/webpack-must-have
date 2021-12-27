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
      {/* <ProtectedRoute path="/products" component={Products} /> */}
      <Route path="/products/xbox" render={() => <Products category="xbox" />} />
      <Route path="/products/playstation" render={() => <Products category="playstation" />} />
      <Route path="/products/pc" render={() => <Products category="pc" />} />
      <Route path="/products/" render={() => <Products category="" />} />
      <ProtectedRoute path="/about" component={About} />
      <ProtectedRoute path="/profile" component={ProfilePage} />
      <ProtectedRoute path="/home/order_list" component={CartPage} />
      <Route path="/cart" render={() => <CartPage />} />
      <Route path="/sign-in" render={() => <Home />} />
      <Route path="/sign-up" render={() => <Home />} />
      <Route path="/home" render={() => <Home />} />
    </Switch>
  </div>
);

export default Routecomponents;
