import React from "react";
import { Drawer, Container } from "native-base";

import Channels from "../components/Channels";
import AppHeader from "./AppHeader";
import AppMain from "./AppMain";

interface IDrawerContext {
  closeDrawer?: () => void;
  openDrawer?: () => void;
}

export const DrawerContext = React.createContext<IDrawerContext>({});

export default function AppDrawer() {
  const drawer = React.useRef(null);

  const closeDrawer = () => {
    drawer.current._root.close();
  };

  const openDrawer = () => {
    drawer.current._root.open();
  };

  return (
    <DrawerContext.Provider value={{ closeDrawer, openDrawer }}>
      <Drawer ref={drawer} content={<Channels />} styles={styles}>
        <Container>
          <AppHeader openDrawer={openDrawer} />
          <AppMain />
        </Container>
      </Drawer>
    </DrawerContext.Provider>
  );
}

const styles = {
  drawer: { shadowColor: "#000000", shadowOpacity: 0.8, shadowRadius: 3 }
};
