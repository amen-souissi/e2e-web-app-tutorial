import React from "react";

import { NavigationContext } from "../contexts";

const useNavigation = (routeName: string) => {
  const { navigationContainer } = React.useContext(NavigationContext);
  const navigation = navigationContainer.current;
  const routes = navigation?.getRootState().routes || [];
  const route = routes.find(routeObj => routeObj.name === routeName);
  return { navigation, route };
};

export default useNavigation;
