import { Route, RouteProps, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { Suspense } from "react";

interface ProtectedProps extends RouteProps {
  component: React.ComponentType<unknown>;
}

interface RootState {
  user: {
    userName: string;
    isLogged: boolean;
  };
}

const ProtectedRoute: React.FC<ProtectedProps> = ({ component: Component, ...rest }) => {
  const { isLogged } = useSelector((state: RootState) => state.user);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLogged) {
          return (
            <Suspense fallback={<progress />}>
              <Component {...rest} {...props} />;
            </Suspense>
          );
        }
        return (
          <Redirect
            to={{
              pathname: "/home",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default ProtectedRoute;
