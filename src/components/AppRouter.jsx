import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Switch } from "react-router";
import { privatRoutes } from "../router";


const AppRouter = () => {  
  return (
        <Switch>
      {privatRoutes.map((route) => (
        <Route
          component={route.component}
          path={route.path}
          exact={route.exact}
          key={route.path}
        />
      ))}{" "}
      <Redirect to="/posts/" />
    </Switch>
  );
};

export default AppRouter;
