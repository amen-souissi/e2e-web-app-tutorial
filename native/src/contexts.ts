import React from "react";

interface INavigationContext {
  navigationContainer: React.MutableRefObject<any>;
}

export const NavigationContext = React.createContext<INavigationContext>({ navigationContainer: null });

interface IDrawerContext {
  isOpen: boolean;
  closeDrawer?: () => void;
  openDrawer?: () => void;
}

export const DrawerContext = React.createContext<IDrawerContext>({ isOpen: false });
